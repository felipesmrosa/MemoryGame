import { FaPlay } from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";
import { Rank } from "../Rank";
import { useState } from "react";
import axios from "axios";

export function StartGame({ startGame }: any) {
  const [modalRank, setModalRank] = useState(false);
  const [login, setLogin] = useState(true);

  const [values, setValues] = useState("");

  const handleChangeValues = (value: any) => {
    setValues((prevValue: any) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  function handleSubmit(e: any, type) {
    e.preventDefault();
    if (type === "Cadastrar") {
      axios
        .post("http://localhost:5174/register", {
          name: values.usuario,
          password: values.senha,
        })
        .then((response) => {
          console.log(response);
        });
    }
  }

  function openModalRank() {
    setModalRank(!modalRank);
  }
  return (
    <>
      {startGame && (
        <div className="modal">
          <div className="modal__content">
            <GiQueenCrown
              onClick={openModalRank}
              className="modal__content--crown"
            />
            {modalRank && <Rank />}
            <h2>
              Insira seus <p className="modal__content--nome">dados</p>
            </h2>
            <p style={{ fontSize: "0.6em" }}>
              Para {login ? "logar" : "cadastrar"}
            </p>
            <form
              onSubmit={(e) => handleSubmit(e, login ? "Logar" : "Cadastrar")}
              className="modal__content__formulario"
            >
              <input
                className="modal__content__formulario__player"
                type="text"
                placeholder="Usuário"
                onChange={handleChangeValues}
                name="usuario"
                autoComplete="off"
              />
              <input
                className="modal__content__formulario__player"
                type="password"
                placeholder="Senha"
                onChange={handleChangeValues}
                name="senha"
                autoComplete="off"
              />
              <div className="modal__content__formulario__cadastrarEResetarSenha">
                {login && (
                  <p className="modal__content__formulario__cadastrarEResetarSenha--buttonText">
                    Esqueceu sua senha?
                  </p>
                )}
                <p
                  onClick={() => setLogin(!login)}
                  className="modal__content__formulario__cadastrarEResetarSenha--buttonText"
                >
                  {login ? "Cadastrar" : "Logar"}
                </p>
              </div>
              <button
                type="submit"
                className="modal__content__formulario--buttonStart"
                // onClick={handleClickButton}
                // onClick={handleStartGame}
              >
                {login ? <FaPlay /> : "Cadastrar"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
