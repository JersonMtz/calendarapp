const API = process.env.REACT_APP_API_URL;

// export const fetchWithoutToken = (endPoint, data, method = 'GET') => {

//     const url = `${ API }/${ endPoint}`;

//     if (method === 'GET') {
//         return fetch(url);
//     } else {
//         return fetch(url, {
//             method,
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         });
//     }
// }

export const fetchAPI = (endPoint, method, token = null, data = null) => {

    const url = `${ API }/${ endPoint}`;

    if (token && data) {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }

    if (token && !data) {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            }
        });
    }

    if (!token && data) {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}