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
