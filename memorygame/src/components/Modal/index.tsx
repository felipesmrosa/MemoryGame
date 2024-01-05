import { DefeatModal } from "../ModalDefeat";
import { WinnerModal } from "../ModalWin";
import { StartGame } from "../StartGame";

export function Modal({
  startGame,
  player,
  setPlayer,
  handleStartGame,
  winMessage,
  timeLeft,
  handleReset,
  loseMessage,
  openRank,
  setWins,
  setDefeat,
  setID,
  exitButton,
  login,
  setLogin,
}: any) {
  return (
    <>
      <StartGame
        openRank={openRank}
        startGame={startGame}
        player={player}
        setPlayer={setPlayer}
        handleStartGame={handleStartGame}
        setWins={setWins}
        setDefeat={setDefeat}
        setID={setID}
        exitButton={exitButton}
        login={login}
        setLogin={setLogin}
      />
      <WinnerModal
        winMessage={winMessage}
        timeLeft={timeLeft}
        handleReset={handleReset}
      />
      <DefeatModal
        setDefeat={setDefeat}
        loseMessage={loseMessage}
        handleReset={handleReset}
      />
    </>
  );
}
