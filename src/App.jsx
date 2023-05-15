import React, { useState } from 'react';
import { UserContext } from './components/UserContext';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Country from './Pages/Country';
import NavBar from './components/NavBar';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState('');
	const [region, setRegion] = useState('');
	const [darkMode, setDarkMode] = useState(false);
	return (
		<div className={darkMode ? 'bg-slate-800' : ' bg-gray-100'}>
			{' '}
			<UserContext.Provider
				value={{
					countries,
					setCountries,
					search,
					setSearch,
					region,
					setRegion,
					darkMode,
					setDarkMode,
				}}
			>
				<NavBar />
				<Routes>
					<Route
						exact
						path='/country/:name'
						key={countries}
						element={<Country />}
					/>
					<Route exact path='/' element={<Home />} />
				</Routes>
			</UserContext.Provider>
		</div>
	);
};

export default App;
