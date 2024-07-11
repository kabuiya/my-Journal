import React from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './Signup';
import Dashboard from './Dashboard';
import ProductDetail from './Entrydetail';
import Settings from './SettingsPage';
import ProtectedRoute from './ProtectedRoute';





const App = () => {
  return (
       <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/setting" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
   
  );
};
export default App;
