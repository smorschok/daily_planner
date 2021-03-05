import React from "react";
import { Form } from "react-bootstrap";
import { PropsSelectOption } from "../../interface";

export const SelectOption: React.FC<PropsSelectOption> = ({
  handleDateChange,
  date,
  option,
  name,
}) => {
  return (
    <>
      <Form.Group className="mb-2">
        <Form.Control
          as="select"
          custom
          className="form-select mr-1"
          onChange={handleDateChange}
          value={date}
          name={name}
        >
          {option.length === 12 &&
            option.map((name: string, index: number) => (
              <option key={name} value={index}>
                {name}
              </option>
            ))}
          {option.length !== 12 &&
            option.map((name: number) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
    </>
  );
};
