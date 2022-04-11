import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Main = (props) => {

    const [choice, setChoice] = useState(0);
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [guesses, setGuesses] = useState([]);
    const [database, setDatabase] = useState([]);
    const [answer, setAnswer] = useState({});
    const [ansFlag, setAnsFlag] = useState({});
    const [reset, setReset] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/fighters')
            .then(res => {
                // console.log(res.data.fighters)
                setDatabase(res.data.fighters)
            })
            .catch(err => console.log(err))
    }, [])


    //create a random answer if one doesnt exist
    useEffect(() => {
        axios.get('http://localhost:8000/api/answer')
            .then(res => {
                if (res.data.answer.length === 0) {
                    axios.get('http://localhost:8000/api/fighters/random')
                        .then(ans => {
                            axios.post('http://localhost:8000/api/answer', ans.data.fighter)
                                .then(result => {
                                    console.log('answer created')
                                    setReset(false)
                                })
                                .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                } else {
                    setAnswer(...res.data.answer)
                }
            })
            .catch(err => console.log(err))
    }, [])

    const addToGuesses = (e) => {
        e.preventDefault()
        if (guesses.length === 0) {
            setChecked(true)
            setGuesses([...guesses, database[choice]])
        } else if (guesses[guesses.length - 1].name !== answer.name) {
            if (guesses.length < 5) {
                setChecked(true)
                setGuesses([...guesses, database[choice]])
            }
        }
        // console.log(guesses)
    }

    const boxStyle = { border: '2px solid black', padding: 2 }

    const resetGame = () => {
        setGuesses([])
        //reset random character
        axios.delete('http://localhost:8000/api/answer/delete')
            .then(res => { 
                console.log(res) 
                axios.get('http://localhost:8000/api/fighters/random')
                .then(ans => {
                    axios.post('http://localhost:8000/api/answer', ans.data.fighter)
                        .then(result => {
                            console.log('answer created')
                            setReset(false)
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        // setReset(true)
        window.location.reload(false)
    }

    const handleForm = (e) => setChoice(e.target.value)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <Button style={{ height: '50%' }} variant="outlined" onClick={handleClickOpen}>
                    ?
                </Button>
                <h1 style={{ left: '50%' }}>Fightle</h1>
                <Button style={{ height: '50%' }} variant="outlined" onClick={resetGame}>
                    {(guesses.length >= 5 ? 'Play Again' : 'Reset')}
                </Button>
            </div>
            {/* {JSON.stringify(answer)} */}
            <div>
                <table style={{ marginLeft: 'auto', marginRight: 'auto', borderSpacing: 7 }}>
                    <thead>

                        <tr>
                            <th>Character</th>
                            <th>Name</th>
                            <th>Game</th>
                            <th>Height</th>
                            <th>Origin</th>
                        </tr>
                    </thead>
                    {guesses.map((guess, i) => {
                        return <tbody key={i}>
                            <tr>
                                <td><Collapse appear={true} enter={true} in={checked} timeout={900}><img style={{ height: 100 }} src={guess.imgURL} alt="" /></Collapse></td>
                                <td style={{ ...boxStyle, backgroundColor: (guess.name === answer.name ? 'greenyellow' : 'lightgrey') }}><Collapse appear={true} enter={true} in={checked} timeout={1500}>{guess.name}</Collapse></td>
                                <td style={{ ...boxStyle, backgroundColor: (guess.game === answer.game ? 'greenyellow' : 'lightgrey') }}><Collapse appear={true} enter={true} in={checked} timeout={1500}>{guess.game}</Collapse></td>
                                <td style={{ ...boxStyle, backgroundColor: (guess.height === answer.height ? 'greenyellow' : 'lightgrey') }}><Collapse appear={true} enter={true} in={checked} timeout={1500}>{((guess.height === answer.height) ? `${guess.name} is ${guess.height} cm!` : (guess.height > answer.height) ? `${guess.height} cm is taller!` : `${guess.height} cm is shorter!`)}</Collapse></td>
                                <td style={{ ...boxStyle, backgroundColor: (guess.origin === answer.origin ? 'greenyellow' : 'lightgrey') }}><Collapse appear={true} enter={true} in={checked} timeout={1500}>{guess.origin}</Collapse></td>
                            </tr>
                        </tbody>
                    })}
                </table>
                {/* {JSON.stringify(guesses[guesses.length-1])}
                {JSON.stringify(answer)} */}
                {guesses.length > 0 ?
                guesses[guesses.length-1].name === answer.name ? 'You Win!' : '' : ''}
                {guesses.length >=5 ?
                guesses[guesses.length-1].name !== answer.name ? 'You lose, try again!' : '' : ''}
            </div>

            {/* input div */}
            <div style={{ marginLeft: 'auto', marginRight: 'auto', position: 'fixed', left: 0, right: 0, bottom: 40 }}>
                <FormControl style={{ width: '60%' }}>
                    <InputLabel id="charForm">Pick a character!</InputLabel>
                    <Select
                        labelId="select"
                        id="select"
                        value={choice}
                        label="Pick a character!"
                        onChange={handleForm}
                    >
                        {database.map((data, i) => {
                            return <MenuItem key={i} value={i}>{data.dispName}</MenuItem>
                        })}
                    </Select>
                    <Button onClick={addToGuesses} type='submit' form='charForm'>Submit</Button>
                </FormControl>
            </div>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"How to Play"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Fightle is a spin-off of wordle featuring characters from various fighting games! <br />
                        Pick any character to compare to the random answer. If an attribute matches, it will be displayed in green!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Main