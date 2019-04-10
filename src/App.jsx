import React from 'react';
import './App.scss';
import './styles/index.scss';

import MainSection from './pages/homepage/MainSection/MainSection';
import FirstSection from './pages/homepage/FirstSection/FirstSection';

const App = () => (
	<div className="homepage">
		<MainSection />
		<FirstSection />
	</div>
);

export default App;
