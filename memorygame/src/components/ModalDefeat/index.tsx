export function DefeatModal({ loseMessage, handleReset }: any) {
  return (
    <>
      {loseMessage && (
        <div className="modal">
          <div className="modal__content">
            <h3 style={{ color: "#4646de" }}>Que pena...</h3>
            <p>Você perdeu!</p>
            <button className="win__message--btn" onClick={handleReset}>
              Jogar Novamente
            </button>
          </div>
        </div>
      )}
    </>
  );
}
