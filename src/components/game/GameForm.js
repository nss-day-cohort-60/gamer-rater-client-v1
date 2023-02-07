import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames, getGameTypes, createGame } from "../managers/GameManagers"
import { getCategories, createGameCategories } from "../managers/CatManagers"
import './Games.css'

export const GameForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [gameCats, setGameCats] = useState(new Set())
    const [currentGame, setCurrentGame] = useState({
        minimum_players: 0,
        maximum_players: 0,
        title: "",
        designer: "",
        description: "",
        releaseDate: "",
        time: 0,
        ageRating: 0
    })

    const catArr = (catId) => {
        let copy = new Set(gameCats)
        copy.has(catId) ? copy.delete(catId) : copy.add(catId)
        setGameCats(copy)
    }


    useEffect(() => {
        getCategories().then(data => setCategories(data))
    }, [])

    //need to figure out the categories
    const changeGameState = (event) => {
        const copy = { ...currentGame }
        copy[event.target.name] = event.target.value
        setCurrentGame(copy)
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
                <label htmlFor="players">Minimum Number of Players:</label>
                <input type="number" id="players" name="minimum_players" min="1" max="100"
                    value={parseInt(currentGame.minimum_players)} onChange={changeGameState}>

                </input>
                <label htmlFor="players">Maximum Number of Players:</label>
                <input type="number" id="players" name="maximum_players" min="1" max="1000000"
                    value={parseInt(currentGame.maximum_players)} onChange={changeGameState}>

                </input>
                <div className="form-group">
                    <label for="date">Date Released:</label>
                    <input type="number" id="releaseDate" name="releaseDate"
                        min="1000" max="9999"
                        value={currentGame.releaseDate}
                        onChange={changeGameState}></input>
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
                                }} />
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
                        minimum_players: parseInt(currentGame.minimum_players),
                        maximum_players: parseInt(currentGame.maximum_players),
                        age_rating: parseInt(currentGame.ageRating),
                        time: parseInt(currentGame.time),
                        description: currentGame.description,
                        release_date: currentGame.releaseDate,
                        categories: Array.from(gameCats)
                    }

                    // Send POST request to your API
                    createGame(game)
                        // .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}