import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'


const InfoPage = () => {
    const [showInfo, setShowInfo] = useState(true);

    return ( 
        <div className="infos">
            <div className="button" onClick={() => setShowInfo(true)}>?</div>
            {showInfo && <div className='info-page'>
                <FontAwesomeIcon className='close-button' style={{ fontSize: '21px'}} icon={ faEyeSlash } onClick={() => setShowInfo(false)} />             
                <h3>Seja bem-vindo ao anigme!</h3>
                <p>Seu objetivo neste jogo é descobrir qual é o personagem por trás da foto borrada.</p>
                <p>Com base no seu chute, mostraremos se algumas informações coincidem.</p>
                <div className="div-exemplos">
                    <div className="exemplo" style={ { backgroundColor: '#86BA90' } }>
                        <p>Acertou!</p>
                    </div>
                    <div className="exemplo">
                        <p>Errou!</p>
                    </div>
                </div>
                <p><strong>DICA: Tente digitar o nome completo do personagem, ou ao menos seu primeiro nome e o anime qual ele pertence, para achar o personagem mais facilmente.</strong></p>
                <p>Este jogo foi criado por <a href="https://instagram.com/hugofolloni">hugofolloni</a>. Você pode encontrar esse projeto em seu <a href="https://github.com/hugofolloni">github</a>. Foi feito em parceira com <a href='https://instagram.com/thatisxx'>zanini</a>.</p>
            </div> }
        </div>
     );
}
 
export default InfoPage;