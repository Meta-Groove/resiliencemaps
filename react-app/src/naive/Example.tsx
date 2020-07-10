import React, { useState, useCallback } from 'react'
import { Container } from './Container'

export const Example: React.FC = (props: any) => {
	const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
	const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
		hideSourceOnDrag,
	])

	return (
		<div>

			<Container hideSourceOnDrag={hideSourceOnDrag} ipfsId={props.ipfsId}/>
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
