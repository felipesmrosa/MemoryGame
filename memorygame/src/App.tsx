import { Card } from "./components/Card";

const handleClick = (id: string) => {
  console.log(id);
};

export function App() {
  return (
    <div className="app">
      <Card back="💢" flipped id="1" handleClick={handleClick} />
      <Card back="💢" flipped id="2" handleClick={handleClick} />
      <Card back="💢" flipped id="3" handleClick={handleClick} />
    </div>
  );
}
