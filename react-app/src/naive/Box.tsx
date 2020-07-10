import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

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
			{children}
		</div>
	)
}
