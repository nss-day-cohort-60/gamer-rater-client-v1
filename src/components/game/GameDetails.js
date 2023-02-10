import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getGame } from "../managers/GameManagers"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

export const GameDetails = (props) => {
    const { gameId } = useParams()

    const localUser = localStorage.getItem("auth_token")
    const userId = JSON.parse(localUser)
    const [game, setGame] = useState({
        game_reviews: [],
        id: 0,
        designer: "",
        year_released: 0,
        estimated_time: 0,
        recommended_age: 0,
        title: "",
        description: "",
        min_players: 0,
        max_players: 0,
        categories: []
    })
    const navigate = useNavigate()

    useEffect(() => {
        const id = parseInt(gameId)
        getGame(id).then(data => setGame(data))
    }, [gameId])


    return <>
        <article className="games">
            <section key={`game--${game.id}`} className="game">
                <h2 className="game__title">{game.title} by {game.designer}</h2>
                <div className="game__players">{game.min_players}-{game.max_players} players needed</div>
                <div className="game__skillLevel">Released:{game?.year_released}</div>
                <div className="game__time">Hours of Play: {game?.estimated_time}</div>
                <div className="game_age">Recommended Age: {game?.recommended_age}</div>
                <div className="game__categories">Categories:{
                    game?.categories?.map(c => c?.label).join(", ")
                }</div>
            </section>
            <button><Link to={`/games/${gameId}/review`}>Review Game</Link></button>
            <button><Link to={`/games/edit/${gameId}`}>Edit</Link></button>
        </article>

        <h2>Reviews by Players</h2>

        {
            game.game_reviews.map(review => {
                return <section className="review" key={`review--${review.id}`}>
                    <div className="review__text">
                        {review.review}
                    </div>

                    <footer className="review__footer">
                        <span className="review__author">Written by {review.player.full_name}</span>
                        <span className="review__timestamp">
                             { " " }on {new Date(review.date_reviewed).toLocaleString('en-US', { timeZone: 'CST' })}
                        </span>
                    </footer>
                </section>
            })
        }
    </>
}
