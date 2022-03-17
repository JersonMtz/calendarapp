import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../redux/actions/auth';
import { eventReset } from '../redux/actions/calendar';

export const Navbar = () => {

    const { name } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token-init');
        dispatch(startLogout());
        dispatch(eventReset());
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid d-flex justify-content-between">
                <NavLink
                    className="navbar-brand" 
                    to="/">{ name }
                </NavLink>
                <button
                    onClick={ handleLogout }
                    className="btn btn-outline-danger">
                    <i className="fas fa-sign-out-alt"></i>
                    &nbsp;salir
                </button>
            </div>
        </nav>
    );
}