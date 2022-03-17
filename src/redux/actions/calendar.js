import { fetchAPI } from '../../helpers/fetchAPI';
import { feebackAlert, feebackToast } from '../../helpers/messages';
import { parseDate } from '../../helpers/parseDate';
import { TYPES } from '../types';

export const eventActive = (evt) => ({
    type: TYPES.calendarEventActive,
    payload: evt
});

const eventAdd = (evt) => ({
    type: TYPES.calendarEventAdd,
    payload: evt
});

const eventLoad = (evts) => ({
    type: TYPES.calendarEventLoad,
    payload: evts
});

export const startEventAdd = (evt) => {
    return async (dispatch, getState) => {
        try {
            const { auth } = getState();
            const token = localStorage.getItem('token') ?? '';
            const res = await fetchAPI('event/new', 'POST', token, evt);
            const { ok, ...data } = await res.json();

            if (ok) { 
                dispatch(eventAdd({
                    id: data.id,
                    user: {
                        _id: auth.uid,
                        name: auth.name
                    },
                    ...evt
                }));
                feebackToast('Evento guardado');
            } else {
                let html = '';
                Object.values(data.msg)
                .forEach(msg => html += `<li>${ msg }</li>`);
                feebackAlert('Ha ocurrido un error', `<ul style="list-style-type:none">${ html }</ul>`, 'error');
            }
        } catch(err) {
            console.log('startEventAdd:', err);
        }
    }
}

export const startEventLoad = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token') ?? '';
            const res = await fetchAPI('event/list', 'GET', token);
            const { ok, events } = await res.json();
            const evts = parseDate(events);

            if (ok) {
                dispatch(eventLoad(evts));
            }
    
        } catch(err) {
            console.log('startLoadEventAdd=>', err);
        }
    }
}

export const eventActiveClear = () => ({
    type: TYPES.calendarActiveClear
});

const eventUpdate = (evt) => ({
    type: TYPES.calendarEventUpdate,
    payload: evt
});

export const startEventUpdate = (evt) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token') ?? '';
            const res = await fetchAPI(`event/${ evt.id }`, 'PUT', token, evt);
            const { ok, ...data } = await res.json();

            if (ok) {
                dispatch(eventUpdate(evt));
                feebackToast('Evento actualizado');
            } else {
                if (typeof data.msg === 'object') {
                    let html = '';
                    Object.values(data.msg)
                    .forEach(msg => html += `<li>${ msg }</li>`);
                    feebackAlert('Ha ocurrido un error', `<ul style="list-style-type:none">${ html }</ul>`, 'error');
                } else {
                    feebackToast(data.msg, 'error');
                }
            }
    
        } catch(err) {
            console.log('startEventUpdate=>', err);
        }
    }
}

const eventDelete = () => ({ 
    type: TYPES.calendarEventDelete 
});

export const startEventDelete = () => { 
    return async (dispatch, getState) => {
        try {
            const { active } = getState().calendar;
            const token = localStorage.getItem('token') ?? '';
            const res = await fetchAPI(`event/${ active.id }`, 'DELETE', token);
            const { ok, ...data } = await res.json();

            if (ok) {
                dispatch(eventDelete());
            }
            feebackToast(data.msg, ok ? 'success': 'error');

        } catch(err) {
            console.log('startEventDelete=>', err);
        }
    }


}

export const eventReset = () => ({ type: TYPES.calendarResetEvents });