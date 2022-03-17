import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { feebackToast } from '../../helpers/messages';
import { startRegister } from '../../redux/actions/auth';
import '../auth.css';

const initialValues = { 
    name: '', 
    email: '', 
    password1: '', 
    password2: '' 
};

export const RegisterScreen = () => {
    
    const dispatch = useDispatch();

    const handleSubmit = (form) => {

        const { name, email, password1, password2 } = form;
        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{7,10}[^'\s]/.test(password1))) {
            feebackToast('Contraseña debe cumplir ciertas carácteristicas', 'error');
            return;
        }

        if (password1 !== password2) {
            feebackToast('Contraseñas deben coincidir', 'error');
            return;
        }

        dispatch(startRegister(name, email, password1));

    }

    return (
        <Formik
            initialValues={ initialValues }
            onSubmit={ handleSubmit }>
            {
                () => (
                    <div className="wrapper">
                        <Form className="form-signin" style={ { maxWidth: '550px' } }>    
            
                            <h2 
                                className="form-signin-heading">
                                Información
                            </h2>

                            <p className="mb-1">Nombre Completo</p>
                            <article className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fas fa-user"></i>
                                </span>
                                <Field 
                                    type="text" 
                                    className="form-control" 
                                    name="name" 
                                    placeholder="Jony Eht." 
                                    autoFocus 
                                    required 
                                />
                            </article>

                            <p className="mb-1">Correo electrónico</p>
                            <article className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fas fa-at"></i>
                                </span>
                                <Field 
                                    type="email" 
                                    className="form-control" 
                                    name="email" 
                                    placeholder="email@domain.com" 
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
                                    name="password1" 
                                    placeholder="********" 
                                    required 
                                />
                            </article>

                            <p className="mb-1">Repetir Contraseña</p>
                            <article className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fas fa-lock"></i>
                                </span>
                                <Field 
                                    type="password" 
                                    className="form-control" 
                                    name="password2" 
                                    placeholder="********" 
                                    required 
                                />
                            </article>
            
                            <div 
                                className="d-grid gap-2 mt-5">
                                <button 
                                    className="btn btn-sm btn-submit" 
                                    type="submit">
                                    Register
                                </button>   
                            </div>
            
                        </Form>
                    </div>
                )
            }
        </Formik>
    );
};
