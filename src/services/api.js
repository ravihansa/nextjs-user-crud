const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const getAllUsers = async () => {
    return fetch(`${BASE_URL}api/v1/users/list`);
};

export const updateUser = async (user) => {
    return fetch(`${BASE_URL}api/v1/users/${user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });
};

export const deleteUser = async (userId) => {
    return fetch(`${BASE_URL}api/v1/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

export const logInUser = async (userData) => {
    return fetch(`${BASE_URL}api/v1/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
};
