import { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { GiQueenCrown } from "react-icons/gi";
import { Rank } from "../Rank";
import { t } from "i18next";

export function WinnerModal({
  winMessage,
  timeLeft,
  handleReset,
  openRank,
}: any) {
  const [rank, setRank] = useState(false);

  function handleOpenModal() {
    setRank(!rank);
  }
  return (
    <>
      {winMessage && (
        <div className="modal">
          <div className="modal__content">
            <GiQueenCrown
              onClick={handleOpenModal}
              className="modal__content--crown"
            />
            {rank && <Rank />}
            <h3 style={{ color: "#4646de" }}>{t("parabens")}</h3>
            <p>{t("voce_ganhou")}</p>
            <p style={{ textTransform: "capitalize" }}>
              {t("em_apenas")} {timeLeft}s!
            </p>
            <button className="win__message--btn" onClick={handleReset}>
              {t("jogar_novamente")}
            </button>
          </div>
          <ConfettiExplosion className="win__message--confeti" />
        </div>
      )}
    </>
  );
}
