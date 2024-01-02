import { cards } from "./Data/cards";
import { Grid } from "./components/Grid";

export function App() {
  return (
    <div className="app">
      <Grid cards={cards} />
    </div>
  );
}
