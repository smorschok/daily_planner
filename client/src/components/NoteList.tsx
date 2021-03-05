import React from "react";
import { Button } from "react-bootstrap";
import { DeleteNote, NoteProps } from "../interface";
export const NoteList: React.FC<DeleteNote> = ({
  noteList,
  deleteNoteHandler,
}) => {
  return (
    <>
      {noteList.map((note: NoteProps, index: number) => (
        <div className="card" key={index}>
          <div className="d-flex justify-content-between">
            <h6 className="m-0 p-2">
              {note.day < 10 ? "0" + note.day : note.day}.
              {note.month + 1 < 10 ? "0" + (note.month + 1) : note.month + 1}.
              {note.year} {note.hour}:00
            </h6>
            <Button
              variant="light"
              className="d-flex bi bi-x pl-1 pr-1 pt-1 pb-1"
              style={{ fontSize: "1.2rem" }}
              onClick={() => deleteNoteHandler(note)}
            ></Button>
          </div>
          <p className="p-2">{note.text}</p>
        </div>
      ))}
      {noteList.length === 0 && (
        <div className="card card-body ">
          <h3 className="text-center">There are no notes</h3>
        </div>
      )}
    </>
  );
};
