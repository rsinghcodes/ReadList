import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import MenuBar from "./components/MenuBar";
import styled from "styled-components";
import Footer from "./components/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Container>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;

const Container = styled.main`
  padding: 1rem;
  max-width: 64rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* border: 1px solid rgba(229, 231, 235, 1); */
`;
