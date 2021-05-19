import React from 'react';
import { RoomContext } from '../context';
import Title from '../components/Title';

const getUnique = (items, value) => [
	...new Set(items.map((item) => item[value])),
];

const RoomFilter = ({ rooms }) => {
	const {
		handleChange,
		type,
		capacity,
		price,
		minPrice,
		maxPrice,
		minSize,
		maxSize,
		breakfast,
		pets,
	} = React.useContext(RoomContext);

	const types = ['all', ...getUnique(rooms, 'type')];

	return (
		<section className='filter-container'>
			<Title>search rooms</Title>
			<form className='filter-form'>
				<div className='form-group'>
					<label htmlFor='type'>room type</label>
					<select
						name='type'
						id='type'
						value={type}
						className='form-control'
						onChange={handleChange}>
						{types.map((item, index) => {
							return (
								<option key={index} value={item}>
									{item}
								</option>
							);
						})}
					</select>
				</div>

				<div className='form-group'>
					<label htmlFor='capacity'>guests</label>
					<select
						name='capacity'
						id='capacity'
						value={capacity}
						className='form-control'
						onChange={handleChange}>
						{getUnique(rooms, 'capacity').map((item, index) => (
							<option key={index} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>

				<div className='form-group'>
					<label htmlFor='price'>room price ${price}</label>
					<input
						type='range'
						name='price'
						id='price'
						min={minPrice}
						max={maxPrice}
						value={price}
						className='form-control'
						onChange={handleChange}
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='size'>room size</label>
					<div className='size-inputs'>
						<input
							type='number'
							name='minSize'
							value={minSize}
							onChange={handleChange}
							className='size-input'
						/>
						<input
							type='number'
							name='maxSize'
							value={maxSize}
							onChange={handleChange}
							className='size-input'
						/>
					</div>
				</div>

				<div className='form-group'>
					<div className='single-extra'>
						<input
							type='checkbox'
							id='breakfast'
							name='breakfast'
							checked={breakfast}
							onChange={handleChange}
						/>
						<label htmlFor='breakfast'>breakfast</label>
					</div>
					<div className='single-extra'>
						<input
							type='checkbox'
							id='pets'
							name='pets'
							checked={pets}
							onChange={handleChange}
						/>
						<label htmlFor='pets'>pets</label>
					</div>
				</div>
			</form>
		</section>
	);
};

export default RoomFilter;
