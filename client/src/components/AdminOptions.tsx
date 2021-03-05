import React from "react";
import { Dropdown } from "react-bootstrap";
import { AdminOptionsProps } from "../interface";

export const AdminOptions:React.FC<AdminOptionsProps> = ({
  users,
  deleteHandler,
  blockHandler,
  unlockHandler,
  addAdminHandler,
  removeAdminHandler
}) => {
  return (
      <div className='d-flex justify-content-end'>
    <Dropdown navbar={true} className='m-2'>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Options
      </Dropdown.Toggle>
      <Dropdown.Menu>
       
      <Dropdown.Header>Block/Unblock</Dropdown.Header>
        <Dropdown.Item onClick={() => blockHandler(users)}>Block</Dropdown.Item>
        <Dropdown.Item onClick={() => unlockHandler(users)}>
          Unlock
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Add/Remove Admin</Dropdown.Header>

        <Dropdown.Item onClick={() => addAdminHandler(users)}>
          Add admin
        </Dropdown.Item>
        <Dropdown.Item onClick={() => removeAdminHandler(users)}>
          Remove admin
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => deleteHandler(users)}>
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
  );
};
