import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "@chakra-ui/react";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import PrivateRoute from "./util/PrivateRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Container maxW="container.lg">
          <Route exact path="/" component={Home} />
          <PrivateRoute exact path="/create-post" component={CreatePost} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <Route exact path="/404" component={NotFoundPage} />
          <Footer />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
