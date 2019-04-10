import React from 'react';
import classNames from 'classnames';
import threeJSMeteoriote from '../../../ThreeJS/Meteorite';
import CameraViewFinder from '../../../components/CameraViewFinder/CameraViewFinder';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';
import helpers from '../../../helpers';

import './MainSection.scss';

export default class MainSectionComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			threeJsLoadObjectCompleted: false,
		};
		this.isMobile = helpers.isMobileTablet();
	}

	componentDidMount() {
		document.addEventListener('threeJsLoadCompleted', this._threeJsLoadCompletedTrigger);
		if (!this.isMobile) {
			threeJSMeteoriote(this.threeRootElement, 0.0002, -0.05, false);
		} else {
			this._threeJsLoadCompletedTrigger();
		}
	}

	_threeJsLoadCompletedTrigger = () => {
		this.setState({ threeJsLoadObjectCompleted: true });
	};

	_renderAppropriateContent = isMobile =>
		isMobile ? (
			<div className="mobileView" />
		) : (
			<React.Fragment>
				<div
					className={classNames('main-section__canvas', {
						show: this.state.threeJsLoadObjectCompleted,
					})}
					ref={element => {
						this.threeRootElement = element;
					}}
				/>
			</React.Fragment>
		);

	render() {
		return (
			<div className="main-section">
				<div className="main-section--wrapper section">
					<div className="main-section__content">
						<CameraViewFinder
							hide={!this.state.threeJsLoadObjectCompleted}
							scramble={!this.isMobile}
						/>
					</div>
				</div>
				<ProgressBar hide={this.state.threeJsLoadObjectCompleted} />
				{this._renderAppropriateContent(this.isMobile)}
			</div>
		);
	}
}
