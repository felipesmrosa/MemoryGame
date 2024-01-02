import { FaPlay } from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";
import { Rank } from "../Rank";

export function StartGame({
  startGame,
  player,
  setPlayer,
  handleStartGame,
  openRank,
}: any) {
  return (
    <>
      {startGame && (
        <div className="modal">
          <div className="modal__content">
            <GiQueenCrown
              onClick={openRank}
              className="modal__content--crown"
            />
            <Rank />
            <h2>
              Insira seu <p className="modal__content--nome">login</p>
            </h2>
            <form className="modal__content__formulario">
              <input
                className="modal__content__formulario__player"
                type="text"
                placeholder="Usuário"
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
              />
              <input
                className="modal__content__formulario__player"
                type="text"
                placeholder="Senha"
                value={player}
                onChange={(e) => setPlayer(e.target.value)}
              />
              <div className="modal__content__formulario__cadastrarEResetarSenha">
                <p className="modal__content__formulario__cadastrarEResetarSenha--buttonText">
                  Esqueceu sua senha?
                </p>
                <p className="modal__content__formulario__cadastrarEResetarSenha--buttonText">
                  Cadastrar
                </p>
              </div>
              <button
                className="modal__content__formulario--buttonStart"
                onClick={handleStartGame}
              >
                <FaPlay />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
