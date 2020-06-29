import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { DrawStuff }  from '../DrawStuff'
// would  be really good if there was  way to resize box shapes...
// https://raw.githubusercontent.com/kdeloach/react-lineto/master/preview.png
// also try by self. Create a fresh project. Click a button to draw a line... then also need a way to delete it...
// The ideal case here is that we output json for the current state of this thing...
// if connectors snap to modify also need to deal with alignment...
// d3 really seems like the correct choice to get this done...
// or create a global state with json and shuffle around nodes
// would also be nice to be able to resize...
// also need to work on own website...
// either hugo or node...
// very fast to edit and publish

const style: React.CSSProperties = {
	position: 'absolute',
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.2rem 0.2rem',
	cursor: 'move',
	fontSize: '0.7em'
}

export interface BoxProps {
	id: any
	left: number
	top: number
	hideSourceOnDrag?: boolean
	connectedTo?: Array<any> // should probably generate a hash and also need to tidy up all the promiscuous anys...
}

export const Box: React.FC<BoxProps> = ({
	id,
	left,
	top,
	hideSourceOnDrag,
	children,
}) => {
	const [{ isDragging }, drag] = useDrag({
		item: { id, left, top, type: ItemTypes.BOX },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	if (isDragging && hideSourceOnDrag) {
		return <div ref={drag} />
	}
	return (
		<div ref={drag} style={{ ...style, left, top }}>
			{/*<a href='#'>Line</a>*/}

			{children}
			{/*<DrawStuff></DrawStuff>*/}
			{/*{top} {left}*/}

			{/* add offset */}
			{/*<p>left: { left }</p>*/}
			{/*<p>top: { top }</p>*/}
		{/*	create another component that tracks movement */}
		{/* export to pdf or svg */}
		</div>
	)
}
