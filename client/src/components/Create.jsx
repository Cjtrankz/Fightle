import React, { useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

const Create = (props) => {


    const history = useHistory();

    const [charName, setCharName] = useState("");
    const [dispName, setDispName] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [origin, setOrigin] = useState("");
    const [game, setGame] = useState("");
    const [height, setHeight] = useState("");

    const [errors, setErrors] = useState([]);

    const addFighter = (e) => {
        e.preventDefault();
        const fighterData = {
            name: charName, dispName, imgURL, game, height, origin
        }
        // console.log(petData)
        axios.post('http://localhost:8000/api/fighters/new', fighterData)
            .then(res => {
                console.log(res.data)
                // history.push('/')
            })
            .catch(err => {
                console.log(err.response.data)
                const errorResponse = err.response.data.errors;
                console.log(errorResponse)
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }


    return (
        <div style={{margin:30}}>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Link to={'/'}>Back to home</Link>
            </div>
            <h1>Add char to database</h1>
            <div style={{border:'2px solid black', margin:10}}>
                <form onSubmit={addFighter}>
                    {/* {JSON.stringify(errors)} */}
                    {errors.map((err, index) => <p key={index}>{err}</p>)}
                    <div>
                        <label>Name: </label>
                        <input type="text" onChange={(e) => { setCharName(e.target.value) }} value={charName} />
                    </div>
                    <div>
                        <label>Display Name: </label>
                        <input type="text" onChange={(e) => { setDispName(e.target.value) }} value={dispName} />
                    </div>
                    <div>
                        <label>IMG URL: </label>
                        <input type="text" onChange={(e) => { setImgURL(e.target.value) }} value={imgURL} />
                    </div>
                    <div>
                        <label>Game: </label>
                        <input type="text" onChange={(e) => { setGame(e.target.value) }} value={game} />
                    </div>
                    <div>
                        <label>Height: </label>
                        <input type="text" onChange={(e) => { setHeight(e.target.value) }} value={height} />
                    </div>
                    <div>
                        <label>Origin: </label>
                        <input type="text" onChange={(e) => { setOrigin(e.target.value) }} value={origin} />
                    </div>

                    <input type="submit" value="Add Fighter" />
                </form>
            </div>
        </div>
    )
}

export default Create