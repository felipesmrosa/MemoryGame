import { IoStar } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";

export function Rank() {
  const [listPlayers, setListPlayers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5174/getInfos").then((response) => {
      setListPlayers(response.data);
    });
  }, []);

  return (
    <div className="rank">
      <h3>
        Top <p>players</p>
      </h3>
      <hr />
      <ol className="rank__lista">
        {listPlayers.map((player) => {
          return (
            <li className="rank__lista__player">
              <div className="rank__lista__player--primeiroLugar">
                <p className="rank__lista__player--primeiroLugar-alinhado">
                  {player.name} <IoStar />
                </p>
                <p>50s</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
