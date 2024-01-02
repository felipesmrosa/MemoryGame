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
}: any) {
  return (
    <>
      <StartGame
        openRank={openRank}
        startGame={startGame}
        player={player}
        setPlayer={setPlayer}
        handleStartGame={handleStartGame}
      />
      <WinnerModal
        winMessage={winMessage}
        timeLeft={timeLeft}
        handleReset={handleReset}
      />
      <DefeatModal loseMessage={loseMessage} handleReset={handleReset} />
    </>
  );
}
