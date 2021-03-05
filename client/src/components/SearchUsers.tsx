import React from "react";
import { Form } from "react-bootstrap";

export const SearchUsers: React.FC<any> = ({ search }) => {
  return (
    <Form>
      <Form.Group className="m-2">
        <Form.Control
          onChange={(e) => search(e)}
          type="text"
          placeholder="Search by email"
        />
      </Form.Group>
    </Form>
  );
};
