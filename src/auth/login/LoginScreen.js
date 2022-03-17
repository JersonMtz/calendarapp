import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogin } from '../../redux/actions/auth';

import '../auth.css';

const initialValues = {
    email: localStorage.getItem('email') ?? '', 
    password: '', 
    rememberMe: localStorage.getItem('email') ? true : false 
}

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const handleSubmit = (form) => {
        const { email, password, rememberMe } = form;
        
        if (rememberMe) {
            localStorage.setItem('email', email);
        } else {
            localStorage.removeItem('email');
        }

        dispatch(startLogin(email, password));
    }

    return (
        <Formik
            initialValues={ initialValues }
            onSubmit={ handleSubmit }>
            {
                () => (
                    <div className="wrapper">
                        <Form className="form-signin">    
            
                            <h2 
                                className="form-signin-heading">
                                ¡Te damos la bienvenida!
                            </h2>

                            <p className="mb-1">Correo electrónico</p>
                            <article className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fas fa-at"></i>
                                </span>
                                <Field 
                                    type="email" 
                                    className="form-control" 
                                    name="email" 
                                    placeholder="Email Address" 
                                    autoFocus 
                                    required 
                                />
                            </article>

                            <p className="mb-1">Contraseña</p>
                            <article className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <Field 
                                    type="password" 
                                    className="form-control" 
                                    name="password" 
                                    placeholder="Pasword" 
                                    required 
                                />
                            </article>
                            
                                <label 
                                    className="checkbox">
                                    <Field 
                                        type="checkbox"
                                        name="rememberMe" 
                                    /> 
                                    &nbsp;Remember me
                                </label>

                            <div 
                                className="d-grid gap-2">
                                <button 
                                    className="btn btn-sm" 
                                    type="submit">
                                    Login
                                </button>   
                            </div>
                            <br />
                            <NavLink to="/register" className="d-flex justify-content-center">
                                Crear nueva cuenta
                            </NavLink>
            
                        </Form>
                    </div>
                )
            }
        </Formik>
    );
};