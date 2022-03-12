export interface NoteProps {
	body: string
	id?: number
	title: string
	updated?: string | Date
}

export default class NotesAPI {
	static getAllNotes() {
		const notes: any[] = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

		return notes.sort((a, b) => {
			return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
		});
	}

	static getNote(id: number): NoteProps {
		const notes: NoteProps[] = this.getAllNotes();
		if (!id) {
			return notes[0];
		}
		return notes.find((item) => item.id === id) || notes[0];
	}

	static saveNote(noteToSave: NoteProps) {
		const notes = NotesAPI.getAllNotes();
		const existing = notes.find((note) => note.id === noteToSave.id);

		// Edit/Update
		if (existing) {
			existing.title = noteToSave.title;
			existing.body = noteToSave.body;
			existing.updated = new Date().toISOString();
		} else {
			noteToSave.id = Math.floor(Math.random() * 1000000);
			noteToSave.updated = new Date().toISOString();
			notes.push(noteToSave);
		}

		localStorage.setItem("notesapp-notes", JSON.stringify(notes));
	}

	static deleteNote(id: number) {
		const notes = NotesAPI.getAllNotes();
		const newNotes = notes.filter((note) => note.id !== id);
		localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
	}
}
