import { Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { Authorized } from "./Authorized"
import { GameDetails } from "../game/GameDetails"
import { GameForm } from "../game/GameForm"
import { GameList } from "../game/GameList"
import {ReviewForm} from "../reviews/ReviewForm"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/games" element={<GameList />} />

                <Route exact path="/games/new" element={<GameForm />} />
                <Route path="/games/edit/:gameId" element={<GameForm />} />
                <Route path="/games/:gameId" element={<GameDetails />} />





                <Route path="/games/:gameId/review" element={<ReviewForm />} />
            </Route>
        </Routes>
    </>
}