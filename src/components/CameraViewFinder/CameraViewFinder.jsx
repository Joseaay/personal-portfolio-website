import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Scramble from '../Scramble/Scramble';
import { isMobileTablet } from '../../helpers';
import './cameraViewFinder.scss';

export default class CameraViewFinderComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentTime: null,
		};

		this.phrases = [
			',Welcome',
			"you've arrived to my website successfully",
			'This is gonna be the start of an amazing journey',
			'Just be patience, enjoy the ride',
			'Athought this space station is yet to be finished',
			"But don't you worry",
			'Jose is busy doing some amazing code out there',
			"He'll be able to continue with the work here",
			"It's just a matter of time",
			'In the meanwhile, take a look to this amazing frame structure',
			'It is simply awesome, made with ThreeJS',
			'Just grab and drag it to see it all around',
			'Besides, the earth looks astonishing from this point of view',
			'Hope you have a great time here visitor',
			'...And again',
		];
	}

	componentDidMount() {
		setInterval(() => this._updateCurrentTime(), 1000);
	}

	_updateCurrentTime = () => {
		this.setState({ currentTime: new Date() });
	};

	_formatCurrentTime = currentTime =>
		currentTime !== null && currentTime.toISOString().substr(11, 8);

	render() {
		return (
			<div
				className={classNames('camera-view-finder', {
					show: !this.props.hide,
					'camera-view-finder--mobile': isMobileTablet(),
				})}
			>
				<div className="top-left">WEB</div>
				<div className="top-right">
					REC
					<span>{this._formatCurrentTime(this.state.currentTime)}</span>
				</div>
				<span className="container" />
				<div className="center" />
				<div className="bottom-right">
					{this.props.scramble && <Scramble phrases={this.phrases} timeout={3500} />}
				</div>
				<div className="bottom-middle">
					<div>Jose Ayllón</div>
					<div>Software Developer</div>
				</div>
			</div>
		);
	}
}

CameraViewFinderComponent.propTypes = {
	hide: PropTypes.bool,
	scramble: PropTypes.bool,
};

CameraViewFinderComponent.defaultProps = {
	hide: false,
	scramble: true,
};
