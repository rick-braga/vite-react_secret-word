import { useState, useRef } from "react";

import "../secretword/GameScreen.css"

//14 recebendo os states como props
const GameScreen = ({
    verifyLetter, 
    pickedWord, 
    pickedCategory, 
    letters, 
    guessedLetters, 
    wrongLetters, 
    guesses, 
    score
}) => {

//18
const [letter, setLetter] = useState("");

//21 fazer o cursor voltat sempre para o input usamos esse hook e setamos o ref no input
const letterInputRef = useRef(null);

//20
const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);
    setLetter("");
    
    //23
    letterInputRef.current.focus();
}

// 15 inserindo as props nos determinados lugares
  return (
    <div className="game">
        <p className="points">
            <span>Pontuação: {score}</span>
        </p>
        <h1>Adivinhe a palavra</h1>
        <h3 className="tip">
            Dica sobre a palavra: <span>{pickedCategory}</span>
        </h3>
        <p>Você ainda tem {guesses} tentativa(s).</p>
        <div className="wordContainer">
            {/* 16 mapear cada uma das letras, na letra e seu índice onde vai retornar um objeto
            se a letra já estiver sido adivinhada = imprime ela, senão imprime o "blankSquare"   */}
            {letters.map((letter, index) =>
            guessedLetters.includes(letter) ? (
                <span className="letter" key={index}>{letter}</span>
            ) : (
                <span key={index} className="blankSquare"></span>
            )
            )}
        </div>
        <div className="letterContainer">
            <p>Tente adivinhar uma letra da palavra:</p>
            <form onSubmit={handleSubmit}> {/* 21 */}
                <input 
                type="text" 
                name="letter"
                 maxLength="1" 
                 required
                 onChange={(e) => setLetter(e.target.value)} //19
                 value = {letter} //19
                 ref={letterInputRef} //22
                  />
                <button>Jogar!</button>
            </form>
        </div>
        <div className="wrongLettersContainer">
            <p>Letras erradas:</p>
            {/* 17 mapear letras já erradas*/}
            {wrongLetters.map((letter, index) =>(
                <span key={index}>{letter},</span>
            ))}
        </div>
    </div>
  )
}

export default GameScreen