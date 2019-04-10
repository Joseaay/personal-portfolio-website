import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './scramble.scss';
/* eslint-disable react/no-danger */
export default class ScrambleComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			output: '',
		};
		this.chars = '!<>-_\\/[]{}—=+*^?#________';
	}

	componentDidMount() {
		let counter = 0;
		const next = () => {
			this.setText(this.props.phrases[counter]).then(() => {
				setTimeout(next, this.props.timeout);
			});
			counter = (counter + 1) % this.props.phrases.length;
		};
		next();
	}

	setText = newText => {
		const oldText = '';
		const length = Math.max(oldText.length, newText.length);
		const promise = new Promise(resolve => {
			this.resolve = resolve;
		});
		this.queue = [];
		for (let i = 0; i < length; i++) {
			const from = oldText[i] || '';
			const to = newText[i] || '';
			const start = Math.floor(Math.random() * 40);
			const end = start + Math.floor(Math.random() * 40);
			this.queue.push({ from, to, start, end });
		}
		window.cancelAnimationFrame(this.frameRequest);
		this.frame = 0;
		this.update();
		return promise;
	};

	update = () => {
		let output = '';
		let complete = 0;
		for (let i = 0, n = this.queue.length; i < n; i++) {
			const { from, to, start, end } = this.queue[i];
			let { char } = this.queue[i];
			if (this.frame >= end) {
				complete++;
				output += to;
			} else if (this.frame >= start) {
				if (!char || Math.random() < 0.28) {
					char = this.randomChar();
					this.queue[i].char = char;
				}
				output += `<span class="scramble__text__loader">${char}</span>`;
			} else {
				output += from;
			}
		}
		this.setState({ output });
		if (complete === this.queue.length) {
			this.resolve();
		} else {
			this.frameRequest = window.requestAnimationFrame(this.update);
			this.frame++;
		}
	};

	randomChar() {
		return this.chars[Math.floor(Math.random() * this.chars.length)];
	}

	render() {
		return (
			<div
				className="scramble__text"
				dangerouslySetInnerHTML={{ __html: this.state.output }}
			/>
		);
	}
}

ScrambleComponent.propTypes = {
	phrases: PropTypes.arrayOf(PropTypes.string).isRequired,
	timeout: PropTypes.number.isRequired,
};
