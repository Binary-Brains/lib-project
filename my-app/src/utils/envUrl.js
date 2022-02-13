
let envUrl = "http://localhost:8080";
if (process.env.NODE_ENV === "production") {
    envUrl = "http://l-backend.herokuapp.com"
}
export default envUrl

