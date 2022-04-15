import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Answer = (props) => {
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const [answerColors, setAnswerColors] = useState(["#f5f5f5", "#f5f5f5", "#f5f5f5", "#f5f5f5"]);

    const guessId = props.guessId;

    const [gameFinished, setGameFinished] = useState(false);
    
    const rightName = props.rightName;
    const rightRole = props.rightRole;
    const rightAnime = props.rightAnime;
    const rightImage = props.rightImage;
    const rightId = props.rightId;

    const [guessName, setGuessName] = useState('');
    const [guessImage, setGuessImage] = useState('');
    const [guessAnime, setGuessAnime] = useState([]);
    const [guessRole, setGuessRole] = useState('');
    const [guessSingleAnime, setGuessSingleAnime] = useState('');

    useEffect(() => {
    
        fetch(`https://api.jikan.moe/v4/characters/${guessId}`)
        .then(res => res.json())
        .then(data => {
            setGuessName(data.data.name);
            setGuessImage(data.data.images.jpg.image_url);
        })
        .then(() => {
            fetch(`https://api.jikan.moe/v4/characters/${guessId}/anime`)
            .then(res => res.json())
            .then(data => {
                var guessAnimeList = []
                var guessSingleAnimeName = ''
                var guessSingleAnimeId = 10000000
                for(let i = 0; i < data.data.length; i++) {
                    guessAnimeList.push(data.data[i].anime.title)
                    if(guessSingleAnimeId > data.data[i].anime.mal_id) {
                        guessSingleAnimeName = data.data[i].anime.title
                        guessSingleAnimeId = data.data[i].anime.mal_id
                }}
                setGuessAnime(guessAnimeList)
                setGuessSingleAnime(guessSingleAnimeName)
                setGuessRole(data.data[0].role);
            })
        })
        .then(() => {
            var colors = []
            guessId === rightId ? colors.push("green") : colors.push("#A9ACA9")
            guessRole === rightRole ? colors.push("green") : colors.push("#A9ACA9")
            var sameAnime = false
            for(let i = 0; i < guessAnime.length; i++) {
                for(let j = 0; j < rightAnime.length; j++) {
                    if(guessAnime[i] === rightAnime[j]) {
                        sameAnime = true
                    }}}
            sameAnime ? colors.push("green") : colors.push("#A9ACA9")
            guessId === rightId ? colors.push("green") : colors.push("#A9ACA9")
            setAnswerColors(colors)
        })
       .then(() => {
        if(guessId === rightId) {
            setGameFinished(true)
            setMessage("Você venceu!")
            setShowMessage(true)
            // localStorage.setItem('gameOver', true)
        }
        else {
            if((guessId !== rightId) && props.index === 4) {
                setGameFinished(true)
                setMessage("Você perdeu!")
                setShowMessage(true)
            }
        }
    }) 
    }, [props])


    const SingularDiv = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px;
        width: 20%;
        border-radius: 10px;
        text-align: center;
    `

    const NameDiv = styled(SingularDiv)`
        background-color: ${answerColors[0]};
    `

    const RoleDiv = styled(SingularDiv)`
        background-color: ${answerColors[1]};
    `   

    const AnimeDiv = styled(SingularDiv)`
        background-color: ${answerColors[2]};   
    `

    const ImageDiv = styled(SingularDiv)`
        background-color: ${answerColors[3]};
        padding: 1px;
    `
    
    const AnswerDiv = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        width: 80%;
        margin: 10px 0;
        background-color: #60495A;
        border-radius: 10px;
        padding: 10px 0px;
    
    `

    const [messageDisplay, setMessageDisplay] = useState("flex");

    const Message = styled.div`
        display: ${messageDisplay};
        position: absolute;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 70vw;
        padding: 30px;
        top: 10%;
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
        background-color: white;
        color: black;
        border-radius: 10px;
        @media (max-width: 800px) {
            width: 60vw;
            top: 40%;
        }
        z-index: 0;
    `

    return (  
        <AnswerDiv>
            <NameDiv>
                <p>{guessName}</p>
            </NameDiv>
            <RoleDiv>
                <p>{guessRole}</p>
            </RoleDiv>
            <AnimeDiv>
                <p>{guessSingleAnime}</p>
            </AnimeDiv>
            <ImageDiv>
                <img src={guessImage} alt="" height='50px'/>
            </ImageDiv>
            {showMessage &&  <Message>
                <FontAwesomeIcon className='close-button' icon={ faEyeSlash } onClick={() => setMessageDisplay("none")} />             
                <div className="left-content">
                    <h1>{message}</h1>
                    <p>O personagem do dia de hoje era: <strong>{rightName}</strong></p>
                    <p>Ele é do anime: {props.singleAnime}</p>
                </div>
                <div className="right-content">
                    <img src={rightImage} alt="" />
                </div>
            </Message>}
        </AnswerDiv>
    );
}
 
export default Answer;