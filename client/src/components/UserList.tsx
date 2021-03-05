import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import { UserListProps } from "../interface";
import { AuthContext } from "../context/AuthContext";

export const UserList: React.FC<UserListProps> = ({
  users,
  onToggleUser,
  getAllCheck,
  selectedUsers,
}) => {
  const auth = useContext(AuthContext);
  return (
    <>
      <Table hover responsive="sm" size="sm" bordered>
        <thead>
          <tr>
            <th className="text-center">
              <input
                onChange={() => getAllCheck()}
                checked={selectedUsers.length === users.length}
                type="checkbox"
              ></input>
            </th>
            <th>email</th>
            <th>Number of notes</th>
            <th>Active</th>
            <th>Status</th>
            <th>Access</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((i) => i._id !== auth.userId)
            .map((i) => {
              return (
                <tr
                  className={classnames("", {
                    "table-hover tbody tr active": selectedUsers.includes(
                      i._id
                    ),
                    "tr blocked": i.block,
                  })}
                  key={i._id}
                >
                  <td className="text-center">
                    <input
                      onChange={() => onToggleUser(i._id)}
                      type="checkbox"
                      checked={selectedUsers.includes(i._id)}
                    ></input>
                  </td>
                  <td>{i.email}</td>

                  <td>{i.owner.length}</td>
                  <td>{i.active ? "online" : "not online"}</td>
                  <td>{i.block ? "blocked" : "not blocked"}</td>
                  <td>{i.admin ? "admin" : "user"}</td>
                  <td>
                    <NavLink to={`/admin/${i._id}`}>Check</NavLink>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};
