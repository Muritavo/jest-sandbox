import { useEffect, useState } from "react";
import { Player as PlayerModel } from "../models/Player";
import Deck from "./Deck";
import Player from "./Player";

export default function Main({id}: {id: string}) {
    const [player, setPlayer] = useState<PlayerModel>();
    useEffect(() => {
        fetch('/player/' + id + '.json')
          .then((d) => d.json())
          .then((playerJSON: PlayerModel) => setPlayer(playerJSON));
    }, [id]);
    return (
      <>{!player ? <p>...Loading Player</p> : <Player player={player} />}
      {!player ? null : <Deck player={player} />}</>
    );
}