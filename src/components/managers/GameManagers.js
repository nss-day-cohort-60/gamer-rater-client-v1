export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gamerrater_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("gamerrater_token")}`
        },
        body: JSON.stringify(game)
    })
}

export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem('gamerrater_token')}`
        }
    })
        .then(response => response.json())
}

export const getGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`,{
        headers:{
            "Authorization": `Token ${localStorage.getItem("gamerrater_token")}`
        }
    })
    .then(res => res.json())
};

export const updateGame = (id, game) => {
    return fetch(`http://localhost:8000/games/${id}`, {
    method: "PUT",
    headers: {
        "Authorization": `Token ${localStorage.getItem("gamerrater_token")}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify(game)
    })
};

export const deleteGame = (gameId) => {
    return fetch(`http://localhost:8000/games/${gameId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("gamerrater_token")}`,
        }
    })
};