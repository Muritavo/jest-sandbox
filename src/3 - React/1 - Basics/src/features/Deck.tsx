import { useEffect, useState } from "react";
import { Card } from "../models/Card";
import { Player } from "../models/Player";

export default function Deck({player}: {player: Player}) {
    const [deck, setDeck] = useState<Card[]>();

    useEffect(() => {
        if (!deck)
          fetch(`/player/${player.id}/deck.json`)
            .then((r) => r.json())
            .then((cards: Card[]) => setDeck(cards));
    }, [deck, player]);

    return (
      <>
        {deck === undefined ? (
          <p>...Loading</p>
        ) : (
          <div>{deck.map((card) => <p key={card.name}>Card: <span>{card.name}</span></p>)}</div>
        )}
      </>
    );
}