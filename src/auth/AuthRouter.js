import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginScreen } from './login/LoginScreen';
import { RegisterScreen } from './register/RegisterScreen';

export const AuthRouter = () => {
    
    return (
        <Routes>
            <Route path="login" element={ <LoginScreen /> } />
            <Route path="register" element={ <RegisterScreen /> } />
            <Route path="/" element={ <Navigate to="login" /> } />
        </Routes>
    );
}