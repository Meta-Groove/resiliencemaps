import React, { useState } from 'react'
import { useDrop, XYCoord } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { Box } from './Box'
import update from 'immutability-helper'
import { DragItem } from './interfaces'
import background from '../img/dartboardExample.png'
import SCIMDartboard from "../scim-dartboard"
import CaptureImage from "../CaptureImage"



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
		hospital: { top: 364, left: 315, title: 'Hospital', connectedTo: []},
		cooking: { top: 645, left: 540, title: 'Cooking', connectedTo: ['tapWater', 'kitchenStores'] },
		police: { top: 315, left: 580, title: 'Police', connectedTo: [] },
		military: { top: 250, left: 610, title: 'Military', connectedTo: [] },
		cooling: { top: 475, left: 610, title: 'Cooling', connectedTo: [] },
		home: { top: 520, left: 610, title: 'Home', connectedTo: [] },
		heating: { top: 565, left: 610, title: 'Heating', connectedTo: [] },
		powerStation: { top: 625, left: 715, title: "Power \nStations", connectedTo: ['cooking', 'heating', 'cooling'] },
		sewagePlant: { top: 500, left: 270, title: 'Sewage \nPlant', connectedTo: ['toilet'] },
		waterPlant: { top: 540, left: 270, title: 'Water \nPlant', connectedTo: ['toilet', 'tapWater'] },
		toilet: { top: 500, left: 345, title: 'Toilet', connectedTo: [] },
		tapWater: { top: 540, left: 345, title: 'Tap \nWater', connectedTo: [] },
		kitchenStores: { top: 645, left: 415, title: 'Kitchen \nStores' , connectedTo: []},
		foodShops: { top: 735, left: 445, title: 'Food \nShops', connectedTo: []},
		foodMarkets: { top: 840, left: 415, title: 'Food \nMarkets', connectedTo: [] },
		fuelMarkets: { top: 815, left: 590, title: 'Fuel \nMarkets', connectedTo: [] },
		energyMarkets: { top: 700, left: 725, title: 'Food \nMarkets', connectedTo: [] },
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
		setBoxes({...boxes, [cleaned]: {top: 50, left: 450, title: textBox, connectedTo: []}})
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

		console.log(e)
		console.log(lineFrom)
		console.log(lineTo)
		console.log(boxes)
	}

	const updateSelectRemove = (e: any) => {
		setItemToRemove(e.target.value)
		console.log('td',e.target.value )
	}

	const removeBox = (e: any) => {
		e.preventDefault()
		const allBoxes = boxes
		delete allBoxes[itemToRemove]
		setBoxes({...allBoxes})
		//console.log('AB', allBoxes)
	}


	//!!!!!! @todo fix this --- was a demo bit at one point but doesnt work when removing

	let connection = [{x1: boxes.powerStation.top, y1: boxes.powerStation.left,  x2: boxes.cooking.top, y2: boxes.cooking.left}]
	// do something that gives connections but here... hard code them
	// so.... we can access state and pass that down to the thing to draw graphics...
	// give them all a div tag so can removed when is about to update
	const nodeConnections:Array<any> = connection//[{x1:0, y1: 0, x2: 100, y2:100 }]
	//!!!! actually this should be in state!!!!!

	return (
		<div>
			<form id="addAnother" onSubmit={addAnother} style={formStyle}>
				<label>
					Add Item
					<input type="text" value={textBox} placeholder="title" onChange={updateText} />
				</label>
				<input type="submit" value="Create" />
			</form>
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
			<form style={formStyle}>
				<label htmlFor={'removeBox'}>Remove Item</label>

				<select name={'removeBox'} onChange={updateSelectRemove}>
					<option key={'selectRemove'} value={'selectRemove'} >Select</option>
					{Object.keys(boxes).map(key => <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>)}
				</select>
				<button type={"submit"} value={"submit"} onClick={removeBox}>Remove</button>
			</form>
			{/*<form></form>*/}
			<CaptureImage/>

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
			<SCIMDartboard connections={connection} boxes={boxes}/>
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
		</div>
	)
}
