import React, { useState, useCallback } from 'react'
import { Container } from './Container'
import dartboardExample from "../img/dartboardExample.png";
// import { useParams} from "react-router";

export const Example: React.FC = (props: any) => {
	const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
	const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
		hideSourceOnDrag,
	])

	// const {id} = props;
	// console.log('PROPS', props)
	// 	// console.log('ID', id)
	// const {ipfsHash} = useParams();
	// console.log('used params: ', ipfsHash)
	// @ts-ignore
	// @ts-ignore
	return (
		<div>

			<Container hideSourceOnDrag={hideSourceOnDrag} ipfsId={props.id}/>
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
