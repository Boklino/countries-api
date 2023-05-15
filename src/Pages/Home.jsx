import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import NavBar from '../components/NavBar';
import SearchCountries from '../components/SearchCountries';
import Countries from '../components/Countries';

const Home = () => {
	const { darkMode } = useContext(UserContext);

	return (
		<div className={darkMode ? 'bg-slate-800' : 'bg-gray-100'}>
			<SearchCountries />
			<Countries />
		</div>
	);
};

export default Home;
