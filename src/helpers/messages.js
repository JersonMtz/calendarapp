import Swal from 'sweetalert2';

export const spanish = {
    allDay: 'Todo el día',
    previous: '<',
    next: '>',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: total => `+ Ver más (${total})`
};

export const feebackToast = (title, icon = 'success') => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 3000,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    Toast.fire({
        title,
        icon
    });
}

export const questionDelete = (title, confirmButtonText, icon = 'success') => {
    return Swal.fire({
        title,
        icon,
        confirmButtonText,
        showCancelButton: true,
        confirmButtonColor: '#008F7D',
        cancelButtonColor: '#3F3D56'
    });
}

export const feebackAlert = (title, html, icon = 'success') => {
    Swal.fire({ title, html, icon });
}