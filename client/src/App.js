import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Container } from "@chakra-ui/react";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./util/AuthRoute";
import PrivateRoute from "./util/PrivateRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import SinglePost from "./pages/SinglePost";
import EditPost from "./pages/EditPost";
import NotFoundPage from "./pages/404";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Container maxW="container.lg">
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/create-post" component={CreatePost} />
            <Route exact path="/posts/:postId" component={SinglePost} />
            <AuthRoute exact path="/edit/:postId" component={EditPost} />
            <Route component={NotFoundPage} />
          </Switch>
          <Footer />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
