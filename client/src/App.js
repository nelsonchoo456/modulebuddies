import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/layout/NavigationBar"
import Forum from "./components/layout/Forum"
import Hero from "./components/layout/Hero"
import Features from "./components/layout/Features"
import Testimonials from "./components/layout/Testimonials"
import Footer from "./components/layout/Footer"

import Alert from "./components/layout/Alert";
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import { LOGOUT } from "./actions/types";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";



const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (

    <Provider store={store}>
      <Router>
        <div className="App">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<><Hero /><Features /><Testimonials /></>} />
            
          </Routes>
          
          <section className="container">
            <Alert />
            <Routes>
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Forum" element={<Forum />} />
            </Routes>
          </section>
          
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
