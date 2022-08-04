import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateGame, getGameTypes, getSingleGame } from '../../managers/GameManager.js'


export const UpdateGame = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])
    const { gameId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({})

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes().then(setGameTypes)
        getSingleGame(gameId).then(setCurrentGame)
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = {...currentGame}
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="number" name="skill_level" required autoFocus className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="number" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                    <label htmlFor="game_type">Game Type: </label>
                    <select name="game_type" required autoFocus className="form-control"
                        value={currentGame?.game_type?.id}
                        onChange={changeGameState}
                    >
                        {/* <option value="0" selected disabled hidden>Select an Option</option> */}
                        {gameTypes.map((type) => <option key={`gameType--${type.id}`} value={type.id}>{type.label}</option>)}
                    </select>

                </div>
            </fieldset>


            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type.id)
                    }

                    // Send POST request to your API
                    updateGame(game, gameId)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}