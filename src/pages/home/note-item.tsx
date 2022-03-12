import React, { FC } from "react";
import { NoteProps } from "../../utils/api";

interface NoteItemProps extends NoteProps {
	onSelect: Function;
	onDelete: Function;
}

const NoteItem: FC<NoteItemProps> = ({ id, title, body, updated, onSelect, onDelete }) => {
	let count = 0;
	const MAX_BODY_LENGTH = 60;
	let timer: any;

	const handleClick = () => {
		count += 1;
		timer = setTimeout(() => {
			if (count === 2) {
				const doDelete = confirm('确认要删除该笔记吗?');

				if (doDelete) {
					onDelete(id);
				}
			} else {
				onSelect(id);
			}
			count = 0;
			clearTimeout(timer);
		}, 200)
	};

	return (
		<div className='notes__list-item' data-note-id={id} onClick={handleClick}>
			<div className='notes__small-title'>{title}</div>
			<div className='notes__small-body'>
				{body.substring(0, MAX_BODY_LENGTH)}
			</div>
			<div className='notes__small-updated'>
				{updated?.toLocaleString(undefined, {
					dateStyle: 'full',
					timeStyle: 'short',
				})}
			</div>
		</div>
	)
}

export default NoteItem;
