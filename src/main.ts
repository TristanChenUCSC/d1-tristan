import "./style.css";

// === Type Definitions ===

// Define item structure for data-driven design
interface Item {
  name: string;
  cost: number;
  rate: number;
  amount: number;
  description: string;
  button?: HTMLButtonElement;
  status?: HTMLDivElement;
}

// === Game State ===
let growthRate: number = 0;
let counter: number = 0;

const availableItems: Item[] = [
  {
    name: "👍 Scrolling Thumb (+0.1/sec)",
    cost: 10,
    rate: 0.1,
    amount: 0,
    description: "A thumb that endlessly scrolls through short form content.",
  },
  {
    name: "♻️ Repost Bot (+2/sec)",
    cost: 100,
    rate: 2,
    amount: 0,
    description: "A bot that reposts memes for more dopamine.",
  },
  {
    name: "⚙️ Brainrot Engine (+50/sec)",
    cost: 1000,
    rate: 50,
    amount: 0,
    description: "AI model curating the most brain-melting content possible.",
  },
  {
    name: "🤖 AI Slop Generator (+1500/sec)",
    cost: 10000,
    rate: 1500,
    amount: 0,
    description: "You want more slop? You'll GET more slop.",
  },
  {
    name: "🧪 Dopamine Farm (+35000/sec)",
    cost: 100000,
    rate: 35000,
    amount: 0,
    description: "Neural farm that extracts raw attention energy.",
  },
];

// === DOM Initialization ===

// Main container
const gameContainer = document.createElement("div");
gameContainer.className = "game-container";
document.body.append(gameContainer);

// Left side (clicker panel)
const clickerPanel = document.createElement("div");
clickerPanel.className = "clicker-panel";
gameContainer.append(clickerPanel);

// Title
const title = document.createElement("h1");
title.textContent = "Brainrot Clicker";
title.classList.add("game-title");
clickerPanel.append(title);

// Counter
const counterElement = document.createElement("div");
counterElement.className = "counter";
counterElement.textContent = "0 Dopamine";
clickerPanel.append(counterElement);

// Growth rate display
const growthDisplay = document.createElement("div");
growthDisplay.className = "growth-rate";
growthDisplay.textContent = `${growthRate.toFixed(1)} dopamine/second`;
clickerPanel.append(growthDisplay);

// Main button
const button = document.createElement("button");
button.id = "brainButton";
button.textContent = "🧠";
clickerPanel.append(button);

// Right side (shop panel)
const shopPanel = document.createElement("div");
shopPanel.className = "shop-panel";
gameContainer.append(shopPanel);

const shopTitle = document.createElement("h2");
shopTitle.textContent = "Brainrot Advancements";
shopPanel.append(shopTitle);

// Create item buttons, descriptions, and status displays
for (const item of availableItems) {
  const shopItem = document.createElement("div");
  shopItem.className = "shop-item";

  const infoDiv = document.createElement("div");
  const nameEl = document.createElement("strong");
  nameEl.textContent = item.name;

  const descEl = document.createElement("p");
  descEl.textContent = item.description;

  const statusEl = document.createElement("p");
  statusEl.textContent = `Owned: ${item.amount}      Cost: ${
    item.cost.toFixed(2)
  }`;

  infoDiv.append(nameEl, descEl, statusEl);
  shopItem.append(infoDiv);

  const buyButton = document.createElement("button");
  buyButton.textContent = "Buy";
  buyButton.disabled = true;
  shopItem.append(buyButton);

  item.button = buyButton;
  item.status = statusEl;
  shopPanel.append(shopItem);
}

// === Event Listeners and Game Loop ===

// Main button logic to increase counter
button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = `${counter} Dopamine`;
});

// Button logic for each item
for (const item of availableItems) {
  if (item.button) {
    item.button.addEventListener("click", () => {
      if (counter >= item.cost) {
        counter -= item.cost;
        growthRate += item.rate;
        item.amount++;
        item.cost *= 1.15; // Increase cost by 15%
        counterElement.textContent = `${counter.toFixed(0)} Dopamine`;
      }
    });
  }
}

// Continuous growth logic for autoclicking + game loop
let lastTimestamp: number | null = null;

function step(timestamp: number) {
  if (lastTimestamp !== null) {
    const delta: number = timestamp - lastTimestamp;
    const increment: number = delta / 1000;
    counter += increment * growthRate;
    counterElement.textContent = `${counter.toFixed(1)} Dopamine`;

    // Status updates
    growthDisplay.textContent = `${growthRate.toFixed(1)} dopamine/second`;
    for (const item of availableItems) {
      if (item.status) {
        item.status.textContent = `Owned: ${item.amount}      Cost: ${
          item.cost.toFixed(2)
        }`;
      }
    }

    // Enable buttons if affordable
    for (const item of availableItems) {
      if (item.button) {
        if (counter >= item.cost) {
          item.button.disabled = false;
        } else {
          item.button.disabled = true;
        }
      }
    }
  }
  lastTimestamp = timestamp;
  requestAnimationFrame(step);
}
requestAnimationFrame(step);
