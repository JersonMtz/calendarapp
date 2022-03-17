
export const CalendarEvent = ({ event }) => {
    
    const { title, user } = event;

    return (
        <>
            <h6>{ title }</h6>
            <cite>- { user.name }</cite>
        </>
    );
};
