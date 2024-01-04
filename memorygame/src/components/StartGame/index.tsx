import { useState } from "react";
import { FormLoginCad } from "../FormLoginCad";

export function StartGame({ startGame, handleStartGame }: any) {
  // const [modalRank, setModalRank] = useState(false);
  // const [login, setLogin] = useState(true);

  return <>{startGame && <FormLoginCad handleStartGame={handleStartGame}/>}</>;
}
