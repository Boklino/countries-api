import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';

const NavBar = () => {
	const { darkMode, setDarkMode } = useContext(UserContext);
	const hanldeDarkMode = () => {
		setDarkMode((prev) => !prev);
	};
	return (
		<div
			className={
				'py-5 px-5 lg:px-14 lg:py-3.5 shadow-lg' +
				(darkMode ? ' bg-slate-700' : ' bg-white')
			}
		>
			<div
				className={
					'flex p-2 font-nunito ' +
					(darkMode ? 'text-white' : 'text-black')
				}
			>
				<Link to={'/'} className='font-bold text-xl '>
					Where in the world?
				</Link>
				<button
					onClick={hanldeDarkMode}
					className='flex gap-2 ml-auto  '
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='white'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z'
						/>
					</svg>

					<h2 className=''>Dark Mode</h2>
				</button>
			</div>
		</div>
	);
};

export default NavBar;
