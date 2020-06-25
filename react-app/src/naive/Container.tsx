import React, { useState } from 'react'
import { useDrop, XYCoord } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { Box } from './Box'
import update from 'immutability-helper'
import { DragItem } from './interfaces'
import background from '../img/dartboardExample.png'
import SCIMDartboard from "../scim-dartboard";
import { CoordBox } from '../CoordBox.js'
import { DrawStuff } from "../DrawStuff";
// import AddBoxes from './AddBoxes'

const styles: React.CSSProperties = {
	width: 1024,
	height: 1024,
	border: '1px solid black',
	position: 'relative',
	backgroundImage: background,
	//backgroundColor: 'blue'
}

export interface ContainerProps {
	hideSourceOnDrag: boolean
}

export interface ContainerState {
	boxes: { [key: string]: { top: number; left: number; title: string } }
}

export const Container: React.FC<ContainerProps> = ({ hideSourceOnDrag }) => {
	const [boxes, setBoxes] = useState<{
		[key: string]: {
			top: number
			left: number
			title: string
			connection?: Array<string>
		//	need to calculate center
		}
	}>({
		hospital: { top: 364, left: 315, title: 'Hospital' },
		cooking: { top: 645, left: 540, title: 'Cooking' },
		police: { top: 315, left: 580, title: 'Police' },
		military: { top: 250, left: 610, title: 'Military' },
		cooling: { top: 475, left: 610, title: 'Cooling' },
		home: { top: 520, left: 610, title: 'Home' },
		heating: { top: 565, left: 610, title: 'Heating' },
		powerStation: { top: 625, left: 715, title: "Power Stations" },
		sewagePlant: { top: 500, left: 270, title: 'Sewage Plant' },
		waterPlant: { top: 540, left: 270, title: 'Water Plant' },
		toilet: { top: 500, left: 345, title: 'Toilet' },
		tapWater: { top: 540, left: 345, title: 'Tap Water' },
		kitchenStores: { top: 645, left: 415, title: 'Kitchen Stores' },
		foodShops: { top: 735, left: 445, title: 'Food Shops' },
		foodMarkets: { top: 840, left: 415, title: 'Food Markets' },
		fuelMarkets: { top: 815, left: 590, title: 'Fuel Markets' },
		energyMarkets: { top: 700, left: 725, title: 'Food Markets' },


	})

	const [textBox, setTextBox] = useState('')

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
		setBoxes({...boxes, [cleaned]: {top: 50, left: 450, title: textBox}})

	}

	const updateText = (e: any) => {
		console.log('where is the value we need: ', (e));
		console.log('cleaning: ', cleanText(e.target.value));
		setTextBox(e.target.value);
	}

	const cleanText = (text: string) => {
		return text.replace(/[`~!@#$ £%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
	}

	return (
		<div ref={drop} style={styles}>
			<form onSubmit={addAnother}>
				<label>
					Title:
					<input type="text" value={textBox} placeholder="enter text" onChange={updateText} />
				</label>
				<input type="submit" value="Create" />
			</form>
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
			<SCIMDartboard />
			{Object.keys(boxes).map((key) => {
				const { left, top, title } = boxes[key]
				return (
					<div>
					{/*<CoordBox/>*/}
					<Box
						key={key}
						id={key}
						left={left}
						top={top}
						hideSourceOnDrag={hideSourceOnDrag}

					>
						{title}
					</Box>
					</div>
				)
			})}
		</div>
	)
}
