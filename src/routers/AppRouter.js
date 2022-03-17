import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import { uiShowLoading } from '../redux/actions/ui';
import { AuthRouter } from '../auth/AuthRouter';
import { startRenewToken } from '../redux/actions/auth';
import { CalendarScreen } from '../screens/CalendarScreen';
import { Loading } from '../shared/Loading';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';

export const AppRouter = () => {

    const { auth, ui } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(uiShowLoading());
        dispatch(startRenewToken());

    }, [dispatch]);

    return (
        <Router>
            { ui.loading && <Loading /> }

            <Routes>
                <Route path="/" element={
                    <PrivateRouter isLogged={ auth }>
                        <CalendarScreen />
                    </PrivateRouter>
                } />
                
                <Route path="/*" element={ 
                    <PublicRouter isLogged={ auth }>
                        <AuthRouter />
                    </PublicRouter>
                } />

            </Routes>
        </Router>
    );
};