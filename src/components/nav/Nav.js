import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar__item">
                Navigation link
            </li>
            <li className="navbar__item">
                <Link className='nav-link' to="/games">Games</Link>
            </li>
            <li className="navbar__item">
                <Link className='nav-link' to="/events">Events</Link>
            </li>
            {
                (localStorage.getItem("gamerrater_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("gamerrater_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
