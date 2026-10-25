//Library Imports
import Papa from "papaparse"; //External library used for reading CSVs
import { useState, type FormEvent } from "react"; //State allows us to update UI when data changes
import "./App.css"; //Use our style file
//Web App's Default Page
import gameDexLogo from "./gamedex_pokeball_logo.svg";
import csvText from "./data_export_games_csv_comma.csv?raw";
import platformCsvText from "./data_export_game_platforms_csv_comma.csv?raw";
import gameImagesCsvText from "./gamedex_games_with_images.csv?raw";


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
  const gameImageRows = Papa.parse<GameImageRow>(
    gameImagesCsvText,
    {header: true, skipEmptyLines: true}
  ).data;
  const imageUrlsByGame = new Map(
    gameImageRows
      .filter((row) => row.identifier && row.box_art_image_url)
      .map((row) => [row.identifier!, row.box_art_image_url!])
  );
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
    gameEntry.boxArtImageUrl = imageUrlsByGame.get(gameEntry.identifier) ?? "";
    return gameEntry;
  });

  const [searchType, setSearchType] = useState<"name" | "genre">("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleGames, setVisibleGames] = useState(games);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const gameNames = [...new Set(games.map((game) => game.name).filter(Boolean))]
    .sort((first, second) => first.localeCompare(second, undefined, { sensitivity: "base" }));
  const genres = [...new Set(games.map((game) => game.genre).filter(Boolean))]
    .sort((first, second) => first.localeCompare(second, undefined, { sensitivity: "base" }));
  const suggestions = (searchType === "name" ? gameNames : genres).filter((value) =>
    value.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  function Display(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (searchType === "genre") {
      const genreQuery = searchQuery.trim().toLowerCase();
      setVisibleGames(
        games
          .filter((game) => game.genre.toLowerCase().includes(genreQuery))
          .sort((first, second) =>
            first.genre.localeCompare(second.genre, undefined, { sensitivity: "base" }) ||
            first.name.localeCompare(second.name, undefined, { sensitivity: "base" })
          )
      );
    } else {
      const searchTerms = searchQuery.toLowerCase().match(/[a-z0-9]+/g) ?? [];
      setVisibleGames(
        games.filter((game) => {
          const gameNameWords = new Set(game.name.toLowerCase().match(/[a-z0-9]+/g) ?? []);
          return searchTerms.every((term) => gameNameWords.has(term));
        }).sort((first, second) =>
          first.name.localeCompare(second.name, undefined, { sensitivity: "base" })
        )
      );
    }
    setSuggestionsOpen(false);
    setSearchSubmitted(true);
  }

  function clearSubmittedSearch(): void {
    if (searchSubmitted) {
      setSearchQuery("");
      setSearchSubmitted(false);
    }
    setSuggestionsOpen(true);
  }

  //UI
  return (
    <form onSubmit={Display}>
      <img className="app-logo" src={gameDexLogo} alt="GameDex logo" />
      <div className="search-controls">
        <div>
          <label htmlFor="search-type">Search games by: </label>
          <select
            id="search-type"
            value={searchType}
            onChange={(event) => {
              setSearchType(event.target.value === "genre" ? "genre" : "name");
              setSearchQuery("");
              setSearchSubmitted(false);
              setSuggestionsOpen(false);
            }}
          >
            <option value="name">Name</option>
            <option value="genre">Genre</option>
          </select>
          <label htmlFor="search-query">
            {searchType === "name" ? "Game name: " : "Genre: "}
          </label>
          <div className="search-input-container">
            <input
              id="search-query"
              value={searchQuery}
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls="search-suggestions"
              aria-expanded={suggestionsOpen}
              onFocus={clearSubmittedSearch}
              onClick={clearSubmittedSearch}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setSuggestionsOpen(true);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.nativeEvent.isComposing) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              onBlur={() => setSuggestionsOpen(false)}
            />
            {suggestionsOpen && (
              <div id="search-suggestions" className="suggestion-list" role="listbox">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      className="suggestion-option"
                      role="option"
                      aria-selected={false}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setSuggestionsOpen(false);
                      }}
                    >
                      {suggestion}
                    </button>
                  ))
                ) : (
                  <div className="no-suggestions">
                    No matching {searchType === "name" ? "games" : "genres"}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="search-button-container">
            <button className="search-submit" type="submit">Search</button>
          </div>
        </div>
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
                  <td>
                    {game.boxArtImageUrl && (
                      <img
                        className="game-box-art"
                        src={game.boxArtImageUrl}
                        alt={`${game.name} box art`}
                        loading="lazy"
                      />
                    )}
                    {game.name}
                  </td>
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
  boxArtImageUrl!: string;
}

type PlatformRow = {
  game_identifier?: string;
  platform_identifier?: string;
};

type GameImageRow = {
  identifier?: string;
  box_art_image_url?: string;
};