import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import { useHttp } from "../hook/http.hook";

export const AuthPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const toast = useContext(ToastContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError, toast]);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("api/auth/register", "POST", { ...form });
      toast.success(data.message);
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request("api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId, data.admin, data.user);
    } catch (e) {}
  };

  return (
    <div className="container d-flex justify-content-center pt-4">
      <div className="col-sm-6 border border-primary p-4">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              onChange={changeHandler}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={changeHandler}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button
              variant="primary"
              className="mr-1 border border-dark"
              onClick={loginHandler}
              disabled={loading}
            >
              Sign in
            </Button>
            <Button
              variant="light"
              className="ml-1 border border-dark"
              onClick={registerHandler}
              disabled={loading}
            >
              Sign up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
