import { useTranslation } from "react-i18next";

export function DefeatModal({ loseMessage, handleReset }: any) {
  const { t, i18n } = useTranslation();
  return (
    <>
      {loseMessage && (
        <div className="modal">
          <div className="modal__content">
            <h3 style={{ color: "#4646de" }}>{t("que_pena")}</h3>
            <p>{t("voce_perdeu")}</p>
            <button className="win__message--btn" onClick={handleReset}>
              {t("jogar_novamente")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
