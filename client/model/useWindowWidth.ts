import { useCallback, useEffect, useState } from 'react';

export default function useWindowWidth() {
	const [width, setWidth] = useState(window.innerWidth);

	const handleChange = useCallback(() => {
		setWidth(window.innerWidth);
	}, []);

	useEffect(() => {
		window.addEventListener('resize', handleChange);
		return () => {
			window.removeEventListener('resize', handleChange);
		};
	}, [handleChange]);

	return width;
}
