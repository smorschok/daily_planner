import React from "react";
import { Card } from "react-bootstrap";
import { UserProps } from "../interface";

export const UserCard: React.FC<{ user: UserProps }> = ({ user }) => {
  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>{user.email}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Registration date
        </Card.Subtitle>
        <Card.Text>
          {user.registrationDate.slice(0, 10).split("-").reverse().join("-")}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          Last login date
        </Card.Subtitle>
        <Card.Text>
          {user.lastLogin.slice(0, 10).split("-").reverse().join("-")}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          Number of notes
        </Card.Subtitle>
        <Card.Text>{user.owner.length}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Active</Card.Subtitle>
        <Card.Text>{user.active ? "online" : "not online"}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Status</Card.Subtitle>
        <Card.Text>{user.block ? "blocked" : "not blocked"}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Access</Card.Subtitle>
        <Card.Text>{user.admin ? "admin" : "user"}</Card.Text>
      </Card.Body>
    </Card>
  );
};
