import { FaPlay } from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";
import { Rank } from "../Rank";
import { useEffect, useState } from "react";

import { BandeiraBrasil } from "../Brasil";
import { BandeiraUSA } from "../USA";

import axios from "axios";

import { useTranslation } from "react-i18next";
import "../../i18n/idiomas/en.json";
import "../../i18n/idiomas/pt.json";

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
  const { t, i18n } = useTranslation();

  const [modalRank, setModalRank] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [mensagemDeErro, setMensagemDeErro] = useState("");

  const [idiomaAtivo, setIdiomaAtivo] = useState(true);

  useEffect(() => {
    if (mensagemDeErro) {
      const timer = setTimeout(() => {
        setMensagemDeErro("");
      }, 1500);

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
      .min(3, i18n.t("validacao_usuario_minimo"))
      .required(i18n.t("campo_obrigatorio")),
    senha: yup
      .string()
      .min(6, i18n.t("validacao_senha_minimo"))
      .required(i18n.t("campo_obrigatorio")),
    confirmSenha: yup
      .string()
      .oneOf([yup.ref("senha"), null], i18n.t("senhas_diferentes"))
      .min(6, i18n.t("minimo_6_caracteres_senha"))
      .required(i18n.t("campo_obrigatorio")),
  });

  const validationLogin = yup.object().shape({
    usuario: yup.string().required(i18n.t("campo_obrigatorio")),
    senha: yup.string().required(i18n.t("campo_obrigatorio")),
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
            setMensagemDeErro(i18n.t("usuario_cadastrado"));
          } else if (response.data.msg === "Cadastrado com sucesso!") {
            setSuccessMessage(i18n.t("cadastrado_com_sucesso"));
            setTimeout(() => {
              setLogin(true);
            }, 800);
          }
        });
    } else if (type === "Logar") {
      axios
        .post("http://localhost:5174/logar", {
          usuario: values.usuario,
          senha: values.senha,
        })
        .then((response) => {
          if (response.data.msg === "Conta não encontrada") {
            setMensagemDeErro(i18n.t("conta_nao_encontrada"));
          } else if (response.data.msg === "Usuário logado com sucesso") {
            sessionStorage.setItem("usuario", JSON.stringify(response.data));
            setWins(parseInt(response.data.vitorias));
            setDefeat(parseInt(response.data.derrotas));
            setID(parseInt(response.data.id));
            setSuccessMessage(i18n.t("logado_com_sucesso"));
            setTimeout(() => {
              handleStartGame();
            }, 1000);
          }
        });
    } else {
      console.log("Deu erro");
    }
  }

  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };
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
          <div className="modal__content--idiomas">
            <img
              style={{ width: "25px", cursor: "pointer" }}
              src="../../src/img/brasil.png"
              onClick={() => changeLanguage("pt")}
            />
            <img
              style={{ width: "25px", cursor: "pointer" }}
              src="../../src/img/usa.png"
              onClick={() => changeLanguage("en")}
            />
          </div>
          {modalRank && <Rank />}
          <h2>
            {t("insira_seus")}
            <p className="modal__content--nome">{t("dados")}</p>
          </h2>
          <p style={{ fontSize: "0.6em" }}>
            {t("para")} {login ? t("logar") : t("cadastrar")}
          </p>
          <Form
            // onSubmit={(e) => handleSubmit(e, login ? "Logar" : "Cadastrar")}
            className="modal__content__formulario"
          >
            <Field
              className="modal__content__formulario__player"
              type="text"
              placeholder={t("usuario")}
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
              placeholder={t("senha")}
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
                  placeholder={t("confirmar_senha")}
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
                  {t("esqueceu_sua_senha")}
                </p>
              )}
              <p
                onClick={() => setLogin(!login)}
                className="modal__content__formulario__cadastrarEResetarSenha--buttonText"
              >
                {login ? t("cadastrar") : t("logar")}
              </p>
            </div>
            <button
              type="submit"
              className="modal__content__formulario--buttonStart"
            >
              {login ? <FaPlay /> : t("cadastrar")}
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
