import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Container, Progress } from '@chakra-ui/react';

import { AuthProvider } from './context/auth';
import PrivateRoute from './utils/PrivateRoute';
import AuthRoute from './utils/AuthRoute';
import AdminPrivateRoute from './utils/AdminPrivateRoute';

import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

const PostLists = lazy(() => import('./pages/PostLists'));
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
const UserPosts = lazy(() => import('./pages/UserPosts'));
const UpdateProfile = lazy(() => import('./pages/UpdateProfile'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const SinglePost = lazy(() => import('./pages/SinglePost'));
const EditPost = lazy(() => import('./pages/EditPost'));
const NotFoundPage = lazy(() => import('./pages/404'));
const AdminLogin = lazy(() => import('./pages/Admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Container maxW="container.lg">
          <ErrorBoundary>
            <Suspense fallback={<Progress size="xs" isIndeterminate />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/admin"
                  element={
                    <AuthRoute>
                      <AdminLogin />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <AdminPrivateRoute>
                      <AdminDashboard />
                    </AdminPrivateRoute>
                  }
                />
                <Route
                  path="/create-post"
                  element={
                    <PrivateRoute>
                      <CreatePost />
                    </PrivateRoute>
                  }
                />
                <Route path="/posts" element={<PostLists />} />
                <Route path="/posts/:slug" element={<SinglePost />} />
                <Route
                  path="/edit/:postId"
                  element={
                    <PrivateRoute>
                      <EditPost />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile/update"
                  element={
                    <PrivateRoute>
                      <UpdateProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/view-posts"
                  element={
                    <PrivateRoute>
                      <UserPosts />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          <Footer />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
