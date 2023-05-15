import React, { useContext } from 'react';

import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../components/UserContext';
const Country = () => {
	const { darkMode } = useContext(UserContext);
	const navigate = useNavigate();

	const [country, setCountry] = useState([]);
	const [currency, setCurrency] = useState([]);
	const [nativeName, setNativeName] = useState([]);
	const [languages, setLanguages] = useState([]);
	const [border, setBorder] = useState([]);

	const [temp, setTemp] = useState();
	const [icon, setIcon] = useState();
	const [wind, setWind] = useState();
	const { name } = useParams();

	const handleBorder = (e) => {
		const name = e.currentTarget.getAttribute('name');
		navigate(`/country/${name}`);
	};

	useEffect(() => {
		axios
			.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
			.then((response) => {
				setCountry(response.data);

				setCurrency(
					Object.values(
						response.data.map((arr) => arr.currencies)[0]
					).map((currency) => currency.name)
				);
				setNativeName(
					Object.values(
						response.data.map((cou) => cou.name.nativeName)[0]
					).map((name) => name.common)
				);
				setLanguages(
					Object.values(
						response.data.map((lang) => lang.languages)[0]
					)
				);

				const codes = response.data.map((cou) => cou.borders);

				axios
					.get(
						`https://restcountries.com/v3.1/alpha?codes=${codes.join(
							','
						)}`
					)
					.then((response) => {
						setBorder(response.data);
					});
			});

		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=280a116ac67d62efb01638f7a66e0d3f`
			)
			.then((response) => {
				setWind(response.data.wind.speed);
				setTemp(response.data.main.temp);
				setIcon(response.data.weather[0].icon);
			});
	}, [name]);

	return (
		<div
			className={
				'p-4 pb-32 ' + (darkMode ? 'bg-slate-800' : 'bg-gray-100')
			}
		>
			<div>
				<Link
					to={'/'}
					className={
						'flex px-3 py-2 mt-8 mb-5 ml-10 gap-2 w-32  rounded-md shadow-lg ' +
						(darkMode ? ' bg-slate-700 text-white' : ' bg-white')
					}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.2}
						stroke='currentColor'
						className='w-6 h-6 ml-2'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
						/>
					</svg>

					<p className=' font-nunito font-semibold ml-1'>Back</p>
				</Link>

				<div className='grid lg:grid-cols-2 sm:grid-cols-1 p-10  '>
					<img
						className=' w-11/12 m-auto lg:mr-60 h-fit lg:w-8/12 lg:h-80 shadow-lg rounded-md '
						src={country
							.map((flag) => flag.flags)
							.map((type) => type.png)}
					/>
					<div
						className={
							' mr-28 p-2 ml-4 lg:ml-0' +
							(darkMode ? ' text-white' : '')
						}
					>
						<h1 className=' font-nunito font-bold text-2xl mb-3 mt-6 lg:mt-0'>
							{country
								.map((first) => first.name)
								.map((name) => name.common)}
						</h1>
						<div className='grid lg:grid-cols-2 sm:grid-cols-1 gap-20  '>
							<div className=''>
								<ul className='gap-4  '>
									<li className='py-1'>
										<p className=' font-nunito font-semibold'>
											Native Name:{' '}
											<span className=' font-light'>
												{
													nativeName[
														nativeName.length - 1
													]
												}
											</span>
										</p>
									</li>
									<li className='py-1'>
										<p className=' font-nunito font-semibold'>
											Population:{' '}
											<span className=' font-light'>
												{country
													.map(
														(cou) => cou.population
													)
													.toString()
													.replace(
														/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
														','
													)}
											</span>
										</p>
									</li>
									<li className='py-1'>
										<p className=' font-nunito font-semibold'>
											Region:{' '}
											<span className=' font-light'>
												{country.map(
													(first) => first.region
												)}
											</span>
										</p>
									</li>
									<li className='py-1'>
										<p className=' font-nunito font-semibold'>
											Sub Region:{' '}
											<span className=' font-light'>
												{country.map(
													(first) => first.subregion
												)}
											</span>
										</p>
									</li>
									<li className='py-1'>
										<p className=' font-nunito font-semibold'>
											Capital:{' '}
											<span className=' font-light'>
												{' '}
												{country.map(
													(first) => first.capital
												)}
											</span>
										</p>
									</li>
								</ul>
							</div>
							<div>
								<ul className='whitespace-nowrap '>
									<li className='py-1'>
										<p className=' font-nunito font-semibold'>
											Top Level Domain:{' '}
											<span className=' font-light '>
												{country.map(
													(first) => first.tld
												)}
											</span>
										</p>
									</li>
									<li className='py-1'>
										<p className=' font-nunito font-semibold'>
											Currency:{' '}
											<span className=' font-light '>
												{' '}
												{currency}
											</span>
										</p>
									</li>
									<li className='py-1'>
										<p className=' font-nunito font-semibold'>
											Languages:{' '}
											<span className=' font-light '>
												{languages.join(', ')}
											</span>{' '}
										</p>
									</li>
									<li>
										<p className=' font-nunito font-semibold'>
											Temperature{' '}
											<span className=' font-normal font-nunito'>
												{(temp - 273.15).toFixed(2)} °C
											</span>
										</p>
										<div className='grid grid-cols-2  items-center'>
											<p className=' font-nunito font-semibold'>
												wind:{' '}
												<span className=' font-normal font-nunito'>
													{wind} m/s
												</span>
											</p>
											<img
												className='w-8 h-8 mr-8 lg:w-12 lg:h-12'
												src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
												alt={`weather icon`}
											/>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<p className=' font-nunito font-semibold'>
							Border Countries:
						</p>
						{border.length > 0 && (
							<div className='flex flex-wrap mt-3 lg:mt-2  '>
								{border.length > 0 &&
									border.map((bord) => (
										<div className=' flex flex-row '>
											{' '}
											<button
												name={bord.name.common}
												onClick={(e) => handleBorder(e)}
												className={
													' px-3 gap-2 py-1 mt-2 ml-4  shadow-sm rounded-md ' +
													(darkMode
														? '  bg-slate-700 hover:bg-slate-600'
														: ' bg-white border hover:bg-gray-100')
												}
											>
												{' '}
												<p className=' font-nunito font-normal'>
													{bord.name.common}{' '}
												</p>
											</button>
										</div>
									))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Country;
