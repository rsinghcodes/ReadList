import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Container, Progress } from "@chakra-ui/react";

import { AuthProvider } from "./context/auth";
import PrivateRoute from "./util/PrivateRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
const CreatePost = lazy(() => import("./pages/CreatePost"));
const SinglePost = lazy(() => import("./pages/SinglePost"));
const EditPost = lazy(() => import("./pages/EditPost"));
const NotFoundPage = lazy(() => import("./pages/404"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Container maxW="container.lg">
          <ErrorBoundary>
            <Suspense fallback={<Progress size="xs" isIndeterminate />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute
                  exact
                  path="/create-post"
                  component={CreatePost}
                />
                <Route exact path="/posts/:slug" component={SinglePost} />
                <PrivateRoute exact path="/edit/:postId" component={EditPost} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <Route component={NotFoundPage} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
          <Footer />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
