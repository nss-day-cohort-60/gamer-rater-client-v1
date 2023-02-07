import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { getGame } from "../managers/GameManagers"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

export const GameDetails = (props) => {
    const { gameId } = useParams()

    const localUser = localStorage.getItem("auth_token")
    const userId = JSON.parse(localUser)
    const [ game, setGame ] = useState({})
    const navigate = useNavigate()


    useEffect(() => {
        const id = parseInt(gameId)
        getGame(id).then(data => setGame(data))
    }, [gameId])



    return (<>
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
        </article>



        </>
    )
}
