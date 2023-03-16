//CSS
import './App.css'

//React
import { useCallback, useEffect, useState } from 'react'

//data
import {wordsList} from './components/secretword/words'

//components
import StartScreen from './components/secretword/StartScreen'
import GameScreen from './components/secretword/GameScreen'
import EndScreen from './components/secretword/EndScreen'

//1
const stages = [
  { id: 1, name: "start"},
  { id: 2, name: "game"},
  { id: 3, name: "end"}
]

//32
const guessesQty = 3;

function App() {

  //2
  const [gameStage, setGameStage] = useState(stages[0].name);
  //4
  const [words] = useState(wordsList);

  //8
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  //12
  const [guessedLetters, setGuessedLetters] = useState([]); //letras adivinhadas
  const [wrongLetters, setWrongLetters] = useState([]); //letras erradas
  const [guesses, setGuesses] = useState(guessesQty); // quantas tentativas o usuário terá
  const [score, setScore] = useState(0); //pontuação inicial


  //9
  const pickWordAndCategory = useCallback(() => {
    //pegando uma categoria aleatória
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    // console.log(category);

    //pegando uma palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)];
    // console.log(word);

    return {word, category}
  }, [words]);

  //5
  const startGame = useCallback(( ) => {

    //35 limpa todas as letras (para elas não aparecerem na próxima palavra caso acerte)
    clearLetterStates();

    //10 (const {word, category})
   const {word, category} = pickWordAndCategory();

   //11 transformando palavras em letras
    let wordLetters = word.split("");

    // pegando as letras e deixando todas em minúsculas
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    //console.log(word, category);
    //console.log(wordLetters);

    //setar os status
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  //6
  //22 inserir o parametro "letter"
  const verifyLetter = (letter) => {
    //24
    const normalizedLetter = letter.toLowerCase();
    //25 checa se a letra já foi utilizada (se as letras adivinhadas incluem normalized letter ou se as letras erradas já incluem normalizedletter). Trava se o usuário sem querer usa uma letra que já foi acertada ou errada
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }
    //26 inclui a letra certa ou remove uma chance
    if(letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, //pegando todos os elementos atuais do array
        normalizedLetter //adiciona nova letra
      ]);
    }else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, //pegando todos os elementos atuais do array
        normalizedLetter //adiciona nova letra
      ]);

      //27 diminuir as tentativas
      setGuesses((actualGuesses) => actualGuesses -1);
      
    }

  };

  //29 resetando os states (senão ao voltar ao novo jogo, suas chances aparecem como 0)
  const clearLetterStates = () =>  {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  //28 vamos usar o useEffect para monitorar o guess quando as tentativas acabarem
  useEffect(() => {
    if(guesses <= 0) {
      //30
      clearLetterStates()

      setGameStage(stages[2].name);
    }
  }, [guesses])

  //34 checar se o usuário venceu
  useEffect(() => {
    //35 criando um array com letras únicas (ex: ovo onde a letra o aparece 2 vezes)
    const repeatedLetters = [... new Set(letters)]
    //quando eu tiver os 2 arrays iguais quer dizer que a palavra foi acertada
    if(guessedLetters.length === repeatedLetters.length) {
      //add score
      setScore((actualScore) => (actualScore += 100));
      //recomeçar jogo com nova palavra
      startGame();
    }

  }, [guessedLetters, letters, startGame])

  //7
  const retry = () => {
    //31
    setScore(0);
    setGuesses(guessesQty);

    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {/* 3 */}
      {gameStage === "start" && <StartScreen startGame = {startGame}/>}
      {gameStage === "game" && (
      <GameScreen 
        verifyLetter = {verifyLetter} 
        pickedWord = {pickedWord} 
        pickedCategory = {pickedCategory} 
        letters = {letters} 
        guessedLetters = {guessedLetters}
        wrongLetters = {wrongLetters}
        guesses = {guesses}
        score = {score}
      />
      )} {/* 13 inserindo pickedCategory, letters, guessedLetters, wrongLetters, guesses e score */}
      {/* 33 inserindo  score */}
      {gameStage === "end" && <EndScreen retry = {retry} score = {score}/>}
    </div>
  )
}

export default App
