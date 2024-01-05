import { IoStar } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";
import { HiMiniTrophy } from "react-icons/hi2";
import { MdAccessTimeFilled } from "react-icons/md";

export function Rank() {
  const [player, setPlayers] = useState([]);
  const [activeOption, setActiveOption] = useState("menosTempo");

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
                <p className="row">
                  {isByLessTime ? play.tempo : play.vitorias}s
                </p>
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
          Menos tempo
          <MdAccessTimeFilled />
        </p>
        <p
          className={
            activeOption === "maisVitorias" ? "rank__menu--active" : ""
          }
          onClick={() => setActiveOption("maisVitorias")}
        >
          Mais vitórias <HiMiniTrophy />
        </p>
      </div>
      {ranking()}
    </div>
  );
}
