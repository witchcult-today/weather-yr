import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import search from 'assets/icons/common icons/color icons/search.svg';

import { fetchFavorites } from 'redux/slices/userSlice';

function Button({ setSearchValue, setIsSearch }) {
	const dispatch = useDispatch();

	const btnRef = React.useRef(); // ссылка на кнопку Search
	const formRef = React.useRef(); // ссылка на форму поиска

	const { locations } = useSelector(state => state.users.currentUser);

	const onClickSearch = () => {
		dispatch(fetchFavorites(locations));
	}

	React.useEffect(() => {
			const onClickOutsideSearch = (e) => {
				if (e.composedPath().includes(btnRef.current)) {
					setIsSearch(true);
				} else if (!e.composedPath().includes(formRef.current)) {
					setIsSearch(false);
					setSearchValue('');
				}
			}

			document.addEventListener('click', onClickOutsideSearch);

			return () => {
				document.removeEventListener('click', onClickOutsideSearch);
			}
		}, [])

	return (
			<button className='btn' ref={btnRef} onClick={onClickSearch}>
				<img className='btn__icon' src={search} alt='Search icon' />
				Search
			</button>
		)
	}

	export default Button;
