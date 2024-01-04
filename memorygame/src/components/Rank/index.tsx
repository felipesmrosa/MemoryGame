import { IoStar } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";

export function Rank() {
  const [player, setPlayers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5174/getplayers").then((response) => {
      setPlayers(response.data);
    });
  }, []);

  console.log(player);

  return (
    <div className="rank">
      <h3>
        Top <p>players</p>
      </h3>
      <hr />
      <ol className="rank__lista">
        {player.map((play) => {
          return (
            <li className="rank__lista__player">
              <div className="rank__lista__player--primeiroLugar">
                <p className="rank__lista__player--primeiroLugar-alinhado">
                  {play.usuario} <IoStar />
                </p>
                <p>{play.tempo}s</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
