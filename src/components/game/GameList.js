import React, { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import { getGames, deleteGame } from "../managers/GameManagers";
import { Link } from "react-router-dom"
import { FaTrashAlt } from 'react-icons/fa';

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    // const deleteButton = (id) => {
    //     return deleteGame(id)
    //         .then(() => {
    //             getGames()
    //                 .then(data => setGames(data)) 
    //                 })
    //         }

//  < FaTrashAlt onClick={(click) => {
//                                     deleteButton(game.id)
//                                 }
//                                 } />


    return (<>
    <button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        navigate({ pathname: "/games/new" })
    }}
>Register New Game</button>
        <br></br>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <Link to={`/games/${game.id}`} className="game__title">{game.title}</Link>
                    </section>
                })
            }
        </article>
        </>
    )
}



