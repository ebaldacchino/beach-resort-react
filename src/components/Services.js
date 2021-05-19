import React from 'react';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';
import Title from './Title';
const services = [
	{
		icon: <FaCocktail />,
		title: 'free cocktails',
		info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, magnam?',
	},
	{
		icon: <FaHiking />,
		title: 'Endless Hiking',
		info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, magnam?',
	},
	{
		icon: <FaShuttleVan />,
		title: 'Free Shuttle',
		info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, magnam?',
	},
	{
		icon: <FaBeer />,
		title: 'Strongest Beer',
		info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, magnam?',
	},
];

const Services = () => {
	return (
		<section className='services'>
			<Title>services</Title>
			<div className='services-center'>
				{services.map((item, index) => (
					<article key={index} className='service'>
						<span>{item.icon}</span>
						<h6>{item.title}</h6>
						<p>{item.info}</p>
					</article>
				))}
			</div>
		</section>
	);
};

export default Services;
