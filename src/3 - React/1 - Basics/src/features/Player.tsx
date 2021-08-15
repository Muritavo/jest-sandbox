import { Player as PlayerModel } from "../models/Player";

export default function Player({ player }: { player: PlayerModel }) {
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{player.id}</td>
              <td>{player.name}</td>
              {player.deck ? <td>Deck</td> : null}
            </tr>
          </tbody>
        </table>
      </>
    );
}