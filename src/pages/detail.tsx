import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NotesAPI, { NoteProps } from '../utils/api';

const DetailPage = () => {
	const params = useParams();
	const navigate = useNavigate()
	const [noteId, setNoteId] = useState<number>(0);
	const [activeNote, setActiveNote] = useState<NoteProps>(NotesAPI.getNote(noteId));
	const [initTitle, setInitTitle] = useState(activeNote.title);
	const [initContent, setInitContent] = useState(activeNote.title);
	const [shouldShowSaveButton, toggleShowSaveButton] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	useEffect(() => {
		if (params.id) {
			setNoteId(Number(params.id));
		}
	}, [params]);

	useEffect(() => {
		setActiveNote(NotesAPI.getNote(noteId))
	}, [noteId]);

	useEffect(() => {
		if (activeNote) {
			setTitle(activeNote.title as string);
			setContent(activeNote.body as string);
		}
	}, [activeNote]);

	const handleChangeTitle = (e: SyntheticEvent) => {
		const { value } = e.target as HTMLInputElement;
		toggleShowSaveButton(initTitle !== value);
		setTitle(value);
	}

	const handleChangeContent = (e: SyntheticEvent) => {
		const { value } = e.target as HTMLInputElement;
		toggleShowSaveButton(initContent !== value);
		setContent(value);
	}

	const handleSave = () => {
		NotesAPI.saveNote({
			id: noteId,
			title,
			body: content,
		});

		setInitTitle(title);
		setInitContent(content);
		toggleShowSaveButton(false);
	};

	const handleDelete = useCallback(() => {
		const doDelete = confirm('确认要删除该笔记吗?');

		if (doDelete) {
			NotesAPI.deleteNote(noteId)
			handleBack();
		}
	}, [noteId]);

	const handleBack = () => navigate(-1);

	return (
		<div className='notes__preview'>
			<input className='notes__title' type='text' placeholder='新笔记...' value={title} onChange={handleChangeTitle} />
			<textarea className='notes__body' placeholder='编辑笔记...' value={content} onChange={handleChangeContent} />
			<button className="notes__save" onClick={handleSave} style={{ visibility: shouldShowSaveButton ? 'visible' : 'hidden' }}>保存</button>
			<button className="notes__delete" onClick={handleDelete}>删除</button>
			<button className="notes__back" onClick={handleBack}>返回</button>
		</div>
	)
};

export default DetailPage;
