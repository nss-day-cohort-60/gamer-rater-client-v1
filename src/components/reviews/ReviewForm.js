import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { createReview } from "../managers/ReviewManagers"




export const ReviewForm = () => {
const navigate = useNavigate()
const localUser = localStorage.getItem("auth_token")
const userObj = JSON.parse(localUser)
const { gameId } = useParams()
const [newReview, setNewReview] = useState({
    review: "",
    game: parseInt(gameId)
})

const handleControlledInputChange = (event) => {
    /*
        When changing a state object or array, always create a new one
        and change state instead of modifying current one
    */ const newRev = {...newReview}

    newRev[event.target.name] = event.target.value
    setNewReview(newRev)
}

const saveReview = () => {
    createReview(newReview)
}

// const constructNewPost = () => {
//     const copyPost = { ...post }
//     copyPost.category_id = parseInt(copyPost.category_id)
//     copyPost.publication_date = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
//     onFormSubmit(copyPost)

// }



return  <div className="field">
    <label htmlFor="content" className="review">Review: </label>
    <div className="control">
        <div className="control">
            <textarea
                className="textarea"
                name="review"
                value={newReview.review}
                onChange={handleControlledInputChange}
            ></textarea>
        </div></div> 
        <button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        saveReview()
            navigate(`/games/${gameId}`)
    
    }}
>Leave Review</button></div>
    
    }