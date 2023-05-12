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

    catch(error) {
        console.error(error)
    }
};

// получение данных о пользователе
const getUserData = async (id) => {
    try {
        const response = await fetch(`https://reqres.in/api/users/${id}`);
        return response.json()
    } catch(error) {
        console.error(error)
    }
}

export { authUser, getUserData }

