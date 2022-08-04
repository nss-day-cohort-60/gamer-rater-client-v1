import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames, getGameTypes, createGame } from "../managers/GameManagers"
import { getCategories, createGameCategories } from "../managers/CatManagers"


export const GameForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [gameCats, setGameCats] = useState([])
    const [currentGame, setCurrentGame] = useState({
        numberOfPlayers: 0,
        title: "",
        designer: "",
        description: "",
        releaseDate: "",
        time: 0,
        ageRating: 0
})
    useEffect(() => {
            getCategories().then(data => setCategories(data))
}, [])

//need to figure out the categories 
    const changeGameState = (event) => {
        const copy = {...currentGame}
        copy[event.target.name] = event.target.value
        setCurrentGame(copy)
    }

    const catArr = (catId) => {
        let catArray = [...gameCats] 
        catArray.push(catId)
        setGameCats(catArray)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Designer</label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Description </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
                <label htmlFor="players">Number of Players:</label>
                        <input type="number" id="players" name="numberOfPlayers" min="1" max="100" 
                            value={parseInt(currentGame.numberOfPlayers)} onChange={changeGameState}>

                            </input>
                            <div className="form-group">
                    <label for="date">Date Released:</label>
                    <input type="date" id="date" name="releaseDate" value={currentGame.releaseDate} onChange={changeGameState}></input>
                </div>
                <label htmlFor="time">Hours of Gameplay:</label>
                        <input type="number" id="time" name="time" min="1" max="100" 
                            value={parseInt(currentGame.time)} onChange={changeGameState}>
                        </input>
                        <label htmlFor="age">Age Rating:</label>
                        <input type="number" id="time" name="ageRating" min="1" max="100" 
                            value={parseInt(currentGame.ageRating)} onChange={changeGameState}>
                        </input>
                        
                        <div className="field">
                    <label htmlFor="content" className="label">Categories: </label>
                    {
                        categories.map(cat => {
                            return <><input type="checkbox" name={cat.label} 
                            onClick={() => {
                                catArr(cat.id)
                            }}/>
                                <label htmlFor={cat.label}>{cat?.label}</label><br /></>
                        })

                    }</div>

            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        designer: currentGame.designer,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        age_rating: parseInt(currentGame.ageRating),
                        time: parseInt(currentGame.time),
                        description: currentGame.description,
                        release_date: currentGame.releaseDate,
                        average_rating: 0
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}