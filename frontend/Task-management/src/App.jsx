import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Tasks/TaskList';
import TaskForm from './components/Tasks/TaskForm';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Navbar from './components/Navbar';

const App = () => {
  return (
    <AuthProvider>
     <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/tasks/new"
          element={
            <ProtectedRoute>
              <TaskForm />
            </ProtectedRoute>
          }
        />
     <Route path="/tasks/edit/:id" element={<TaskForm />} />

      </Routes>
    </AuthProvider>
  );
};

export default App;
