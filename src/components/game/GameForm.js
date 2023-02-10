import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames, getGame, updateGame, getGameTypes, createGame } from "../managers/GameManagers"
import { getCategories, createGameCategories } from "../managers/CatManagers"
import './Games.css'

export const GameForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [gameCats, setGameCats] = useState(new Set())
    const [currentGame, setCurrentGame] = useState({
        min_players: 0,
        max_players: 0,
        title: "",
        designer: "",
        description: "",
        year_released: "",
        estimated_time: 0,
        recommended_age: 0,
        categories: []
    })
    const { gameId } = useParams()

    const catArr = (catId) => {
        let copy = new Set(gameCats)
        copy.has(catId) ? copy.delete(catId) : copy.add(catId)
        setGameCats(copy)
    }

    useEffect(() => {
        getGame(gameId).then((data) => {
            setCurrentGame(data)

            const categorySet = new Set()
            for (const category of data.categories) {
                categorySet.add(category.id)
            }
            setGameCats(categorySet)
        })
    }, [gameId])



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
                    value={parseInt(currentGame.min_players)} onChange={changeGameState}>
                </input>
                <label htmlFor="players">Maximum Number of Players:</label>
                <input type="number" id="players" name="maximum_players" min="1" max="1000000"
                    value={parseInt(currentGame.max_players)} onChange={changeGameState}>

                </input>
                <div className="form-group">
                    <label htmlFor="date">Date Released:</label>
                    <input type="number" id="releaseDate" name="releaseDate"
                        min="1000" max="9999"
                        value={currentGame.year_released}
                        onChange={changeGameState}></input>
                </div>
                <label htmlFor="time">Hours of Gameplay:</label>
                <input type="number" id="time" name="time" min="1" max="100"
                    value={parseInt(currentGame.estimated_time)} onChange={changeGameState}>
                </input>
                <label htmlFor="age">Age Rating:</label>
                <input type="number" id="time" name="ageRating" min="1" max="100"
                    value={parseInt(currentGame.recommended_age)} onChange={changeGameState}>
                </input>

                <div className="field">
                    <label htmlFor="content" className="label">Categories: </label>
                    {
                        categories.map(cat => {
                            // Compare current `id` and see if on object exists with that id in currentGame.categories
                            const foundCategory = currentGame.categories.find(gameCategory => cat.id === gameCategory.id)

                            return <div key={`category--${cat.id}`}>
                                <input type="checkbox" name={cat.label}
                                    defaultChecked={foundCategory}
                                    onClick={() => catArr(cat.id) } />
                                <label htmlFor={cat.label}>{cat?.label}</label><br />
                            </div>
                        })

                    }</div>

            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        id: currentGame.id,
                        designer: currentGame.designer,
                        title: currentGame.title,
                        min_players: parseInt(currentGame.min_players),
                        max_players: parseInt(currentGame.max_players),
                        recommended_age: parseInt(currentGame.recommended_age),
                        estimated_time: parseInt(currentGame.estimated_time),
                        description: currentGame.description,
                        year_released: currentGame.year_released,
                        categories: Array.from(gameCats)
                    }

                    // Send POST request to your API

                    // If there is a gameId route parameter, invoke updateGame, otherwise createGame
                    if (gameId) {
                        updateGame(game.id, game)//.then(() => navigate("/games"))
                    }
                    else {
                        createGame(game)//.then(() => navigate("/games"))
                    }
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
