import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';

import ClickOutHandler from 'react-clickout-handler';

const SearchCountries = () => {
	const { search, setSearch, setRegion, darkMode } = useContext(UserContext);
	const [drop, setDrop] = useState(false);

	const handleRegion = (e) => {
		const name = e.target.getAttribute('name');
		setRegion(name);
		setDrop((prev) => !prev);
	};

	const handleClickOut = () => {
		setDrop(false);
	};
	return (
		<div className='lg:flex'>
			<div className=' lg:mt-8 mt-4  lg:w-1/3 px-3.5 py-6 lg:py-2  '>
				<div
					className={
						'px-8 py-5 gap-4 ml-10 sm:mr-10 lg:mr-0  flex mr-10 rounded-lg shadow-md ' +
						(darkMode ? ' bg-slate-700' : ' bg-white')
					}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className={
							'w-6 h-6 ' +
							(darkMode ? ' text-white' : ' text-gray-500')
						}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
						/>
					</svg>

					<input
						className={
							'w-full outline-none ' +
							(darkMode
								? ' bg-slate-700 text-white'
								: ' bg-white text-black')
						}
						placeholder='Search for a country...'
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>
			<ClickOutHandler onClickOut={handleClickOut}>
				<div className=' lg:ml-auto '>
					<button
						onClick={() =>
							setDrop((prev) => {
								return !prev;
							})
						}
						className={
							'flex w-2/6 gap-3  lg:w-9/12 px-4 py-4 m-auto mt-4 ml-14 lg:ml-0 lg:mr-16 lg:mt-12   rounded-lg shadow-md ' +
							(darkMode
								? ' bg-slate-700 text-white'
								: ' bg-white')
						}
					>
						<h2 className=' font-nunito text-base '>
							Filter by Region
						</h2>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={2}
							stroke='currentColor'
							className='w-4 h-4 mt-1'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M19.5 8.25l-7.5 7.5-7.5-7.5'
							/>
						</svg>
					</button>

					{drop && (
						<div
							className={
								'block absolute z-10 mt-2 px-5 py-3 w-44 lg:w-48 ml-14 lg:mr-16  rounded-lg shadow-md ' +
								(darkMode
									? 'bg-slate-700 text-white'
									: 'bg-white')
							}
						>
							<div>
								<ul>
									<li
										className={
											'py-1  cursor-pointer ' +
											(darkMode
												? 'hover:bg-slate-600'
												: 'hover:bg-gray-200')
										}
										onClick={(e) => handleRegion(e)}
									>
										All
									</li>
									<li
										className={
											'py-1  cursor-pointer ' +
											(darkMode
												? 'hover:bg-slate-600'
												: 'hover:bg-gray-200')
										}
										name='Africa'
										onClick={(e) => handleRegion(e)}
									>
										Africa
									</li>
									<li
										className={
											'py-1  cursor-pointer ' +
											(darkMode
												? 'hover:bg-slate-600'
												: 'hover:bg-gray-200')
										}
										name='Americas'
										onClick={(e) => handleRegion(e)}
									>
										America
									</li>
									<li
										className={
											'py-1  cursor-pointer ' +
											(darkMode
												? ' hover:bg-slate-600'
												: ' hover:bg-gray-200')
										}
										name='Asia'
										onClick={(e) => handleRegion(e)}
									>
										Asia
									</li>
									<li
										className={
											'py-1  cursor-pointer ' +
											(darkMode
												? 'hover:bg-slate-600'
												: 'hover:bg-gray-200')
										}
										name='Europe'
										onClick={(e) => handleRegion(e)}
									>
										Europe
									</li>
									<li
										className={
											'py-1  cursor-pointer ' +
											(darkMode
												? 'hover:bg-slate-600'
												: 'hover:bg-gray-200')
										}
										name='Oceania'
										onClick={(e) => handleRegion(e)}
									>
										Oceania
									</li>
								</ul>
							</div>
						</div>
					)}
				</div>
			</ClickOutHandler>
		</div>
	);
};

export default SearchCountries;
