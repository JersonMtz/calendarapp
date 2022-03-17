import { useEffect } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { uiCloseModal } from '../redux/actions/ui';
import { eventActiveClear, startEventAdd, startEventUpdate } from '../redux/actions/calendar';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top:         '50%',
        left:        '50%',
        right:       'auto',
        bottom:      'auto',
        marginRight: '-50%',
        transform:   'translate(-50%, -50%)'
    }
}

const initForm = {
    title: '',
    notes: '',
    start: new Date(),
    end: new Date((new Date()).setHours(new Date().getHours() + 1))
}

export const CalendarModal = () => {
    
    const { openModal } = useSelector(state => state.ui);
    const { active } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const [form, handleChange, reset] = useForm(initForm);

    const closeModal = () => {
        reset();
        dispatch(uiCloseModal());
        dispatch(eventActiveClear());
    }

    useEffect(() => {

        if (active && !openModal) {
            reset(active);
        }

    }, [active, openModal, reset]);


    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (!active) {
            dispatch(startEventAdd(form));            
        } else {
            dispatch(startEventUpdate({
                id: active.id,
                ...form
            }));
        }

        reset();
        dispatch(uiCloseModal());
    }

    return (
        <Modal
            onRequestClose={ closeModal }
            isOpen={ openModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-back"
            closeTimeoutMS={ 200 }>
            
            <h1>{ (!!active) ? 'Actualizar evento' : 'Nuevo evento' }</h1>
            <hr />
            <form
                onSubmit={ handleSubmit }
                className="container">
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ (value) => reset({ ...form, start: value }) }
                        value={ form.start }
                        className="form-control"
                    />
                </div>
                <br/>
                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ (value) => reset({ ...form, end: value }) }
                        minDate={ form.start }
                        value={ form.end }
                        className="form-control"
                    />
                </div>
                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ form.title }
                        onChange={ handleChange }
                        required
                    />
                </div>
                <br/>
                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ form.notes }
                        onChange={ handleChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>
                <br/>
                <div 
                    className="d-grid gap-2 mb-0">
                    <button
                        type="submit"
                        className="btn btn-outline-primary btn-block">
                        <i className="far fa-save"></i>
                        &nbsp;Guardar
                    </button> 
                </div>

            </form>
        </Modal>
    );
}