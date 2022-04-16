import { useEffect, useState } from "react";
import styled from "styled-components";
import Answer from "./Answer";

const GameArea = (props) => {

    const [firstLine, setFirstLine] = useState(false);
    const [secondLine, setSecondLine] = useState(false);
    const [thirdLine, setThirdLine] = useState(false);
    const [fourthLine, setFourthLine] = useState(false);

    const [firstGuessId, setFirstGuessId] = useState(0);
    const [secondGuessId, setSecondGuessId] = useState(0);
    const [thirdGuessId, setThirdGuessId] = useState(0);
    const [fourthGuessId, setFourthGuessId] = useState(0);

    const [idArray] = useState([]);

    const charName = props.name;
    const charImage = props.image;
    const charAnime = props.anime;
    const charId = props.id;
    const charRole = props.role;


    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            verifyAnswer(e.target.value, charId)
            e.target.value = "";
        }
    }


    const verifyAnswer = (userTry, charId) => {
        const searchApi = `https://api.jikan.moe/v4/characters?q=${userTry}`
        fetch(searchApi)
        .then(res => res.json())
        .then(data => {
            idArray.push(data.data[0].mal_id)
            handleLine(idArray.length, data.data[0].mal_id)
        })
    }

    const handleLine = (lineToChange, id) => {
        if (lineToChange === 1) {
            setFirstLine(true)
            setFirstGuessId(id)
            setInputPlaceholder(`Guess 2 of 4`)
        }
        if (lineToChange === 2) {
            setSecondLine(true)
            setSecondGuessId(id)
            setInputPlaceholder(`Guess 3 of 4`)
        }
        if (lineToChange === 3) {
            setThirdLine(true)
            setThirdGuessId(id)
            setInputPlaceholder(`Guess 4 of 4`)
        }
        if (lineToChange === 4) {
            setFourthLine(true)
            setFourthGuessId(id)
            setInputPlaceholder(`You made all of your guesses!`)
            setDisabled("none")
        }
    }


    const [disabled, setDisabled] = useState("all");
        

    const Input = styled.input`
        pointer-events: ${disabled};
        width: 100%;
        height: 50px;
        border-radius: 10px;
        border: none;
        font-size: 20px;
        margin-top: 0px;
        padding-left: 10px;

        :focus {
            outline: #3F3244 2px solid;
        }
    `

    const [inputPlaceholder, setInputPlaceholder] = useState("Guess 1 of 4");

    return ( 
        <div className="game-area">
            <div className='input-div'>
                <Input type="text" id='char-input' className="input-field" placeholder={inputPlaceholder} onKeyDown={(e) => handleKeyDown(e)}/>
            </div>
            <div className="answer-area">
                {firstLine && <Answer guessId={firstGuessId} rightName={charName} rightImage={charImage} rightAnime={charAnime} rightRole={charRole} rightId={charId} index={1} singleAnime={props.singleAnime} />}
                {secondLine && <Answer guessId={secondGuessId} rightName={charName} rightImage={charImage} rightAnime={charAnime} rightRole={charRole} rightId={charId} index={2} singleAnime={props.singleAnime} />}
                {thirdLine && <Answer guessId={thirdGuessId} rightName={charName} rightImage={charImage} rightAnime={charAnime} rightRole={charRole} rightId={charId} index={3} singleAnime={props.singleAnime} />}
                {fourthLine && <Answer guessId={fourthGuessId} rightName={charName} rightImage={charImage} rightAnime={charAnime} rightRole={charRole} rightId={charId} index={4} singleAnime={props.singleAnime} />}
            </div>
        </div>
     );
}
 
export default GameArea;