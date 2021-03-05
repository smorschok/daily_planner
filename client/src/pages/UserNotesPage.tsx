import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { NoteList } from "../components/NoteList";
import { FormSelect } from "../components/SelectDate/FormSelect";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hook/http.hook";
import { useToast } from "../hook/toast.hook";
import { SelectDate, ListYear, ListDays, NoteProps } from "../interface";

export const AllNotes: React.FC = () => {
  const monthName: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const fullDate: Date = new Date();
  const auth = useContext(AuthContext);
  const toast = useToast();

  const [notes, setNotes] = useState<[]>([]);

  const { request, error, clearError, loading } = useHttp();
  const [firstDate, setFirstDate] = useState<SelectDate>({
    year: fullDate.getFullYear(),
    month: fullDate.getMonth(),
    day: fullDate.getDate(),
  });
  const [secondDate, setSecondDate] = useState<SelectDate>({
    year: fullDate.getFullYear(),
    month: fullDate.getMonth(),
    day: fullDate.getDate(),
  });

  const [listYears, setListYears] = useState<ListYear>({
    firstListYears: [],
    secondListYears: [],
  });
  const [listDays, setListDays] = useState<ListDays>({
    firstListDays: [],
    secondListDays: [],
  });

  const [intervalDate, setIntervalDate] = useState<
    { year: number; month: number; days: number[] }[]
  >([]);

  const fetched = useCallback(async () => {
    try {
      const data = await request("api/user/", "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setNotes(data);
    } catch (e) {}
  }, [request, auth.token]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError, toast]);
  useEffect(() => {
    fetched();
  }, [fetched]);

  const selectedYears = useCallback((date: { year: number }) => {
    let years: number[] = [];
    let numberYears: number = 0;
    let prevYears: number = date.year - 5;
    let nextYears: number = date.year + 5;

    for (let i = prevYears; i < nextYears; i++) {
      years[numberYears++] = i;
    }
    return years;
  }, []);

  useEffect(() => {
    setListYears((e) => ({ ...e, firstListYears: selectedYears(firstDate) }));
  }, [selectedYears, firstDate]);
  useEffect(() => {
    setListYears((e) => ({ ...e, secondListYears: selectedYears(secondDate) }));
  }, [selectedYears, secondDate]);

  const selectedDays = useCallback((date: SelectDate) => {
    let days = [];
    let numberDays = 0;
    let daysMonth = new Date(date.year, date.month + 1, 0).getDate();

    for (let i = 1; i <= daysMonth; i++) {
      days[numberDays++] = i;
    }
    return days;
  }, []);
  useEffect(() => {
    setListDays((e) => ({ ...e, firstListDays: selectedDays(firstDate) }));
  }, [selectedDays, firstDate]);
  useEffect(() => {
    setListDays((e) => ({ ...e, secondListDays: selectedDays(secondDate) }));
  }, [selectedDays, secondDate]);
  const handleFirstDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstDate({
      ...firstDate,
      [event.target.name]: parseInt(event.target.value, 10),
    });
  };
  const handleSecondDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondDate({
      ...secondDate,
      [event.target.name]: parseInt(event.target.value, 10),
    });
  };

  const getShowDate = async () => {
    try {
      const data = await request("api/user/show", "POST", intervalDate, {
        Authorization: `Bearer ${auth.token}`,
      });
      setNotes(data);
    } catch (e) {}
  };

  const getPeriodDate = useCallback(() => {
    let fromDate: Date = new Date(
      firstDate.year,
      firstDate.month,
      firstDate.day
    );
    let toDate: Date = new Date(
      secondDate.year,
      secondDate.month,
      secondDate.day
    );
    let i = 0;

    let interval: { year: number; month: number; days: number[] }[] = [];
    interval[0] = {
      year: fromDate.getFullYear(),
      month: fromDate.getMonth(),
      days: [],
    };

    while (fromDate <= toDate) {
      if (
        interval[i].year !== fromDate.getFullYear() ||
        interval[i].month !== fromDate.getMonth()
      ) {
        i++;
        interval[i] = {
          year: 0,
          month: 0,
          days: [],
        };
      }

      if (interval[i].year !== fromDate.getFullYear()) {
        interval[i].year = fromDate.getFullYear();
      }
      if (interval[i].month !== fromDate.getMonth()) {
        interval[i].month = fromDate.getMonth();
      }
      if (interval[i].days.indexOf(fromDate.getDate()) === -1) {
        interval[i].days.push(fromDate.getDate());
      }

      fromDate.setDate(fromDate.getDate() + 1);
    }

    setIntervalDate(interval);
  }, [firstDate, secondDate]);

  useEffect(() => {
    getPeriodDate();
  }, [getPeriodDate]);
  const deleteNoteHandler = async (note: NoteProps) => {
    try {
      const data = await request(
        "/api/date/delete",
        "POST",
        { ...note },
        { Authorization: `Bearer ${auth.token}` }
      );
      fetched();
      toast.success(data.message);
    } catch (e) {}
  };

  return (
    <div className="container pb-2">
      <FormSelect
        handleFirstDateChange={handleFirstDateChange}
        handleSecondDateChange={handleSecondDateChange}
        firstDate={firstDate}
        secondDate={secondDate}
        listDays={listDays}
        listYears={listYears}
        monthName={monthName}
      />
      <div className="container text-center mb-2">
        <button type="button" className="btn btn-info" onClick={getShowDate}>
          Get notes
        </button>
      </div>
      {loading && <Loader />}

      {!loading && (
        <NoteList noteList={notes} deleteNoteHandler={deleteNoteHandler} />
      )}
    </div>
  );
};
