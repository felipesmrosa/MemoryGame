import { FaPlay } from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";
import { Rank } from "../Rank";
import { useEffect, useState } from "react";

import axios from "axios";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

export function FormLoginCad({
  handleStartGame,
  setWins,
  setDefeat,
  setID,
  exitButton,
  login,
  setLogin,
}: any) {
  const [modalRank, setModalRank] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [mensagemDeErro, setMensagemDeErro] = useState("");

  useEffect(() => {
    if (mensagemDeErro) {
      const timer = setTimeout(() => {
        setMensagemDeErro("");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [mensagemDeErro]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 799);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const validationCadastro = yup.object().shape({
    usuario: yup
      .string()
      .min(3, "O usuário deve conter no minimo 3 caracteres")
      .required("Campo obrigatório"),
    senha: yup
      .string()
      .min(6, "A senha deve conter no minimo 6 caracteres")
      .required("Campo obrigatório"),
    confirmSenha: yup
      .string()
      .oneOf([yup.ref("senha"), null], "As senhas não conferem")
      .min(6, "A senha deve conter no minimo 6 caracteres")
      .required("Campo obrigatório"),
  });

  const validationLogin = yup.object().shape({
    usuario: yup.string().required("Campo obrigatório"),
    senha: yup.string().required("Campo obrigatório"),
  });

  function openModalRank() {
    setModalRank(!modalRank);
  }

  function handleSubmit(values: any, type: string) {
    if (type === "Cadastrar") {
      axios
        .post("http://localhost:5174/cadastrar", {
          usuario: values.usuario,
          senha: values.senha,
        })
        .then((response) => {
          if (response.data.msg === "Usuário já cadastrado.") {
            setMensagemDeErro("Usuário já cadastrado");
          } else if (response.data.msg === "Cadastrado com sucesso!") {
            setSuccessMessage("Cadastrado com sucesso");
            setTimeout(() => {
              setLogin(true);
            }, 800);
          }
          console.log(response);
        });
    } else if (type === "Logar") {
      axios
        .post("http://localhost:5174/logar", {
          usuario: values.usuario,
          senha: values.senha,
        })
        .then((response) => {
          if (response.data.msg === "Usuário logado com sucesso") {
            sessionStorage.setItem("usuario", JSON.stringify(response.data));
            setWins(parseInt(response.data.vitorias));
            setDefeat(parseInt(response.data.derrotas));
            setID(parseInt(response.data.id));
            setSuccessMessage("Logado com sucesso");
            setTimeout(() => {
              handleStartGame();
            }, 1000);
          }
        });
    } else {
      console.log("Deu erro");
    }
  }
  return (
    <Formik
      onSubmit={(e) => handleSubmit(e, login ? "Logar" : "Cadastrar")}
      initialValues={{}}
      validationSchema={() =>
        login === false
          ? validationCadastro
          : login === true
          ? validationLogin
          : {}
      }
    >
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
          <Form
            // onSubmit={(e) => handleSubmit(e, login ? "Logar" : "Cadastrar")}
            className="modal__content__formulario"
          >
            <Field
              className="modal__content__formulario__player"
              type="text"
              placeholder="Usuário"
              name="usuario"
              autoComplete="off"
              id="usuario"
            />
            <ErrorMessage
              component="span"
              name="usuario"
              className="modal__content__formulario__error"
            />
            <Field
              className="modal__content__formulario__player"
              type="password"
              placeholder="Senha"
              name="senha"
              autoComplete="off"
              id="senha"
            />
            <ErrorMessage
              component="span"
              name="senha"
              className="modal__content__formulario__error"
            />

            {login === false && (
              <>
                <Field
                  className="modal__content__formulario__player"
                  type="password"
                  placeholder="Confirmar Senha"
                  name="confirmSenha"
                  autoComplete="off"
                />
                <ErrorMessage
                  component="span"
                  name="confirmSenha"
                  className="modal__content__formulario__error"
                />
              </>
            )}
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
            {successMessage && (
              <div className="message-sucesso">{successMessage}</div>
            )}
            {mensagemDeErro && (
              <div className="message-erro">{mensagemDeErro}</div>
            )}
          </Form>
        </div>
      </div>
    </Formik>
  );
}
