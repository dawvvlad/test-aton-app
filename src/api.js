const authUser = async (email, password) => {
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

export { authUser }