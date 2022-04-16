import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Answer = (props) => {
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");

    const [answerColors, setAnswerColors] = useState(["#f5f5f5", "#f5f5f5", "#f5f5f5", "#f5f5f5"]);

    const guessId = props.guessId;
    
    const rightName = props.rightName;
    const rightRole = props.rightRole;
    const rightAnime = props.rightAnime;
    const rightImage = props.rightImage;
    const rightId = props.rightId;

    const [guessName, setGuessName] = useState('');
    const [guessImage, setGuessImage] = useState('');
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
                setGuessSingleAnime(guessSingleAnimeName)
                setGuessRole(data.data[0].role);
                var colors = []
                guessId === rightId ? colors.push("#86BA90") : colors.push("#A9ACA9")
                data.data[0].role === rightRole ? colors.push("#86BA90") : colors.push("#A9ACA9")
                var sameAnime = false
                for(let i = 0; i < guessAnimeList.length; i++) {
                    for(let j = 0; j < rightAnime.length; j++) {
                        if(guessAnimeList[i] === rightAnime[j]) {
                            sameAnime = true
                        }}}
                sameAnime ? colors.push("#86BA90") : colors.push("#A9ACA9")
                guessId === rightId ? colors.push("#86BA90") : colors.push("#A9ACA9")
                setAnswerColors(colors)
            })
        })
       .then(() => {
        if(guessId === rightId) {
            setMessage("Você venceu!")
            setShowMessage(true)
            document.getElementById('char-input').style.cssText =  'pointer-events: none';
            document.getElementById('char-hidden-image').style.cssText = 'filter: blur(0px);'
        }
        else {
            if((guessId !== rightId) && props.index === 8) {
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
        @media (max-width: 600px) {
            padding: 25px;    
        }
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
    
    const [messageDisplay, setMessageDisplay] = useState("flex");

    const Message = styled.div`
        display: ${messageDisplay};
        position: absolute;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 70vw;
        padding: 30px;
        top: 15%;
        font-size: 20px;
        font-family: 'Roboto', sans-serif;
        background-color: white;
        color: black;
        border-radius: 10px;
        @media (max-width: 800px) {
            width: 80vw;
            top: 20%;
            flex-direction: column;
            padding: 80px 20px;
        }
        z-index: 0;
    `

    return (  
        <div className='answer-div'>
            <NameDiv>
                <p>{guessName}</p>
            </NameDiv>
            <RoleDiv>
                <p>{guessRole}</p>
            </RoleDiv>
            <AnimeDiv style={{ backgroundColor: answerColors[2]}}>
                <p>{guessSingleAnime}</p>
            </AnimeDiv>
            <ImageDiv style={{ backgroundColor: answerColors[3]}}>
                <img src={guessImage} alt="" height='50px'/>
            </ImageDiv>
            {showMessage &&  <Message>
                <FontAwesomeIcon className='close-button' icon={ faEyeSlash } onClick={() => setMessageDisplay("none")} />             
                <div className="left-content">
                    <h1>{message}</h1>
                    <p>O personagem do dia de hoje era <strong>{rightName}</strong></p>
                    <p>De <strong>{props.singleAnime}</strong></p>
                </div>
                <div className="right-content">
                    <img src={rightImage} alt="" />
                </div>
            </Message>}
        </div>
    );
}
 
export default Answer;
