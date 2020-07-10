import React, { useState } from 'react'
import { useDrop, XYCoord } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { Box } from './Box'
import update from 'immutability-helper'
import { DragItem } from './interfaces'
import background from '../img/dartboardExample.png'
import ScimSmartboard from "../ScimDartboard" // <-- rename this to upper camel case
import CaptureImage from "../CaptureImage"
import {Container as BSContainer, Row, Col, Button, Form  } from 'react-bootstrap'
import Header from '../Header'
import PostToIPFS from '../postToIPFS'

const styles: React.CSSProperties = {
	width: 1024,
	height: 1024,
	// border: '1px solid black',
	position: 'relative',
	backgroundImage: background,
	whiteSpace: 'break-spaces',

	//backgroundColor: 'blue'
}

const formStyle: React.CSSProperties = {
	// paddingTop: '1em'
	//float: 'left',
	// paddingLeft: '20px'
// } as React.CSSPropertie
}

const breathingSpace: React.CSSProperties = {
	paddingTop: '5em'
}

export interface ContainerProps {
	hideSourceOnDrag: boolean
	ipfsId: string
}

export interface ContainerState {
	boxes: { [key: string]: { top: number; left: number; title: string, connectedTo?: Array<any> } }
}

export const Container: React.FC<ContainerProps> = ({ hideSourceOnDrag, ipfsId} ) => {
	const [boxes, setBoxes] = useState<{
		[key: string]: {
			top: number
			left: number
			title: string
			connectedTo?: Array<any>
			// boxes?: Object
		//	need to calculate center
		}
	}>(() => {
		console.log('try and do something else first', ipfsId)

		// also check length and characters
		if (ipfsId !== undefined && ipfsId.charAt(0) === 'Q') {
			console.log('attempting to load', ipfsId)
			fetch('https://gateway.pinata.cloud/ipfs/' + ipfsId)
				.then(async (response) => {
					const someJson = await response.json()
					console.log(someJson)
					setBoxes(someJson.boxes)
				})

			// fix bug so doesn't fall over
			//return {}

		}

		return {
		cooling: {top: 432, left: 612, title: 'Cooling', connectedTo: []},
		cooking: {top: 616, left: 535, title: 'Cooking', connectedTo: ['tapWater', 'kitchenStores']},
		energyMarkets: {top: 644, left: 760, title: 'Energy \nMarkets', connectedTo: ['powerStation']},
		foodShops: {top: 735, left: 445, title: 'Food \nShops', connectedTo: []},
		foodMarkets: {top: 798, left: 440, title: 'Food \nMarkets', connectedTo: []},
		fuelMarkets: {top: 784, left: 597, title: 'Fuel \nMarkets', connectedTo: []},
		heating: {top: 548, left: 613, title: 'Heating', connectedTo: []},
		home: {top: 487, left: 628, title: 'Home', connectedTo: []},
		hospital: {top: 328, left: 328, title: 'Hospital', connectedTo: []},
		kitchenStores: {top: 616, left: 440, title: 'Kitchen \nStores', connectedTo: []},
		military: {top: 216, left: 630, title: 'Military', connectedTo: []},
		police: {top: 300, left: 619, title: 'Police', connectedTo: []},
		powerStation: {
			top: 538,
			left: 761,
			title: "Power \nStation",
			connectedTo: ['cooking', 'heating', 'cooling', 'home']
		},
		sewagePlant: {top: 435, left: 264, title: 'Sewage \nPlant', connectedTo: ['toilet']},
		tapWater: {top: 540, left: 365, title: 'Tap \nWater', connectedTo: []},
		toilet: {top: 454, left: 356, title: 'Toilet', connectedTo: []},
		waterPlant: {top: 540, left: 270, title: 'Water \nPlant', connectedTo: ['toilet', 'tapWater']},
	}})

	const [textBox, setTextBox] = useState('')
	const [lineFrom, setLineFrom] = useState('')
	const [lineTo, setLineTo] = useState('')
	const [itemToRemove, setItemToRemove] = useState('')

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

		if (cleaned != '') {
			setBoxes({...boxes, [cleaned]: {top: 50, left: 450, title: textBox, connectedTo: []}})
		} else {
			return null
		}		// const allBoxes =

		
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

	return (


		<BSContainer fluid>
			<Row>
				<Header/>
			</Row>
			<Row>
				<Col sm="auto">

			{/*@todo add ids to formcontrol*/}
			<div style={breathingSpace}></div>
					<h2>Edit Content</h2>
			<Form id="addAnother" onSubmit={addAnother} style={formStyle}>
			<Form.Row>
				{/*<Form.Label>Add Item</Form.Label>*/}
				<Form.Group as={Col} sm={8}>
					<Form.Control type="text" value={textBox} placeholder="Title" onChange={updateText} />
				</Form.Group>
				<Form.Group as={Col} sm={4}>
					<Button type="submit" value="Submit">Add Box</Button>
				</Form.Group>
			</Form.Row>
				</Form>
			{/*</Row>*/}

				{/*@todo add formgroup*/}
				{/*//	controlId="exampleForm.SelectCustomSizeSm*/}

					<Form style={formStyle}>
						<Form.Row>
							{/*<Form.Group>*/}
							{/*/!*<Form.Label htmlFor={'removeBox'}>Remove Item</Form.Label>*!/*/}
							{/*</Form.Group>*/}
							<Form.Group as={Col} sm={8}>

						<Form.Control as={'select'} name={'removeBox'} onChange={updateSelectRemove}>
						{/*<select name={'removeBox'} onChange={updateSelectRemove}>*/}
							<option key={'selectRemove'} value={itemToRemove} >Select</option>
							{Object.keys(boxes).map(key => <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>)}
						</Form.Control>
						</Form.Group>
							<Form.Group as={Col} sm={4}>
							{/*</select>*/}
						<Button type={"submit"} value={"submit"} onClick={removeBox}>Remove</Button>
							</Form.Group>

						</Form.Row>
					</Form>



				{/*<Row>*/}
					<Form style={formStyle}>
						<Form.Row>
						{/*<Form.Label htmlFor="connectFrom">Connect</Form.Label>*/}
						<Form.Group as={Col} sm={4}>
						<Form.Control as={'select'} name="connectFrom" id="connectFromSelect" onChange={updateLineFrom}>
							<option key={'selectLineFrom'} value={'selectLineFrom'}>Select</option>
							{Object.keys(boxes).map(key => <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>)}
						</Form.Control>
						</Form.Group>

						{/*</Form.Col>*/}

						{/*<Form.Label htmlFor="connectTo">To</Form.Label>*/}
						<Form.Group as={Col} sm={4}>
						<Form.Control as={'select'} name="connectFrom" id="connectFromSelect" onChange={updateLineTo}>
							<option key={'selectLineTo'} value={'selectLineTo'}>Select</option>
							{Object.keys(boxes).map(key => <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>)}
						</Form.Control>
						</Form.Group>
						{/*</Form.Group>*/}
						<Form.Group as={Col} sm={4}>
						<Button  type="submit" value="submit" onClick={connectLines}>Connect</Button>
						</Form.Group>
						</Form.Row>
					</Form>

				{/*</Row>*/}
			{/*<form></form>*/}
			{/*<Col>*/}
			{/*	<button onClick={clearAllBoxes}>Clear All</button>*/}
			{/*</Col>*/}
			{/*<Row>*/}
				{/*<Col>*/}
				<br/>
				<form style={formStyle}>
					<Form.Row>
					<Form.Group as={Col} sm={2}>
					<Button variant={"danger"} onClick={clearAllBoxes}>Clear</Button>
					</Form.Group>
				{/*</Col>*/}
				{/*<Col>*/}
					<Form.Group as={Col} sm={6}>
					<CaptureImage/>
					</Form.Group>
					{/*	grey out and disable --- add hovers.... */}
					<Form.Group as={Col} sm={4}>
						<PostToIPFS boxes={boxes}/>
						{/*<Button onClick={undefined}>Save</Button>*/}
					</Form.Group>
					</Form.Row>
				</form>
					{/*<h2>Image</h2>*/}
					{/*<ul>*/}
					{/*	<li>*/}
					{/*		Background / gradient on / off*/}
					{/*	</li>*/}
					{/*	<li>*/}
					{/*		Save to disk*/}
					{/*	</li>*/}
					{/*</ul>*/}
					{/*</Col>*/}
			{/*</Row>*/}
				</Col>

			{/*</div>*/}
			<Col>
				{/*<PostToIPFS boxes={boxes}/>*/}
		<div ref={drop} style={styles} id={'scimContainer'}>

			<ScimSmartboard boxes={boxes}/>

			{Object.keys(boxes).map((key) => {
				const { left, top, title, connectedTo } = boxes[key]
				return (
					// <div className="aConnection">
						<div key={"box"+key}>

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
