import React, { useState, useCallback } from 'react'
import { Container } from './Container'
import dartboardExample from "../img/dartboardExample.png";

export const Example: React.FC = () => {
	const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
	const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
		hideSourceOnDrag,
	])

	return (
		<div>
			<Container hideSourceOnDrag={hideSourceOnDrag} />
		{/*	<p>*/}
		{/*		<label htmlFor="hideSourceOnDrag">*/}
		{/*			<input*/}
		{/*				id="hideSourceOnDrag"*/}
		{/*				type="checkbox"*/}
		{/*				checked={hideSourceOnDrag}*/}
		{/*				onChange={toggle}*/}
		{/*			/>*/}
		{/*			<small>Hide the source item while dragging</small>*/}
		{/*		</label>*/}
		{/*	</p>*/}
		</div>
	)
}
