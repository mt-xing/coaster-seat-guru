import React, { useEffect, useState } from 'react';

// eslint-disable-next-line no-undef
export default function NoSsr(props: {children: JSX.Element}) {
	const [isMounted, setMount] = useState(false);

	useEffect(() => {
		setMount(true);
	}, []);

	return <>{isMounted ? props.children : null}</>;
}
