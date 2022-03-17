import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../redux/actions/ui';
import { eventActiveClear } from '../redux/actions/calendar';

export const AddNewEvent = () => {

    const dispatch = useDispatch();

    const handleAddNewEvent = () => {
        dispatch(uiOpenModal());
        dispatch(eventActiveClear());
    }

    return (
        <button 
            onClick={ handleAddNewEvent }
            className="floting btn btn-primary">
            <i className="fas fa-plus"></i>
        </button>
    );
};