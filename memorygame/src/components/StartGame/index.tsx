import { useState } from "react";
import { FormLoginCad } from "../FormLoginCad";

export function StartGame({
  startGame,
  handleStartGame,
  setWins,
  setDefeat,
  setID,
  exitButton,
  login,
  setLogin,
}: any) {
  return (
    <>
      {startGame && (
        <FormLoginCad
          setDefeat={setDefeat}
          setWins={setWins}
          handleStartGame={handleStartGame}
          setID={setID}
          exitButton={exitButton}
          login={login}
          setLogin={setLogin}
        />
      )}
    </>
  );
}
