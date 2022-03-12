import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotesAPI, { NoteProps } from '../../utils/api'
import NoteItem from './note-item';

const IndexPage = () => {
	const navigate = useNavigate();
	const [notes, setNotes] = useState<NoteProps[]>([]);

	useEffect(() => {
		refreshNotes();
	}, []);

	function refreshNotes() {
		const notes = NotesAPI.getAllNotes();

		setNotes(notes);
	}

	const onNoteSelect = (noteId: number) => {
		navigate(`/detail/${noteId}`);
	};

	const onNoteAdd = () => {
		const newNote = {
			title: "新建笔记",
			body: "开始记录...",
		};

		NotesAPI.saveNote(newNote);
		refreshNotes();
		// navigate('/detail');
	};

	function onNoteDelete(noteId: number) {
		NotesAPI.deleteNote(noteId);
		refreshNotes();
	}

	return (
		<div className='notes__sidebar'>
			<button className='notes__add' type='button' onClick={onNoteAdd}>添加新的笔记 📒</button>
			<div className='notes__list'>
				{
					notes.length ? notes.map((item: NoteProps, i: number) => (
						<NoteItem
							key={i}
							{...item}
							onSelect={onNoteSelect}
							onDelete={onNoteDelete}
						/>
					)) : <div className="notes__empty-tips">暂无笔记</div>
				}
			</div>
		</div>
	)
};

export default IndexPage;
