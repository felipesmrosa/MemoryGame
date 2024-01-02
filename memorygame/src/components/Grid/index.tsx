import { useEffect, useRef, useState } from "react";
import { Card, CardProps } from "../Card";
import { duplicateRegenerateSortArray } from "../../utills/card-utils";
import { Tooltip } from "react-tooltip";
import { Modal } from "../Modal";

import { GiCardJoker, GiQueenCrown } from "react-icons/gi";
import { Rank } from "../Rank";

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
      setLoseMessage(true);
      setDefeat((prevDefeat) => prevDefeat + 1);
    }

    return () => clearTimeout(timer);
  }, [timeLeft, timerRunning]);

  useEffect(() => {
    if (matches === 8) {
      setWins((prevWins) => prevWins + 1);
      setWinMessage(true);
      setTimerRunning(false); // Parar o timer quando o jogador ganha
    } else {
      setWinMessage(false);
    }
  }, [matches]);

  function checkWinCondition() {
    if (matches === 8) {
      setWins((prevWins) => prevWins + 1);
      setWinMessage(true);
      setTimerRunning(false); // Parar o timer quando o jogador ganha
    }
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
    checkWinCondition();
  }

  return (
    <>
      {/* {ranking && <Rank />} */}
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
      />

      <div className="text">
        <h1>
          Memory <p>Game</p> <GiCardJoker className="text--joker" />
        </h1>
        <p className="text--dflex">
          <p>
            Vitórias: {wins} | Derrotas: {defeat}
          </p>
          <p>
            Movimentos: {moves} | Acertos: {matches}
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
                color: "##a7a7a7",
              }}
              id="tempoDoDesafio"
            />
          </div>
        </p>
        <GiQueenCrown onClick={openRank} className="text--crown" />
      </div>
      <div className="grid">
        {stateCards.map((card) => (
          <Card {...card} key={card.id} handleClick={handleClick} />
        ))}
      </div>
    </>
  );
}
