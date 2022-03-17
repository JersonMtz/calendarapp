import { fetchAPI } from '../../helpers/fetchAPI';
import { feebackToast } from '../../helpers/messages';
import { TYPES } from '../types';
import { uiShowLoading, uiHideLoading } from './ui';

export const startLogin = (email, password) => {
    return async (dispatch) => {
        dispatch(uiShowLoading());
        const res = await fetchAPI('user/login', 'POST', null, { email, password });
        const { ok, ...data } = await res.json();

        if (ok) {

            localStorage.setItem('token', data.token);
            // localStorage.setItem('token-init', Date.now());

            dispatch({
                type: TYPES.authStartLogin,
                payload: {
                    uid: data.id,
                    name: data.name
                }
            });
        } else {
            for (const msg of Object.values(data)) {
                feebackToast(msg, 'error');
            }
        }
        dispatch(uiHideLoading());
    }
}

export const startRegister = (name, email, password) => {
    return async (dispatch) => {
        const res = await fetchAPI('user/register', 'POST', null, { name, email, password });
        const { ok, ...data } = await res.json();

        if (ok) {

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init', Date.now());

            dispatch({
                type: TYPES.authStartLogin,
                payload: {
                    uid: data.user.id,
                    name: data.user.name
                }
            });
        } else {
            for (const msg of Object.values(data.msg)) {
                feebackToast(msg, 'error');
            }
        }

    }
}

export const startRenewToken = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token') ?? '';
            const res = await fetchAPI('user/renew', 'GET', token);
            const { ok, ...data } = await res.json();

            if (ok) {
                localStorage.setItem('token', data.token);
                // localStorage.setItem('token-init', Date.now());

                dispatch({
                    type: TYPES.authStartLogin,
                    payload: {
                        uid: data.user.id,
                        name: data.user.name
                    }
                });
            }

            dispatch(uiHideLoading());
        } catch(err) { 
            dispatch(uiHideLoading());
        }
    }
}

export const startLogout = () => ({
    type: TYPES.authStartLogout
});