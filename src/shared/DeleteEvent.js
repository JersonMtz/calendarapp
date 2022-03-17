import { useDispatch, useSelector } from 'react-redux';
import { questionDelete } from '../helpers/messages';
import { startEventDelete } from '../redux/actions/calendar';

export const DeleteEvent = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.calendar);

    const handleDelete = async () => {
        const { isConfirmed } = await questionDelete(`¿Desea eliminar el evento "${ active.title }"?`, 'Eliminar', 'warning');
        if (isConfirmed) {
            dispatch(startEventDelete());
        }
    }

    return (
        <button
            onClick={ handleDelete }
            className="delete btn btn-danger">
            <i className="fas fa-trash"></i>
        </button>
    );

};
