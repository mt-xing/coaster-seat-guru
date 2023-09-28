import { useCallback, useEffect, useState } from 'react';

export default function useWindowWidth() {
	const [width, setWidth] = useState(0);

	const handleChange = useCallback(() => {
		setWidth(window.innerWidth);
	}, []);

	useEffect(() => {
		setWidth(window.innerWidth);
		window.addEventListener('resize', handleChange);
		return () => {
			window.removeEventListener('resize', handleChange);
		};
	}, [handleChange]);

	return width;
}
