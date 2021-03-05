import React, { useCallback, useContext, useEffect, useState } from "react";
import classnames from "classnames";
import { useHttp } from "../hook/http.hook";
import { ModalNote } from "./ModalNote";
import { Data, NoteProps } from "../interface";
import { Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { NoteList } from "./NoteList";
import { Loader } from "./Loader";
import { ToastContext } from "../context/ToastContext";
const hoursDay: string[] = ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23",];

interface Date {
  year: number;
  month: number;
  day: number;
}

export const AddNote: React.FC<Date> = ({ year, month, day }) => {
  const auth = useContext(AuthContext);
  const { request, error, clearError,loading } = useHttp();
  const toast = useContext(ToastContext)
  const [getMonth, setGetMonth] = useState(month);
  const [getYear, setGetYear] = useState(year);
  const [note, setNote] = useState<Data>({
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    text: "",
  });
  const [fetchedNote, setFetchedNote] = useState<[]>();
  const [hours, setHour] = useState(0);
  const [noteList, setNoteList] = useState<never[]>([]);
  const [currentText, setCurrentText] = useState("Текста пока нет");
  const [addChangeNote, setAddChangeNote] = useState<string>("Add note");
  const [hourActive, setHourActive] = useState(false);
  useEffect(() => {
    setGetMonth(month);
  }, [month]);
  useEffect(() => {
    setGetYear(year);
  }, [year]);

  useEffect(() => {
    setNote({
      year: year,
      month: month,
      day: day,
      hour: hours,
      text: currentText,
    });
  }, [year, month, day, hours, currentText]);

  useEffect(() => {
    if (error) {
      toast.error(error)
      clearError();
    }
  }, [error, clearError,toast]);

  const fetched = useCallback(async () => {
    try {
      const data = await request(
        "/api/date/note",
        "POST",
        { getYear, getMonth },
        { Authorization: `Bearer ${auth.token}` }
      );
      setFetchedNote(data);
    } catch (e) {}
  }, [request, getYear, getMonth, auth.token]);

  useEffect(() => {
    fetched();
  }, [fetched]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(event.target.value);
  };

  const getText = async () => {
    try {
      const data = await request(
        "/api/date",
        "POST",
        { ...note },
        { Authorization: `Bearer ${auth.token}` }
      );
      fetched()
      toast.success(data.message)

     
    } catch (e) {}
  };

  const getNote = useCallback(() => {
    if (!hourActive && fetchedNote) {
      const noteList:never[] = fetchedNote.filter(
        (i: NoteProps) =>
        
          i.year === note.year && i.month === note.month && i.day === note.day
      );
      if (noteList.length > 0) {
        setNoteList(noteList);
      } else {
        setNoteList([]);
      }

    }
    if (hourActive && fetchedNote) {
      const noteList: never[] = fetchedNote.filter(
        (i: NoteProps) =>
          i.year === note.year &&
          i.month === note.month &&
          i.day === note.day &&
          i.hour === note.hour
      );
      if (noteList.length > 0) {
        setNoteList(noteList);
        setAddChangeNote("Change note");
      } else {
        setNoteList([]);
        setAddChangeNote("Add note");
      }
    }
  }, [fetchedNote, note, hourActive]);

  useEffect(() => {
    getNote();
  }, [getNote, fetchedNote]);

  const getHour = (index: number) => {
    setHour(index);
    setHourActive(true);
  };

  const getAllNote = () => {
    setHourActive(false);
    setAddChangeNote("Add note");
    setHour(0)

  };
  const deleteNoteHandler = async(note:NoteProps)=>{
try {
  const data = await request('/api/date/delete','POST',{...note}, { Authorization: `Bearer ${auth.token}` })
   fetched()
   toast.success(data.message)

 
} catch (e) {
  
}
  }

  return (
    <>
      <div>
        <div className="card">
        <div className='text-right'> 
        <Button onClick={getAllNote} disabled={!hourActive}>All notes for the selected day</Button>
        </div>

          <h5 className="text-center">Select an hour</h5>
          <div className="d-flex justify-content-center flex-wrap">
            {hoursDay.map((hour: string, index: number) => {
              return (
                <span
                  className={classnames(
                    "border hover fs-6 badge text-dark m-1",
                    {
                      "bg-info-active": index === note.hour && hourActive,
                    }
                  )}
                  onClick={() => getHour(index)}
                  key={index}
                >
                  {hour}
                </span>
              );
            })}
          </div>
        </div>
        <div className='pl-2'>
        <h6>Selected date: </h6>
        
        <h6>
        {day < 10 ? "0" + day  : day}.{month + 1 < 10 ? "0" + (month + 1) : month + 1}.{year} {hours}
          :00
        </h6>
</div>
        {!loading && <NoteList noteList={noteList} deleteNoteHandler={deleteNoteHandler}/>}
        {loading && <Loader/>}
      </div>
      <ModalNote
        handleChange={handleChange}
        getText={getText}
        addChangeNote={addChangeNote}
        hourActive={hourActive}
      />
     
    </>
  );
};
