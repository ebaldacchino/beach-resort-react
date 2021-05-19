import React from 'react';
import { RoomContext } from '../context';
import defaultBg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import StyledHero from '../components/StyledHero';

const SingleRoom = (props) => {
	const [state, setState] = React.useState({
		slug: props.match.params.slug,
		room: false,
	});

	const { loading, featuredRooms, rooms, sortedRooms, getRoom } =
		React.useContext(RoomContext);

	const { slug, room } = state;

	React.useEffect(() => {
		const room = getRoom(slug);
		setState({
			...state,
			room: room,
		});
	}, [slug]);

	if (!room) {
		return (
			<div className='error'>
				<h3>no such room could be found</h3>
				<Link to='/rooms' className='btn-primary'>
					back to rooms
				</Link>
			</div>
		);
	}

	const {
		name,
		description,
		capacity,
		size,
		price,
		extras,
		breakfast,
		pets,
		images,
	} = room;

	const [mainImg, ...defaultImages] = images;

	return (
		<>
			<StyledHero img={mainImg || defaultBg}>
				<Banner title={`${name} room`}>
					<Link to='/rooms' className='btn-primary'>
						back to rooms
					</Link>
				</Banner>
			</StyledHero>
			<section className='single-room'>
				<div className='single-room-images'>
					{defaultImages.map((item, index) => (
						<img src={item} key={index} alt={name} />
					))}
				</div>
				<div className='single-room-info'>
					<article className='desc'>
						<h3>details</h3>
						<p>{description}</p>
					</article>
					<article className='info'>
						<h3>info</h3>
						<h6>price : ${price}</h6>
						<h6>size : {size} SQFT</h6>
						<h6>
							max capacity : {`${capacity} ${capacity > 1 ? 'people' : 'person'}`}
						</h6>
						<h6>{pets && 'no '}pets allowed</h6>
						{breakfast && <h6>free breakfast included</h6>}
					</article>
				</div>
			</section>
			<section className='room-extras'>
				<h6>extras </h6>
				<hl className='extras'>
					{extras.map((item, index) => (
						<li key={index}>- {item}</li>
					))}
				</hl>
			</section>
		</>
	);
};

export default SingleRoom;
