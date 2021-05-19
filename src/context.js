import React from 'react';
import items from './data';

const RoomContext = React.createContext();

// RoomContext.Provider value={}

const RoomProvider = ({ children }) => {
	const [state, setState] = React.useState({
		rooms: [],
		sortedRooms: [],
		featuredRooms: [],
		loading: true,
		type: 'all',
		capacity: 1,
		price: 0,
		minPrice: 0,
		maxPrice: 0,
		minSize: 0,
		maxSize: 0,
		breakfast: false,
		pets: false,
	});

	const getData = () => {};

	React.useEffect(() => {
		let rooms = formatData(items);
		let featuredRooms = rooms.filter((room) => room.featured === true);
		let maxPrice = Math.max(...rooms.map(({ price }) => price));
		const sizes = rooms.map(({ size }) => size);
		setState({
			...state,
			rooms,
			featuredRooms,
			sortedRooms: rooms,
			loading: false,
			price: maxPrice,
			maxPrice,
			minSize: Math.min(...sizes),
			maxSize: Math.max(...sizes),
			breakfast: false,
			pets: false,
		});
	}, []);

	const formatData = (items) => {
		let tempItems = items.map((item) => {
			let { id } = item.sys;
			let images = item.fields.images.map((image) => image.fields.file.url);
			return { ...item.fields, images, id };
		});
		return tempItems;
	};

	const getRoom = (slug) => {
		let tempRooms = state.rooms;
		const room = tempRooms.find((room) => room.slug === slug);
		return room;
	};

	const handleChange = (event) => {
		const { type, name, value, checked } = event.target;

		const result = type === 'checkbox' ? checked : value;

		setState({
			...state,
			[name]: result,
		});
	};

	const filterRooms = () => {
		let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
			state;

		let tempRooms = rooms;

		if (type !== 'all') {
			tempRooms = tempRooms.filter((room) => room.type === type);
		}
		if (breakfast) {
			tempRooms = tempRooms.filter((room) => room.breakfast);
		}
		if (pets) {
			tempRooms = tempRooms.filter((room) => room.pets);
		}

		tempRooms = tempRooms.filter(
			(room) =>
				room.size >= minSize &&
				room.size <= maxSize &&
				room.price <= price &&
				room.capacity >= parseInt(capacity)
		);

		setState({
			...state,
			sortedRooms: tempRooms,
		});
	};

	React.useLayoutEffect(() => {
		filterRooms();
	}, [
		state.type,
		state.capacity,
		state.price,
		state.minSize,
		state.maxSize,
		state.pets,
		state.breakfast,
	]);

	return (
		<RoomContext.Provider value={{ ...state, getRoom, handleChange }}>
			{children}
		</RoomContext.Provider>
	);
};

export function withRoomConsumer(Component) {
	return function ConsumerWrapper(props) {
		return (
			<RoomConsumer>
				{(value) => <Component {...props} context={value} />}
			</RoomConsumer>
		);
	};
}
const RoomConsumer = RoomContext.Consumer;

export { RoomProvider, RoomConsumer, RoomContext };
