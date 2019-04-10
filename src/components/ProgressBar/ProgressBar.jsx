import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './progressBar.scss';

const ProgressBarComponent = props => (
	<div
		className={classNames('progress-bar', {
			hide: props.hide,
		})}
	/>
);

export default ProgressBarComponent;

ProgressBarComponent.propTypes = {
	hide: PropTypes.bool,
};

ProgressBarComponent.defaultProps = {
	hide: false,
};
