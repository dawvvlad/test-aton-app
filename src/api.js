// POST-запрос к API, авторизация
const authUser = async (email, password) => {
    try {
        const response = await fetch(`https://reqres.in/api/register`, {
            method: `POST`,
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const data = await response.json()
        return data
    }

    catch (error) {
        console.error(error)
    }
};

// получение данных о пользователе
const getUserData = async (id) => {
    try {
        const response = await fetch(`https://reqres.in/api/users/${id}`);
        return response.json()
    } catch (error) {
        console.error(error)
    }
}

// получение всех доступных пользователей
const getAllUsers = async (offset) => {
    try {
        const response = await fetch(`https://reqres.in/api/users?page=${offset}`);
        return response.json()
    } catch (error) {
        console.error(error)
    }
}

// получение всех доступных ресурсов
const getResources = async (offset) => {
    try {
        const response = await fetch(`https://reqres.in/api/unknown?page=${offset}`);
        return response.json()
    } catch (error) {
        console.error(error)
    }
}

// запрос к API на изменение объекта
const editResource = async (id, name, year, color) => {
    try {
        const response = await fetch(`https://reqres.in/api/unknown/${id}`, {
            method: `PATCH`,
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                name,
                year,
                color
            })
        });
        return response.json()
    } catch (error) {
        console.error(error)
    }
}

// запрос на добавление нового объекта
const pushResource = async (id, name, year, color) => {
    try {
        const response = await fetch(`https://reqres.in/api/unknown`, {
            method: `POST`,
            headers: {
                "Content-type": "Application/json"
            },
            body: JSON.stringify({
                name,
                year,
                color
            })
        });
        return response.json()
    } catch (error) {
        console.error(error)
    }
}

const deleteResource = async (id) => {
    try {
        const response = await fetch(`https://reqres.in/api/unknown/${id}`, {
            method: `DELETE`,
            headers: {
                "Content-type": "Application/json"
            },
        });
        return await response.json();

    } catch (error) {
        console.error(error)
    }
}

export { authUser, getUserData, getAllUsers, getResources, editResource, pushResource, deleteResource }