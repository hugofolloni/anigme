import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GameArea from './GameArea';

const CharFinder = () => {
    const [charName, setCharName] = useState('');
    const [charRole, setCharRole] = useState('');
    const [charImage, setCharImage] = useState('');
    const [charAnime, setCharAnime] = useState([]);
    const [charId, setCharId] = useState('');
    const [charSingleAnime, setCharSingleAnime] =  useState('');

    useEffect(() => {    

        var animeArray = [16498, 1535, 5114, 30276, 11757, 31964, 22319, 20, 38000, 11061, 32281, 25777, 9253, 33486, 19815, 1735, 1575, 4224, 28851, 35760, 20507, 23273, 31240, 6547, 36456, 21, 22199, 10620, 23755, 31043, 40748, 38524, 21881, 9919, 24833, 32182, 30831, 20583, 37779, 269, 22535, 1, 199, 6702, 27899, 2904, 40028, 18679, 28223, 30] 

        const today = new Date();
        const random = (today.getDate() * 12512 * 12351 * (today.getMonth() + 1) * today.getFullYear() * 345151252 * today.getDate() / 11233 * 913) % animeArray.length
        const animeId = animeArray[random]

        var characterIdToFindAnime = 0
    
        const animeApi = `https://api.jikan.moe/v4/anime/${animeId}/characters`

        var charNameArray = [];
        var charRoleArray = [];
        var charImageArray = [];
        var charIdArray = [];

        fetch(animeApi)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.data.length; i++) {
                const charRole = data.data[i].role;
                if(charRole === "Main" || charRole === "Supporting") {
                    charNameArray.push(data.data[i].character.name)
                    charRoleArray.push(data.data[i].role)
                    charImageArray.push(data.data[i].character.images.jpg.image_url)
                    charIdArray.push(data.data[i].character.mal_id)
                }
            }
        })
        .then(() => {
            var randomChar = (today.getDate() *  1231 * 12351 * 123123 * (today.getMonth() + 1) * today.getFullYear() * today.getDate() / 133 * 913) % charNameArray.length
            setCharName(charNameArray[randomChar])
            setCharRole(charRoleArray[randomChar])
            setCharImage(charImageArray[randomChar])
            setCharId(charIdArray[randomChar])
            characterIdToFindAnime = charIdArray[randomChar]
            console.log(charIdArray[randomChar])

            localStorage.setItem('gameOver', false)

            
            fetch(`https://api.jikan.moe/v4/characters/${characterIdToFindAnime}/anime`)
            .then(res => res.json())
            .then(data => {
                var guessAnimeList = []
                var guessSingleAnimeName = ''
                var guessSingleAnimeId = 10000000
                for(let i = 1; i < data.data.length; i++) {
                    guessAnimeList.push(data.data[i].anime.title)
                    if(guessSingleAnimeId > data.data[i].anime.mal_id) {
                        guessSingleAnimeName = data.data[i].anime.title
                        guessSingleAnimeId = data.data[i].anime.mal_id
                    }
                }
                setCharAnime(guessAnimeList)
                setCharSingleAnime(guessSingleAnimeName)
                console.log(guessAnimeList)
            })
        })


    }, [charName, charRole]);

    const Image = styled.img`
        width: 120px;
        filter: blur(15px);
        border-radius: 10px;
        margin-bottom: 10px;
        transition: all 0.3s ease-in-out;
        :hover {
            width: 200px;
        }
    `;

    return ( 
        <div className="info">
            <Image src={charImage} alt="" />
            <GameArea name={charName} role={charRole} anime={charAnime} id={charId} image={charImage} singleAnime={charSingleAnime}/>
        </div>
     );
}
 
export default CharFinder;

// Criar um componente para cada tentativa, que receberá como props as infos do personagme e o chute. Ele vai computar o chute e vai buscar com a api, respondendo o primeiro resultado. Após isso, ele vai checar as informações e dar display em uma nova linha de tentativa. se o personagem for o correto, tela de vitória.