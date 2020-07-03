import React, { useState } from 'react'
import { useDrop, XYCoord } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { Box } from './Box'
import update from 'immutability-helper'
import { DragItem } from './interfaces'
import background from '../img/dartboardExample.png'
import SCIMDartboard from "../scim-dartboard"
import CaptureImage from "../CaptureImage"
import {Container as BSContainer, Row, Col } from 'react-bootstrap'



import ConnectNodes from "./ConnectNodes";
import { CoordBox } from '../CoordBox.js'
import { DrawStuff } from "../DrawStuff";
// import AddBoxes from './AddBoxes'
// !!!!! @todo export as PNG ...
// !!!!!! @todo ability to delete box
// !!!!! @todo remove same node from connecting node in list
//!!!!!!! fix deletion not working properly
//!!!!!!@todo also fix lines that connect to something thats disappeared.
//!!!!!!@todo move stuff in to components

const styles: React.CSSProperties = {
	width: 1024,
	height: 1024,
	border: '1px solid black',
	position: 'relative',
	backgroundImage: background,
	whiteSpace: 'break-spaces',
	//backgroundColor: 'blue'
}

const formStyle: React.CSSProperties = {
	//float: 'left',
	// paddingLeft: '20px'
} as React.CSSProperties

export interface ContainerProps {
	hideSourceOnDrag: boolean
}

export interface ContainerState {
	boxes: { [key: string]: { top: number; left: number; title: string, connectedTo?: Array<any> } }
}

export const Container: React.FC<ContainerProps> = ({ hideSourceOnDrag }) => {
	const [boxes, setBoxes] = useState<{
		[key: string]: {
			top: number
			left: number
			title: string
			connectedTo?: Array<any>
			// boxes?: Object
		//	need to calculate center
		}
	}>({
		cooling: { top: 432, left: 612, title: 'Cooling', connectedTo: [] },
		cooking: { top: 616, left: 535, title: 'Cooking', connectedTo: ['tapWater', 'kitchenStores'] },
		energyMarkets: { top: 644, left: 760, title: 'Energy \nMarkets', connectedTo: ['powerStation'] },
		foodShops: { top: 735, left: 445, title: 'Food \nShops', connectedTo: []},
		foodMarkets: { top: 798, left: 440, title: 'Food \nMarkets', connectedTo: [] },
		fuelMarkets: { top: 784, left: 597, title: 'Fuel \nMarkets', connectedTo: [] },
		heating: { top: 548, left: 613, title: 'Heating', connectedTo: [] },
		home: { top: 487, left: 628, title: 'Home', connectedTo: [] },
		hospital: { top: 328, left: 328, title: 'Hospital', connectedTo: []},
		kitchenStores: { top: 616, left: 440, title: 'Kitchen \nStores' , connectedTo: []},
		military: { top: 216, left: 630, title: 'Military', connectedTo: [] },
		police: { top: 300, left: 619, title: 'Police', connectedTo: [] },
		powerStation: { top: 538, left: 761, title: "Power \nStation", connectedTo: ['cooking', 'heating', 'cooling', 'home'] },
		sewagePlant: { top:435, left: 264, title: 'Sewage \nPlant', connectedTo: ['toilet'] },
		tapWater: { top: 540, left: 365, title: 'Tap \nWater', connectedTo: [] },
		toilet: { top: 454, left: 356, title: 'Toilet', connectedTo: [] },
		waterPlant: { top: 540, left: 270, title: 'Water \nPlant', connectedTo: ['toilet', 'tapWater'] },
	})

	const [textBox, setTextBox] = useState('')
	const [lineFrom, setLineFrom] = useState('')
	const [lineTo, setLineTo] = useState('')
	const [itemToRemove, setItemToRemove] = useState('')

	// hmmmmm, dont seem to be able to get the text to split over lines when rendered
	// maybe should just manually draw on all the other stuff...!?

	// convert to svg
	// create anchor at centre point of text instead of at corner of box
	// create an svg background

	const [, drop] = useDrop({
		accept: ItemTypes.BOX,
		drop(item: DragItem, monitor) {
			const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
			const left = Math.round(item.left + delta.x)
			const top = Math.round(item.top + delta.y)
			moveBox(item.id, left, top)
			// set a value
			return undefined
		},
	})

	const moveBox = (id: string, left: number, top: number) => {
		setBoxes(
			update(boxes, {
				[id]: {
					$merge: { left, top },
				},
			}),
		)
	}

	const addAnother = (e: any) => {
		e.preventDefault();
		const cleaned = cleanText(textBox);
		const allBoxes =
		setBoxes({...boxes, [cleaned]: {top: 50, left: 450, title: textBox, connectedTo: []}})
		
		// add to obj and then sort

	}

	const updateText = (e: any) => {
		console.log('where is the value we need: ', (e));
		console.log('cleaning: ', cleanText(e.target.value))
		setTextBox(e.target.value)
	}

	const cleanText = (text: string) => {
		return text.replace(/[`~!@#$ £%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
	}

	const updateLineFrom = (e: any) => {
		setLineFrom(e.target.value)
	}

	const updateLineTo = (e: any) => {
		setLineTo(e.target.value)
	}

	const connectLines = (e: any) => {
		e.preventDefault()
		const box = boxes[lineFrom];
		const allBoxes = boxes
		// @ts-ignore
		allBoxes[lineFrom].connectedTo.push(lineTo)
		// check item exists on array
		setBoxes({...allBoxes})
		// hmmmm, what is going on... mebs because of how updates are gand
		// setBoxes(
		// 	update(boxes, {
		// 		[lineFrom]: {
		// 			$merge: { left, top },
		// 		},
		// 	}),
	//	)

		// console.log(e)
		// console.log(lineFrom)
		// console.log(lineTo)
		// console.log(boxes)
	}

	const updateSelectRemove = (e: any) => {
		setItemToRemove(e.target.value)
		console.log('td',e.target.value )
	}

	const removeBox = (e: any) => {
		e.preventDefault()
		let allBoxes = boxes
		// @ts-ignore
		Object.keys(allBoxes).map((key) => {
			// @ts-ignore
			allBoxes[key].connectedTo = allBoxes[key].connectedTo.filter(item => item !== itemToRemove)
		})
		delete allBoxes[itemToRemove]
		setBoxes({...allBoxes})
	}

	const sortByAlphabet = (boxObj:any) => {
		return Object.keys(boxObj)
			.sort()
			.reduce((acc, key) => ({
				...acc, [key]:boxObj[key]
			}), {})
	}

	const clearAllBoxes = () => {
		setBoxes({})
	}


	//!!!!!! @todo fix this --- was a demo bit at one point but doesnt work when removing

//	let connection = [{x1: boxes.powerStation.top, y1: boxes.powerStation.left,  x2: boxes.cooking.top, y2: boxes.cooking.left}]
	// do something that gives connections but here... hard code them
	// so.... we can access state and pass that down to the thing to draw graphics...
	// give them all a div tag so can removed when is about to update
	//const nodeConnections:Array<any> = connection//[{x1:0, y1: 0, x2: 100, y2:100 }]
	//!!!! actually this should be in state!!!!!
	console.log(boxes)
	return (

		<BSContainer>
			<Row>
				<Col>

			{/*<div className={'formWrapper'} style={{float:'left'}}>*/}
			<Row>
			<form id="addAnother" onSubmit={addAnother} style={formStyle}>
				<label>
					Add Item
					<input type="text" value={textBox} placeholder="title" onChange={updateText} />
				</label>
				<input type="submit" value="Create" />
			</form>
			</Row>

				<Row>
					<form style={formStyle}>
						<label htmlFor={'removeBox'}>Remove Item</label>

						<select name={'removeBox'} onChange={updateSelectRemove}>
							<option key={'selectRemove'} value={'selectRemove'} >Select</option>
							{Object.keys(boxes).map(key => <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>)}
						</select>
						<button type={"submit"} value={"submit"} onClick={removeBox}>Remove</button>
					</form>

				</Row>

				<Row>
					<form style={formStyle}>
						<label htmlFor="connectFrom">Connect</label>

						<select name="connectFrom" id="connectFromSelect" onChange={updateLineFrom}>
							<option key={'selectLineFrom'} value={'selectLineFrom'}>Select</option>
							{Object.keys(boxes).map(key => <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>)}
						</select>

						<label htmlFor="connectTo">To</label>
						<select name="connectFrom" id="connectFromSelect" onChange={updateLineTo}>
							<option key={'selectLineTo'} value={'selectLineTo'}>Select</option>
							{Object.keys(boxes).map(key => <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>)}
						</select>

						<button type="submit" value="submit" onClick={connectLines}>Connect</button>

					</form>

				</Row>
			{/*<form></form>*/}
			{/*<Col>*/}
			{/*	<button onClick={clearAllBoxes}>Clear All</button>*/}
			{/*</Col>*/}
			<Row>
				<Col>
					<button onClick={clearAllBoxes}>Clear All</button>
				</Col>
				<Col>
					<CaptureImage/>
				</Col>
			</Row>
				</Col>

			{/*</div>*/}
			<Col>

		<div ref={drop} style={styles} id={'scimContainer'}>
			{/*<form onSubmit={addAnother}>*/}
			{/*	<label>*/}
			{/*		Title:*/}
			{/*		<input type="text" value={textBox} placeholder="enter text" onChange={updateText} />*/}
			{/*	</label>*/}
			{/*	<input type="submit" value="Create" />*/}
			{/*</form>*/}
			{/*<Box*/}
			{/*	key={'foo'}*/}
			{/*	id={'foo'}*/}
			{/*	left={20}*/}
			{/*	top={30}*/}
			{/*	hideSourceOnDrag={hideSourceOnDrag}*/}
			{/*>*/}
			{/*	Hello world*/}
			{/*</Box>*/}
			{/*<AddBoxes/>*/}

			{/*<SCIMDartboard connections={nodeConnections}/>*/}
			<SCIMDartboard boxes={boxes}/>
			{/*uhm.... why????*/}

			{/*return {Object.keys(boxes).map((key) => {}*/}


			{/*<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300px" height="200px">*/}
			{/*	<line x1={500} y1={500} x2="1" y2="1" stroke="blue" stroke-width="5" />*/}
			{/*</svg>*/}

			{Object.keys(boxes).map((key) => {
				const { left, top, title, connectedTo } = boxes[key]
				return (
					// <div className="aConnection">
						<div key={"box"+key}>
						{/*<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300px" height="200px">*/}
						{/*	<line x1={left} y1={top} x2="1" y2="1" stroke="blue" stroke-width="5" />*/}
						{/*</svg>*/}
						{/*</div>*/}
					{/*<CoordBox/>*/}
						<Box
							key={key}
							id={key}
							left={left}
							top={top}
							hideSourceOnDrag={hideSourceOnDrag}
							// connectedTo={connection}
						>

							{title}

						</Box>
					</div>
				)
			})}
		</div>
			</Col>
			</Row>
		</BSContainer>
	)
}
