import React, { useContext } from 'react';
import { UserContext } from './UserContext';

import { Link } from 'react-router-dom';
const CountryDisplay = ({ country }) => {
	const { darkMode } = useContext(UserContext);
	return (
		<Link
			to={`/country/${country.name}`}
			className={
				'rounded-md mt-2 m-auto w-30 lg:w-full ' +
				(darkMode ? 'bg-slate-700 text-white' : 'bg-white text-black')
			}
		>
			<img
				className='rounded-sm  lg:w-full lg:h-40 shadow-md'
				src={country.flag}
			/>
			<div className='  p-6'>
				<h2 className=' font-nunito font-bold'>{country.name}</h2>
				<div className='gap-1 mt-3 text-sm font-nunito font-semibold'>
					<p className='mt-1'>
						Population:{' '}
						{country.population
							.toString()
							.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
					</p>
					<p className='mt-1'>Region: {country.region}</p>
					<p className='mt-1'>Capital: {country.capital}</p>
				</div>
			</div>
		</Link>
	);
};

export default CountryDisplay;
