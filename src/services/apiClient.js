const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAuthHeader = () => {
    const token = localStorage.getItem('jwt');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiRequest = async (url, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...options.headers
    };

    const config = {
        ...options,
        headers
    };

    return fetch(`${apiBaseUrl}${url}`, config);
};
