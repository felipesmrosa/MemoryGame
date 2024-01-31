import { IoStar } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiMiniTrophy } from "react-icons/hi2";
import { MdAccessTimeFilled } from "react-icons/md";
import { useTranslation } from "react-i18next";

export function Rank() {
  const [player, setPlayers] = useState([]);
  const [activeOption, setActiveOption] = useState("menosTempo");

  const { t, i18n } = useTranslation();

  function ranking() {
    const isByLessTime = activeOption === "menosTempo";

    return (
      <ol className="rank__lista">
        {player
          .slice()
          .sort((a, b) =>
            isByLessTime ? a.tempo - b.tempo : b.vitorias - a.vitorias
          )
          .map((play, index) => (
            <li className="rank__lista__player" key={index}>
              <div className="rank__lista__player--primeiroLugar">
                <p className="rank__lista__player--primeiroLugar-alinhado">
                  {play.usuario} <IoStar />
                </p>
                {isByLessTime ? (
                  <p className="row">
                    {play.tempo} <p className="tempo">s</p>
                  </p>
                ) : (
                  <p className="row">
                    {play.vitorias} <p className="wins">wins</p>
                  </p>
                )}
              </div>
            </li>
          ))}
      </ol>
    );
  }

  useEffect(() => {
    axios.get("http://localhost:5174/getplayers").then((response) => {
      setPlayers(response.data);
    });
  }, []);

  return (
    <div className="rank">
      <h3>
        Top <p>players</p>
      </h3>
      <hr className="rank-linha" />
      <div className="rank__menu">
        <p
          className={activeOption === "menosTempo" ? "rank__menu--active" : ""}
          onClick={() => setActiveOption("menosTempo")}
        >
          {t("menos_tempo")}
          <MdAccessTimeFilled />
        </p>
        <p
          className={
            activeOption === "maisVitorias" ? "rank__menu--active" : ""
          }
          onClick={() => setActiveOption("maisVitorias")}
        >
          {t("mais_vitorias")} <HiMiniTrophy />
        </p>
      </div>
      {ranking()}
    </div>
  );
}
