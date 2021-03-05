import React from "react";
import { Form } from "react-bootstrap";
import { PropsFormSelect } from "../../interface";
import { SelectOption } from "./SelectOption";

export const FormSelect: React.FC<PropsFormSelect> = ({
  handleFirstDateChange,
  handleSecondDateChange,
  firstDate,
  secondDate,
  listDays,
  listYears,
  monthName,
}) => {
  return (
    <div className="container ">
      <div className="d-flex flex-column align-items-center">
        <span className="mb-1">from</span>

        <Form className="d-flex">
          <SelectOption
            handleDateChange={handleFirstDateChange}
            date={firstDate.month}
            option={monthName}
            name="month"
          />
          <SelectOption
            handleDateChange={handleFirstDateChange}
            date={firstDate.day}
            option={listDays.firstListDays}
            name="day"
          />
          <SelectOption
            handleDateChange={handleFirstDateChange}
            date={firstDate.year}
            option={listYears.firstListYears}
            name="year"
          />
        </Form>
      </div>

      <div>
        <div className="d-flex flex-column align-items-center">
          <span className="mb-1">to</span>

          <Form className="d-flex ">
            <SelectOption
              handleDateChange={handleSecondDateChange}
              date={secondDate.month}
              option={monthName}
              name="month"
            />
            <SelectOption
              handleDateChange={handleSecondDateChange}
              date={secondDate.day}
              option={listDays.secondListDays}
              name="day"
            />
            <SelectOption
              handleDateChange={handleSecondDateChange}
              date={secondDate.year}
              option={listYears.secondListYears}
              name="year"
            />
          </Form>
        </div>
      </div>
    </div>
  );
};
