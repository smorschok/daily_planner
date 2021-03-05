import React from "react";
import { Navigation } from "./components/Navigation";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hook/auth.hook";
import { Loader } from "./components/Loader";
import { AuthContext } from "./context/AuthContext";
import { ToastContext } from "./context/ToastContext";
import { useToast } from "./hook/toast.hook";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const { token, login, logout, userId, ready,admin,email } = useAuth();
  const isAuthenticated: boolean = !!token;
  const routes = useRoutes(isAuthenticated,admin);
  const {error,success}=useToast()

  if (!ready) {
    return <Loader />;
  }
  return (
    <div className="App">
      <AuthContext.Provider
        value={{ token, login, logout, userId, isAuthenticated,admin,email }}
      >
        <ToastContext.Provider value = {{error,success}}>
        <Router>
          <Navigation />
          <div>{routes}</div>
        </Router>
        <ToastContainer hideProgressBar={true} autoClose={3000} />

        </ToastContext.Provider>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
