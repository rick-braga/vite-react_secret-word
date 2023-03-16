import "../secretword/EndScreen.css"

const EndScreen = ({retry, score}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h2>A sua pontuação foi: <span>{score}</span> pontos</h2>
      <button onClick={retry}>Tente novamente!</button>
    </div>
  )
}

export default EndScreen