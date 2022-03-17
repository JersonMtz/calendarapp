import { useEffect, useState } from 'react';
import { Calendar, globalizeLocalizer } from 'react-big-calendar';
import globalize from 'globalize';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../shared/Navbar';
import { spanish } from '../helpers/messages';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'globalize/lib/cultures/globalize.culture.es-CR';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';
import { uiOpenModal } from '../redux/actions/ui';
import { AddNewEvent } from '../shared/AddNewEvent';
import { eventActive, eventActiveClear, startEventLoad } from '../redux/actions/calendar';
import { DeleteEvent } from '../shared/DeleteEvent';

globalize.culture('es-CR');

const localizer = globalizeLocalizer(globalize);

export const CalendarScreen = () => {

    const { uid } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { events, active } = useSelector(state => state.calendar);
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') ?? 'month');

    useEffect(() => {
        
        dispatch(startEventLoad());

    }, [dispatch]);

    const eventStyleGetter = (event) => {
        
        return {
            style: {
                backgroundColor: (event.user._id !== uid) ? '#0D6EFD' : '#008F7D',
                color: 'white'
            }
        }
    }
    
    const handleDoubleClick = () => dispatch(uiOpenModal());
    
    const handleSelected = (evt) => dispatch(eventActive(evt));
    
    const handleViewChange = (evt) => {
        setLastView(evt);
        localStorage.setItem('lastView', evt);
    }

    const handleSelectSlot = () => dispatch(eventActiveClear());

    return (
        <>
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                className="calendar-screen"
                messages={ spanish }
                eventPropGetter={ eventStyleGetter }
                components={{ event: CalendarEvent }}
                onDoubleClickEvent={ handleDoubleClick }
                onSelectEvent={ handleSelected }
                onSelectSlot={ handleSelectSlot }
                selectable={ true }
                onView={ handleViewChange }
                view={ lastView }
            />

            <CalendarModal />

            { (active) && <DeleteEvent /> }
            <AddNewEvent />
        </>
    );
}