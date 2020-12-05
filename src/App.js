import './App.css';
import {useEffect, useState} from "react";
import {sendChoice, getScore} from "./helpers";

function App() {
    const figures = ["scissors", "well", "rock", "paper"];
    const [score, setScore] = useState({draws: 0, user: 0, opponent: 0});
    const [readyForNextRound, setReadyForNextRound] = useState(true);
    const [selectedFigure, setSelectedFigure] = useState('scissors');
    const [opponentFigure, setOpponentFigure] = useState(null);
    const [winner, setWinner] = useState(null);

    useEffect( () => {
        async function  getData () {
            const res = await getScore();
            setScore(res.score);
        }
        getData()
    }, []);

    async function playRound() {
        const result = await sendChoice(selectedFigure);
        setScore(result.score)
        setOpponentFigure(result.opponentChoice);
        setReadyForNextRound(false);
        showWinner(result.winner);
    }

    async function selectFigure(e) {
        const currentFigure = e.currentTarget.getAttribute('data-figure');
        setSelectedFigure(currentFigure);
    }

    function showWinner(winner) {
        setWinner(winner);
        setTimeout(() => setReadyForNextRound(true), 2000)
    }

    function GameFigures(props) {
        const figures = props.figures;
        return (
            <div className="figures-user">
                {figures.map((figure) =>
                    <img onClick={selectFigure} className={selectedFigure === figure ? "active figure" : "figure"}
                         src={`/${figure}-figure.png`} data-figure={figure} alt={figure}/>
                )}
            </div>
        )
    }

    function OpponentFigure(props) {
        const figure = props.figure;
        return (
            <div className="figures-opponents">
                {figure && !readyForNextRound ? <img className="active figure opponent" src={`/${figure}-figure.png`}
                                                     data-figure={figure} alt={figure}/>
                    : <img className="question" src="question.png" alt="question"/>}
            </div>
        )
    }

    function Winner(props) {
        let winner = props.winner;
        const textClass = !winner ? 'draw' : winner === 'user' ? "user" : "opponent";
        return (
            <div className="winner-container">
                {
                    (winner && !readyForNextRound) || (winner === null && !readyForNextRound) ?
                        <p className={`winner ${textClass}`}>{!winner ? 'draw' : `${winner} win!`}</p> : null
                }
            </div>
        )
    }

    function Score(props) {
        const score = props.score;
        return (
            <div className="score">
                <div>
                    Your score: {score.user}
                </div>
                <div>
                    Opponent score: {score.opponent}
                </div>
                <div>
                    Draws: {score.draws}
                </div>
            </div>
        );
    }

    return (
        <div className="App">
            <div className="container">
                <header className="App-header">
                    <div className='game-container'>
                        <h1 className="title">Scissors-Well-Rock-Paper game</h1>
                        <Score score={score}/>
                        <Winner winner={winner}/>
                        <div className="figures">
                            <GameFigures figures={figures}/>
                            <OpponentFigure figure={opponentFigure}/>
                        </div>
                        <button className="next-round" onClick={playRound} disabled={!readyForNextRound}>
                            Play round
                        </button>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default App;
