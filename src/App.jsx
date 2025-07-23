import { useState } from "react";
import "./App.css";

const zombies = [
  {
    id: 1,
    name: "Survivor",
    price: 12,
    strength: 6,
    agility: 4,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png",
  },
  {
    id: 2,
    name: "Scavenger",
    price: 10,
    strength: 5,
    agility: 5,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png",
  },
  {
    id: 3,
    name: "Shadow",
    price: 18,
    strength: 7,
    agility: 8,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png",
  },
  {
    id: 4,
    name: "Tracker",
    price: 14,
    strength: 7,
    agility: 6,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png",
  },
  {
    id: 5,
    name: "Sharpshooter",
    price: 20,
    strength: 6,
    agility: 8,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png",
  },
  {
    id: 6,
    name: "Medic",
    price: 15,
    strength: 5,
    agility: 7,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png",
  },
  {
    id: 7,
    name: "Engineer",
    price: 16,
    strength: 6,
    agility: 5,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png",
  },
  {
    id: 8,
    name: "Brawler",
    price: 11,
    strength: 8,
    agility: 3,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png",
  },
  {
    id: 9,
    name: "Infiltrator",
    price: 17,
    strength: 5,
    agility: 9,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png",
  },
  {
    id: 10,
    name: "Leader",
    price: 22,
    strength: 7,
    agility: 6,
    img: "https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png",
  },
];

const App = () => {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState(zombies);
  let totalStrength = 0;
  let totalAgility = 0;

  const Money = ({ amount }) => {
    return <h2>Wallet: ${amount}</h2>;
  };

  const ZombieFighters = (zombie) => {
    return (
      <li className="zombie-fighter">
        <img src={zombie.img} alt={zombie.name} />
        <div className="zombie-fighter-details">
          <h3>{zombie.name}</h3>
          <p>Price ${zombie.price}</p>
          <p>Strength {zombie.strength}</p>
          <p>Agility {zombie.agility}</p>
        </div>
        <button
          onClick={() => {
            handleAddFighter(zombie);
          }}>
          Add
        </button>
      </li>
    );
  };

  const ZombieTeam = (zombie) => {
    return (
      <li className="zombie-fighter">
        <img src={zombie.img} alt={zombie.name} />
        <div className="zombie-fighter-details">
          <h3>{zombie.name}</h3>
          <p>Price ${zombie.price}</p>
          <p>Strength {zombie.strength}</p>
          <p>Agility {zombie.agility}</p>
        </div>
        <button
          onClick={() => {
            handleRemoveFighter(zombie);
          }}>
          Remove
        </button>
      </li>
    );
  };

  const handleRemoveFighter = (zombie) => {
    const updatedTeam = team.filter((fighter) => fighter.id !== zombie.id);
    setTeam(updatedTeam);
    setZombieFighters([...zombieFighters, zombie]);
    setMoney(money + zombie.price);
  };

  const handleAddFighter = (zombie) => {
    const wallet = money - zombie.price;
    if (wallet < 0) return console.log("Not enough money to add this fighter.");
    setMoney(money - zombie.price);
    setTeam([...team, zombie]);
    const updatedZombies = zombieFighters.filter(
      (fighter) => fighter.name !== zombie.name
    );
    setZombieFighters(updatedZombies);
  };

  if (team.length > 0) {
    totalStrength = team.reduce(
      (total, fighter) => total + fighter.strength,
      0
    );
    totalAgility = team.reduce((total, fighter) => total + fighter.agility, 0);
  }

  return (
    <div id="app">
      <h1>Zombie Fighters</h1>
      <div>
        <Money amount={money} />
      </div>
      <div id="zombie-team-section">
        <h2>My Team ({team.length})</h2>
        <h3>Total Strength: {totalStrength}</h3>
        <h3>Total Agility: {totalAgility}</h3>
        <ul className="zombie-team">
          {team.length === 0 && <li>Select a fighter to add to your team.</li>}
          {team.map((zombie) => (
            <ZombieTeam key={zombie.id} {...zombie} />
          ))}
        </ul>
      </div>
      <h2>Select Fighters</h2>
      <ul>
        {zombieFighters.map((zombie) => (
          <ZombieFighters key={zombie.id} {...zombie} />
        ))}
      </ul>
    </div>
  );
};

export default App;
