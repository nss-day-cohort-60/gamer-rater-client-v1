import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { getGame } from "../managers/GameManagers"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

export const GameDetails = (props) => {
    const {gameId} = useParams()
    const id = parseInt(gameId)
    const localUser = localStorage.getItem("auth_token")
    const userId = JSON.parse(localUser)
    const [ game, setGame ] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        getGame(id).then(data => setGame(data))
    }, [])



    return (<> 
        <article className="games">
            <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.designer}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Released:{game?.release_date}</div>
                        <div className="game__time">Hours of Play: {game?.time}</div>
                        <div className="game_age">Recommended Age: {game?.age_rating}</div>
                        <div className="game__categories">Categories:{game?.categories?.map(c => <>{c?.label}</>)}</div>
                    </section>
                    <button><Link to={`/games/${gameId}/review`}>Review Game</Link></button>
        </article>
        
        
        
        </>
    )
}
