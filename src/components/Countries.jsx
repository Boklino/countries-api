import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';
import CountryDisplay from './CountryDisplay';
import { Pagination, Stack } from '@mui/material';

const Countries = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [nativeName, setNativeName] = useState([]);
	const { countries, setCountries, search, region, darkMode } =
		useContext(UserContext);

	const countriesPerPage = 12;
	const indexOfLastCountry = countriesPerPage * currentPage;
	const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

	let searched = countries.filter((country) =>
		country.name.toLowerCase().includes(search.toLowerCase())
	);

	if (region) {
		searched = countries.filter(
			(country) =>
				country.name.toLowerCase().includes(search.toLowerCase()) &&
				country.region === region
		);
	}

	const searchedCountriesPerPage = searched.slice(
		indexOfFirstCountry,
		indexOfLastCountry
	);

	useEffect(() => {
		if (searchedCountriesPerPage.length === 0) setCurrentPage(1);
	}, [searched]);

	const handlePagination = (e, value) => {
		setCurrentPage(value);

		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		axios.get('https://restcountries.com/v3.1/all').then((response) => {
			setCountries(
				response.data.map((country) => ({
					name: country.name.common,
					nativeName: country?.name?.nativeName,
					domain: country.tld,
					currency: country.currencies,
					subregion: country.subregion,
					continent: country.continents,
					capital: country.capital,
					language: country.languages,
					area: country.area,
					flag: country.flags.png,
					region: country.region,
					population: country.population,
				}))
			);
		});
	}, []);

	return (
		<div className='px-8 py-5 shadow-md relative'>
			<div className='grid gap-20 p-6 sm:grid-cols-1 lg:grid-cols-4'>
				{searchedCountriesPerPage.map((country) => (
					<CountryDisplay country={country} />
				))}
			</div>

			<Stack alignItems='center' className='mt-6 py-10 p-5 '>
				<Pagination
					sx={
						darkMode
							? {
									'& .MuiPaginationItem-root': {
										color: '#fff',
									},
							  }
							: {
									'& .MuiPaginationItem-root': {
										color: '#000',
									},
							  }
					}
					alignItems='center'
					page={currentPage}
					color={darkMode ? 'primary' : 'standard'}
					count={Math.ceil(searched.length / countriesPerPage)}
					onChange={handlePagination}
				/>
			</Stack>
		</div>
	);
};

export default Countries;
