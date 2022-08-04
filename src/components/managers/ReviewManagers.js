export const createReview = (review) => {
    return fetch("http://localhost:8000/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(review)
    })
        .then()
}
