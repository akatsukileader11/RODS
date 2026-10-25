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
  const [visibleGames, setVisibleGames] = useState(games);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  const gameNames = [...new Set(games.map((game) => game.name).filter(Boolean))]
    .sort((first, second) => first.localeCompare(second, undefined, { sensitivity: "base" }));
  const matchingNames = gameNames.filter((gameName) =>
    gameName.toLowerCase().includes(name.trim().toLowerCase())
  );

  function Display(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const searchTerms = name.toLowerCase().match(/[a-z0-9]+/g) ?? [];
    setVisibleGames(
      games.filter((game) => {
        const gameNameWords = new Set(game.name.toLowerCase().match(/[a-z0-9]+/g) ?? []);
        return searchTerms.every((term) => gameNameWords.has(term));
      })
    );
    setSuggestionsOpen(false);
  }

  //UI
  return (
    <form onSubmit={Display}>
      <div>
        <label htmlFor="name">Search games by name: </label>
        <div className="search-input-container">
          <input
            id="name"
            value={name}
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls="game-name-suggestions"
            aria-expanded={suggestionsOpen}
            onFocus={() => setSuggestionsOpen(true)}
            onChange={(event) => {
              setName(event.target.value);
              setSuggestionsOpen(true);
            }}
            onBlur={() => setSuggestionsOpen(false)}
          />
          {suggestionsOpen && (
            <div id="game-name-suggestions" className="suggestion-list" role="listbox">
              {matchingNames.length > 0 ? (
                matchingNames.map((gameName) => (
                  <button
                    key={gameName}
                    type="button"
                    className="suggestion-option"
                    role="option"
                    aria-selected={false}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      setName(gameName);
                      setSuggestionsOpen(false);
                    }}
                  >
                    {gameName}
                  </button>
                ))
              ) : (
                <div className="no-suggestions">No matching games</div>
              )}
            </div>
          )}
        </div>
      </div>
      <br />
      <div>
        <button className="search-submit" type="submit">Search</button>
      </div>
      <br />
      <div className="table-container">
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
            {visibleGames.length > 0 ? (
              visibleGames.map((game) => (
                <tr key={game.identifier}>
                  <td>{game.name}</td>
                  <td>{game.genre}</td>
                  <td>{game.developer}</td>
                  <td>{game.publisher}</td>
                  <td>{game.game_type}</td>
                  <td>{game.platforms}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No games found.</td>
              </tr>
            )}
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