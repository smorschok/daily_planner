import React from "react";
import * as calendar from "../components/calendar";
import classnames from "classnames";
import { AddNote } from "../components/AddNote";
import { Form } from "react-bootstrap";

interface IProps {
  date: Date;
  monthName: string[];
  weekDayNames: string[];
}

interface IState {
  date: Date;
  currentDate: Date;
  selectedDate: any;
}
interface IRefs {
  yearSelect: HTMLSelectElement;
}
export default class Calendar extends React.Component<IProps, IState, IRefs> {
  static defaultProps: IProps = {
    date: new Date(),
    monthName: [
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
    ],
    weekDayNames: ["пн", "вт", "ср", "чт", "пт", "сб", "вс"],
  };

  state: IState = {
    date: this.props.date,
    currentDate: new Date(),
    selectedDate: null,
  };

  yearSelect: any = null;
  monthSelect: any = null;
  get year() {
    return this.state.date.getFullYear();
  }
  get month() {
    return this.state.date.getMonth();
  }

  get day() {
    return this.state.date.getDate();
  }

  get selectedYears() {
    let years = [];
    let numberYears = 0;
    for (
      let i = this.state.date.getFullYear() - 5;
      i < this.state.date.getFullYear() + 5;
      i++
    ) {
      years[numberYears++] = i;
    }

    return years;
  }

  handlePrevMonth = () => {
    const date = new Date(this.year, this.month - 1);
    this.setState({ date });
  };
  handleNextMonth = () => {
    const date = new Date(this.year, this.month + 1);
    this.setState({ date });
  };
  handleSelectedChange = () => {
    const year = this.yearSelect.value;
    const month = this.monthSelect.value;
    const date = new Date(year, month);
    this.setState({ date });
  };

  handleDayClick = (date: Date) => {
    this.setState({ selectedDate: date });
  };
  render() {
    const { monthName, weekDayNames } = this.props;
    const { selectedDate, currentDate } = this.state;
    const monthData = calendar.getMonthData(this.year, this.month);
    
    return (
      <div className="calendar container card mt-2">
        <h1 className="text-center">CALENDAR</h1>
        <header className="d-flex justify-content-around">
          <button className="btn fs-5 mb-3" onClick={this.handlePrevMonth}>
            <i className=" bi-arrow-left-circle-fill d-flex justify-content-center"></i>
          </button>
          <Form className="d-flex justify-content-around align-items-center">
            <Form.Group>
              <Form.Control
                as="select"
                custom
                className="form-select mr-1"
                onChange={this.handleSelectedChange}
                value={this.month}
                ref={(element: any) => (this.monthSelect = element)}
              >
                {monthName.map((name, index) => (
                  <option key={name} value={index}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="select"
                custom
                className="form-select ml-1"
                onChange={this.handleSelectedChange}
                value={this.year}
                ref={(element: any) => (this.yearSelect = element)}
              >
                {this.selectedYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
          <button className="btn fs-5 mb-3" onClick={this.handleNextMonth}>
            <i className="bi bi-arrow-right-circle-fill d-flex justify-content-center"></i>
          </button>
        </header>

        <table className="table table-bordered mt-2">
          <thead className="text-center">
            <tr>
              {weekDayNames.map((name) => (
                <th key={name}>{name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {monthData.map((week, index) => (
              <tr key={index} className="text-center">
                {week.map((date: Date, index: number) => (
                  <td
                    className={classnames("hover", {
                      "border border-5": calendar.getDayNow(date, currentDate),
                      "bg-info-active": calendar.getDayNow(date, selectedDate),
                    })}
                    key={index}
                    onClick={() => {
                      this.handleDayClick(date);
                    }}
                  >
                    {date.getDate()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {selectedDate && (
          <AddNote
            year={selectedDate.getFullYear()}
            month={selectedDate.getMonth()}
            day={selectedDate.getDate()}
          />
        )}
      </div>
    );
  }
}
