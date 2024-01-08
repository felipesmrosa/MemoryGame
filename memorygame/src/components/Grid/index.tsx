import { useEffect, useRef, useState } from "react";
import { Card, CardProps } from "../Card";
import { duplicateRegenerateSortArray } from "../../utills/card-utils";
import { Tooltip } from "react-tooltip";
import { Modal } from "../Modal";

import { GiCardJoker } from "react-icons/gi";
import { RxExit } from "react-icons/rx";
import axios from "axios";

export interface GridProps {
  cards: CardProps[];
}

export function Grid({ cards }: GridProps) {
  const [stateCards, setStateCards] = useState(() => {
    return duplicateRegenerateSortArray(cards);
  });
  const first = useRef<CardProps | null>(null);
  const second = useRef<CardProps | null>(null);
  const unflip = useRef(false);
  const [startGame, setStartGame] = useState(true);
  const [player, setPlayer] = useState("");
  const [winMessage, setWinMessage] = useState(false);
  const [loseMessage, setLoseMessage] = useState(false);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [wins, setWins] = useState(0);
  const [defeat, setDefeat] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 segundos = 1 minuto
  const [timerRunning, setTimerRunning] = useState(false);
  const [ranking, setRanking] = useState(false);
  const [ID, setID] = useState(0);
  const [login, setLogin] = useState(true);

  function exitButton() {
    setStartGame(true);
    setTimerRunning(false); // Parar o timer
    sessionStorage.clear();
  }

  useEffect(() => {
    function atualizarVitorias() {
      const usuarioString = sessionStorage.getItem("usuario");
      if (usuarioString) {
        const usuario = JSON.parse(usuarioString);
        setWins(usuario.vitorias);
      }
    }
    atualizarVitorias();
    window.onstorage = atualizarVitorias;

    return () => {
      window.onstorage = null;
    };
  }, []);

  function openRank() {
    setRanking(!ranking);
  }

  function handleReset() {
    setStateCards(duplicateRegenerateSortArray(cards));
    first.current = null;
    second.current = null;
    unflip.current = false;
    setMatches(0);
    setMoves(0);
    setLoseMessage(false);
    setTimeLeft(60);
    setTimerRunning(true); // Reiniciar o timer ao resetar o jogo
  }

  function handleStartGame() {
    setStartGame(false);
    setTimerRunning(true); // Inicia o timer ao clicar em Start
  }

  useEffect(() => {
    let timer: any;

    if (timerRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      axios
        .put(`http://localhost:5174/atualizarDerrota/${ID}`)
        .then((response) => {
          console.log(response.data); // Mensagem de sucesso ou erro
          setLoseMessage(true);
          setDefeat((prevDefeat) => prevDefeat + 1);
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }

    return () => clearTimeout(timer);
  }, [timeLeft, timerRunning]);

  useEffect(() => {
    if (matches === 8) {
      setWinMessage(true);
      setTimerRunning(false); // Parar o timer quando o jogador ganha
      checkWinCondition();
    } else {
      setWinMessage(false);
    }
  }, [matches]);

  const tempoInicial = 60; // Seu valor inicial
  const tempoRestante = timeLeft; // Seu valor de tempo restante

  const tempoGasto = tempoInicial - tempoRestante; // Cálculo do tempo gasto

  function checkWinCondition() {
    // console.log(matches);
    axios
      .put(`http://localhost:5174/atualizarVitoria/${ID}`, {
        timeLeft: tempoGasto,
      })
      .then((response) => {
        console.log(response.data); // Mensagem de sucesso ou erro
        setWins((prevWins) => prevWins + 1);
        setWinMessage(true);
        setTimerRunning(false); // Parar o timer quando o jogador ganha
        setTimeLeft(tempoGasto);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }

  function handleClick(id: string) {
    const newStateCards = stateCards.map((card) => {
      if (card.id !== id) return card;

      if (card.flipped) return card;

      if (unflip.current && first.current && second.current) {
        first.current.flipped = false;
        second.current.flipped = false;
        first.current = null;
        second.current = null;
        unflip.current = false;
      }

      card.flipped = true;

      if (first.current === null) {
        first.current = card;
      } else if (second.current === null) {
        second.current = card;
      }

      // Se tiver 2 cartões virados eu verifico se estão corretos
      if (first.current && second.current) {
        if (first.current.back === second.current.back) {
          //Acertou
          first.current = null;
          second.current = null;
          setMatches((m) => m + 1);
        } else {
          //Errou
          unflip.current = true;
        }

        setMoves((m) => m + 1);
      }

      return card;
    });
    setStateCards(newStateCards);
  }

  return (
    <>
      <Modal
        openRank={openRank}
        startGame={startGame}
        player={player}
        setPlayer={setPlayer}
        handleStartGame={handleStartGame}
        winMessage={winMessage}
        timeLeft={timeLeft}
        handleReset={handleReset}
        loseMessage={loseMessage}
        setWins={setWins}
        setDefeat={setDefeat}
        setID={setID}
        exitButton={exitButton}
        login={login}
        setLogin={setLogin}
      />

      <div className="text">
        <div style={{ cursor: "pointer" }} className="text--GG">
          <p>G</p>
          <p className="text--GG-g">G</p>
          <RxExit onClick={exitButton} className="text--GG-exit" />
        </div>
        <h1>
          Memory <p style={{ color: "#a7a7a7" }}>Game</p>
          <GiCardJoker className="text--joker" />
        </h1>
        <div className="row-space">
          <p className="text--dflex">
            <p>
              Vitórias: {wins} | Derrotas: {defeat}
            </p>
            <p>
              Movimentos: {moves} | Acertos: {matches}
            </p>
          </p>
          <div className="pixelated-clock">
            <p
              id="seconds"
              data-tooltip-id="tempoDoDesafio"
              data-tooltip-content="Você deve completar o desafio antes do tempo acabar."
            >
              {timeLeft}s
            </p>
            <Tooltip
              style={{
                fontSize: "16px",
                backgroundColor: "#4646de",
                color: "#a7a7a7",
              }}
              id="tempoDoDesafio"
            />
          </div>
        </div>
      </div>
      <div className="grid">
        {stateCards.map((card) => (
          <Card {...card} key={card.id} handleClick={handleClick} />
        ))}
      </div>
    </>
  );
}
