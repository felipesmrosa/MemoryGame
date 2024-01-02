import ConfettiExplosion from "react-confetti-explosion";

export function WinnerModal({ winMessage, timeLeft, handleReset }: any) {
  return (
    <>
      {winMessage && (
        <div className="modal">
          <div className="modal__content">
            <h3 style={{ color: "#4646de" }}>Parabéns!</h3>
            <p>Você ganhou,</p>
            <p style={{ textTransform: "capitalize" }}>Faltando {timeLeft}s!</p>
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
