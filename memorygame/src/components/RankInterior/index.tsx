import axios from "axios";
import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";

export function RankInterior() {
  const [listPlayers, setListPlayers] = useState([]);

  console.log(listPlayers);

  useEffect(() => {
    axios.get("http://localhost:5174/getInfos").then((response) => {
      setListPlayers(response.data);
    });
  }, []);
  return (
    <div className="ranki">
      <h3>
        Top <p style={{color: '#a7a7a7'}}>players</p>
      </h3>
      <hr />
      <ol className="ranki__lista">
        {listPlayers.map((player) => {
          return (
            <li className="ranki__lista__player">
              <div className="ranki__lista__player--primeiroLugar">
                <p className="ranki__lista__player--primeiroLugar-alinhado">
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
