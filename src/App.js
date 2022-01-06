import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Container, Progress } from "@chakra-ui/react";

import { AuthProvider } from "./context/auth";
import PrivateRoute from "./util/PrivateRoute";
import AuthRoute from "./util/AuthRoute";
import AdminPrivateRoute from "./util/AdminPrivateRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
const Profile = lazy(() => import("./pages/Profile"));
const Posts = lazy(() => import("./pages/Posts"));
const UpdateProfile = lazy(() => import("./pages/UpdateProfile"));
const CreatePost = lazy(() => import("./pages/CreatePost"));
const SinglePost = lazy(() => import("./pages/SinglePost"));
const EditPost = lazy(() => import("./pages/EditPost"));
const NotFoundPage = lazy(() => import("./pages/404"));
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));

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
                <AuthRoute exact path="/admin" component={AdminLogin} />
                <AdminPrivateRoute
                  exact
                  path="/dashboard"
                  component={AdminDashboard}
                />
                <PrivateRoute
                  exact
                  path="/create-post"
                  component={CreatePost}
                />
                <Route exact path="/posts/:slug" component={SinglePost} />
                <PrivateRoute exact path="/edit/:postId" component={EditPost} />
                <PrivateRoute
                  exact
                  path="/profile/update"
                  component={UpdateProfile}
                />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/posts" component={Posts} />
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
