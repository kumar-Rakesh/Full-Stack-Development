import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function CreateExercise() {

    const [username, setUsername] = useState("test user")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])
    const [responseData, setResponseData] = useState("")

    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onChangeDescription = e => {
        setDescription(e.target.value)
    }

    const onChangeDuration = e => {
        setDuration(e.target.value)
    }

    const onChangeDate = e => {
        setDate(e.target.value)
    }

    useEffect(() => {
        getUsers()
    }, [])

    function getUsers() {
        axios.get("http://localhost:5000/user")
            .then(res => {
                if (res.data.length > 0) {
                    setUsers(res.data.map(u => u.username))
                    setUsername(res.data[0].username)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const setEmpty = () => {
        setUsername("")
        setDescription("")
        setDuration(0)
        setDate(new Date())
    }

    const onSubmit = e => {
        e.preventDefault()
        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }
        axios.post("http://localhost:5000/exercise", exercise)
            .then(res => {
                console.log(res.data)
                setResponseData(res.data)
            })
        setEmpty()
    }

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select //ref="userInput"
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}>
                        {
                            users.map(function (user) {
                                return <option key={user} value={user}>
                                    {user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>
                <br />
                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>
            </form>
            <br />
            <div>{responseData}</div>
        </div>
    )
}

export default CreateExercise