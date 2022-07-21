import { useState } from "react";
import axios from "axios";

function CreateUser() {

    const [username, setUsername] = useState("")
    const [responseData, setResponseData] = useState("")

    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        const user = {
            username: username
        }
        console.log(user)
        axios.post("http://localhost:5000/user", user)
            .then(res => {
                console.log(res.data)
                setResponseData(res.data)
            })

        setUsername("")
    }

    return (
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}>
                    </input>
                </div>
                <br />
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
            <br />
            <div>{responseData}</div>
        </div>
    );
}

export default CreateUser