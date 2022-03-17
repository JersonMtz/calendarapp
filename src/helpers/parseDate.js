export const parseDate = (events = []) => {
    return events.map(evt=> ({
        ...evt,
        start: new Date(evt.start),
        end: new Date(evt.end)
    }));
}