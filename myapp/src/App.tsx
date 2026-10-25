//Library Imports
import Papa from "papaparse"; //External library used for reading CSVs
import { useState, type FormEvent } from "react"; //State allows us to update UI when data changes
import "./App.css"; //Use our style file
//Web App's Default Page
import csvText from "./data_export_games_csv_comma.csv?raw";
import platformCsvText from "./data_export_game_platforms_csv_comma.csv?raw";


function App() {
  //Store the contents of the CSV
  let csvArray : any[] = Papa.parse(
    csvText,
    {header: true, skipEmptyLines: true}
  ).data;
  const platformRows = Papa.parse<PlatformRow>(
    platformCsvText,
    {header: true, skipEmptyLines: true}
  ).data;
  const platformsByGame = new Map<string, string[]>();
  platformRows.forEach((row) => {
    if (!row.game_identifier || !row.platform_identifier) {
      return;
    }

    const platforms = platformsByGame.get(row.game_identifier) ?? [];
    platforms.push(row.platform_identifier);
    platformsByGame.set(row.game_identifier, platforms);
  });

  //Fill the contents of the CSV into a table variable
  const games: Game[] = csvArray.map((row: Record<string, string>) => {
    const gameEntry = new Game();
    gameEntry.generation_id = row.generation_id ?? "";
    gameEntry.identifier = row.identifier ?? "";
    gameEntry.game_type = row.game_type ?? "";
    gameEntry.genre = row.genre ?? "";
    gameEntry.developer = row.developer ?? "";
    gameEntry.publisher = row.publisher ?? "";
    gameEntry.cancelled = row.cancelled ?? "";
    gameEntry.abandoned = row.abandoned ?? "";
    gameEntry.box_art_image_path = row.box_art_image_path ?? "";
    gameEntry.name = row.name ?? "";
    gameEntry.platforms = platformsByGame.get(gameEntry.identifier)?.join(", ") ?? "";
    return gameEntry;
  });

  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");

  function Display(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setSearchName(name.trim());
  }

  const visibleGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchName.toLowerCase())
  );

  //UI
  return (
    <form onSubmit={Display}>
      <div>
        <label htmlFor="name">Search games by name: </label>
        <input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <br />
      <div>
        <button type="submit">Search</button>
      </div>
      <br />
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Genre</th>
              <th>Developer</th>
              <th>Publisher</th>
              <th>Game Type</th>
              <th>Platforms</th>
            </tr>
          </thead>
          <tbody>
            {visibleGames.map((game) => (
              <tr key={game.generation_id}>
                <td>{game.name}</td>
                <td>{game.genre}</td>
                <td>{game.developer}</td>
                <td>{game.publisher}</td>
                <td>{game.game_type}</td>
                <td>{game.platforms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
}

export default App;

//generation_id,identifier,game_type,genre,developer,publisher,cancelled,abandoned,box_art_image_path,name

class Game {
  generation_id!: string;
  identifier!: string;
  game_type!: string;
  genre!: string;
  developer!: string;
  publisher!: string;
  cancelled!: string;
  abandoned!: string;
  box_art_image_path!: string;
  name!: string;
  platforms!: string;
}

type PlatformRow = {
  game_identifier?: string;
  platform_identifier?: string;
};