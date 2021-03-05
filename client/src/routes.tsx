import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AllNotes } from "./pages/UserNotesPage";
import { AuthPage } from "./pages/AuthPage";
import Calendar from "./pages/CalendarPage";
import { AdminPage } from "./pages/AdminPage";
import { AdminUserPage } from "./pages/AdminUserPage";

export const useRoutes = (isAuthenticated: boolean,admin:boolean) => {
  if (isAuthenticated && admin) {
    return (
      <Switch>
        <Route path="/calendar" exact>
          <Calendar />
        </Route>
        <Route path="/notes" exact>
          <AllNotes />
        </Route>
        <Route path="/admin" exact>
          <AdminPage />
        </Route>
        <Route path="/admin/:id" >
          <AdminUserPage />
        </Route>
        <Redirect to="/calendar" exact/>
      </Switch>
    );
  }
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/calendar" exact>
          <Calendar />
        </Route>
        <Route path="/notes" exact>
          <AllNotes />
        </Route>
        <Redirect to="/calendar" exact/>
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact >
        <AuthPage />
      </Route>

      <Redirect to="/" exact/>
    </Switch>
  );
};
