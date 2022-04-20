import { useState } from "react";
import styled from "styled-components";
import Answer from "./Answer";
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'



const GameArea = (props) => {

    const [firstLine, setFirstLine] = useState(false);
    const [secondLine, setSecondLine] = useState(false);
    const [thirdLine, setThirdLine] = useState(false);
    const [fourthLine, setFourthLine] = useState(false);
    const [fifthLine, setFifthLine] = useState(false);
    const [sixthLine, setSixthLine] = useState(false);
    const [seventhLine, setSeventhLine] = useState(false);
    const [eighthLine, setEighthLine] = useState(false);


    const [firstGuessId, setFirstGuessId] = useState(0);
    const [secondGuessId, setSecondGuessId] = useState(0);
    const [thirdGuessId, setThirdGuessId] = useState(0);
    const [fourthGuessId, setFourthGuessId] = useState(0);
    const [fifthGuessId, setFifthGuessId] = useState(0);
    const [sixthGuessId, setSixthGuessId] = useState(0);
    const [seventhGuessId, setSeventhGuessId] = useState(0);
    const [eighthGuessId, setEighthGuessId] = useState(0);

    const [idArray] = useState([]);

    const charName = props.name;
    const charImage = props.image;
    const charAnime = props.anime;
    const charId = props.id;
    const charRole = props.role;

    const [showPicker, setShowPicker] = useState(false);

    const [charArray, setCharArray] = useState([]);

  
    localStorage.setItem('colorArray', JSON.stringify([]))


    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            verifyAnswer(e.target.value)
            e.target.value = "";
        }
    }


    const verifyAnswer = (userTry) => {
        var picksArray = []
        const searchApi = `https://api.jikan.moe/v4/characters?q=${userTry}`
        fetch(searchApi)
        .then(res => res.json())
        .then(data => {
            var dataSize = data.data.length
            if(data.data.length > 5) {
                dataSize = 5
            }
            for(let i = 0; i < dataSize; i++) {
                picksArray.push({'name': data.data[i].name, 'id': data.data[i].mal_id, 'anime': '', 'i' : i})
            }
        })
        .then(() => {
            for(let i = 0; i < picksArray.length; i++) {
                fetch(`https://api.jikan.moe/v4/characters/${picksArray[i].id}/anime`)
                .then(res => res.json())
                .then(data => {
                    // var guessAnimeList = []
                    // var guessSingleAnimeName = ''
                    // var guessSingleAnimeId = 10000000
                    // for(let i = 0; i < data.data.length; i++) {
                    //     guessAnimeList.push(data.data[i].anime.title)
                    //     if(guessSingleAnimeId > data.data[i].anime.mal_id) {
                    //         guessSingleAnimeName = data.data[i].anime.title
                    //         guessSingleAnimeId = data.data[i].anime.mal_id
                    //     }
                    // }
                    // picksArray[i].anime = guessSingleAnimeName;
                    picksArray[i].anime = data.data[0].anime.title;
                    setPickArray(picksArray)
                }
            )
            }
        })
        .then(() => {
            setCharArray(picksArray)
            setShowPicker(true)
        })
    
    }

    const [pickArray, setPickArray] = useState([]);

    const handlePick = (pickId) => {
        idArray.push(pickId)
        setCharArray([])
        handleLine(idArray.length, pickId)
        setShowPicker(false)
    }

    const [inputPlaceholder, setInputPlaceholder] = useState("Guess 1 of 8");

    const [disabled, setDisabled] = useState("all");


    const handleLine = (lineToChange, id) => {
        if (lineToChange === 1) {
            setFirstLine(true)
            setFirstGuessId(id)
            setInputPlaceholder(`Guess 2 of 8`)
        }
        if (lineToChange === 2) {
            setSecondLine(true)
            setSecondGuessId(id)
            setInputPlaceholder(`Guess 3 of 8`)
        }
        if (lineToChange === 3) {
            setThirdLine(true)
            setThirdGuessId(id)
            setInputPlaceholder(`Guess 4 of 8`)
        }
        if (lineToChange === 4) {
            setFourthLine(true)
            setFourthGuessId(id)
            setInputPlaceholder(`Guess 5 of 8`)
        }
        if(lineToChange === 5) {
            setFifthLine(true)
            setFifthGuessId(id)
            setInputPlaceholder(`Guess 6 of 8`)
        }
        if(lineToChange === 6) {
            setSixthLine(true)
            setSixthGuessId(id)
            setInputPlaceholder(`Guess 7 of 8`)
        }
        if(lineToChange === 7) {
            setSeventhLine(true)
            setSeventhGuessId(id)
            setInputPlaceholder(`Guess 8 of 8`)
        }
        if(lineToChange === 8) {
            setEighthLine(true)
            setEighthGuessId(id)
            setInputPlaceholder(`You made all of your guesses!`)
            setDisabled("none")
        }
    }


    const Input = styled.input`
        pointer-events: ${disabled};
        width: 100%;
        height: 50px;
        border-radius: 10px;
        border: none;
        font-size: 20px;
        margin-top: 0px;
        padding-left: 10px;
        caret-color: #2F2235;
        :focus {
            outline: #3F3244 2px solid;
        }
    `

    return ( 
        <div className="game-area">
            <div className='input-div'>
                <Input type="text" id='char-input' className="input-field" placeholder={inputPlaceholder} onKeyDown={(e) => handleKeyDown(e)}/>
            </div>
            {showPicker  && <div className='picker'>
                <div className='close-button' style={{ fontSize: '21px', fontWeight: '700'}} icon={ faEyeSlash } onClick={() => {setShowPicker(false); setCharArray([])}}>X</div>             
                {charArray.map((char) => ( 
                    <div className="char-pick-div" onClick={() => handlePick(char.id)}>
                        <p><strong>{char.name}</strong></p>
                        <p>{char.anime}</p>
                    </div>
                ))}
                </div>}
            <div className="answer-area">
                {firstLine && <Answer guessId={firstGuessId} rightName={charName} rightImage={charImage} rightAnime={charAnime} rightRole={charRole} rightId={charId} index={1} singleAnime={props.singleAnime} />}
                {secondLine && <Answer guessId={secondGuessId} rightName={charName} rightImage={charImage} rightAnime={charAnime} rightRole={charRole} rightId={charId} index={2} singleAnime={props.singleAnime} />}
                {thirdLine && <Answer guessId={thirdGuessId} rightName={charName} rightImage={charImage} rightAnime={charAnime} rightRole={charRole} rightId={charId} index={3} singleAnime={props.singleAnime} />}
                {fourthLine && <Answer guessId={fourthGuessId} rightName={charName} rightImage={charImage} rightAnime={charAnime} rightRole={charRole} rightId={charId} index={4} singleAnime={props.singleAnime} />}
                {fifthLine && <Answer guessId={fifthGuessId} rightName={charName} rightImage={charImage} rightAnime={charAnime} rightRole={charRole} rightId={charId} index={5} singleAnime={props.singleAnime} />}
                {sixthLine && <Answer guessId={sixthGuessId} rightName={charName} rightImage={charImage} rightAnime={charAnime} rightRole={charRole} rightId={charId} index={6} singleAnime={props.singleAnime} />}
                {seventhLine && <Answer guessId={seventhGuessId} rightName={charName} rightImage={charImage} rightAnime={charAnime} rightRole={charRole} rightId={charId} index={7} singleAnime={props.singleAnime} />}
                {eighthLine && <Answer guessId={eighthGuessId} rightName={charName} rightImage={charImage} rightAnime={charAnime} rightRole={charRole} rightId={charId} index={8} singleAnime={props.singleAnime} />}

            </div>
        </div>
     );
}
 
export default GameArea;