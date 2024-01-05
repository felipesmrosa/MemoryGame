import ConfettiExplosion from "react-confetti-explosion";
import { GiQueenCrown } from "react-icons/gi";

export function WinnerModal({ winMessage, timeLeft, handleReset }: any) {
  return (
    <>
      {winMessage && (
        <div className="modal">
          <div className="modal__content">
            <GiQueenCrown
              onClick={openModalRank}
              className="modal__content--crown"
            />
            {modalRank && <Rank />}
            <h3 style={{ color: "#4646de" }}>Parabéns!</h3>
            <p>Você ganhou,</p>
            <p style={{ textTransform: "capitalize" }}>
              Em apenas {timeLeft}s!
            </p>
            <button className="win__message--btn" onClick={handleReset}>
              Jogar Novamente
            </button>
          </div>
          <ConfettiExplosion className="win__message--confeti" />
        </div>
      )}
    </>
  );
}
