import "./style.css";

document.body.innerHTML = `
`;

// Define item structure for data-driven design
interface Item {
  name: string;
  cost: number;
  rate: number;
  amount: number;
  button?: HTMLButtonElement;
  status?: HTMLDivElement;
}

const availableItems: Item[] = [
  { name: "Scrolling Thumb", cost: 10, rate: 0.1, amount: 0 },
  { name: "Repost Bot", cost: 100, rate: 2, amount: 0 },
  { name: "Brainrot Engine", cost: 1000, rate: 50, amount: 0 },
];

// Create Main Button
const button = document.createElement("button");
button.textContent = "🧠";
document.body.append(button);

// Create counter element
const counterElement = document.createElement("div");
counterElement.textContent = "0 Dopamine";
document.body.append(counterElement);

// Counter logic
let counter: number = 0;
button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = `${counter} Dopamine`;
});

// Growth rate display
let growthRate: number = 0;
const growthDisplay = document.createElement("div");
growthDisplay.textContent = `${growthRate.toFixed(1)} dopamine/second`;
document.body.append(growthDisplay);

// Create item buttons and status displays
for (const item of availableItems) {
  const itemButton = document.createElement("button");
  itemButton.textContent = item.name;
  document.body.append(itemButton);
  itemButton.disabled = true;

  const itemStatus = document.createElement("div");
  itemStatus.textContent =
    `Amount purchased: ${item.amount} Cost: ${item.cost} dopamine, +${item.rate} dopamine/second`;
  document.body.append(itemStatus);

  item.button = itemButton;
  item.status = itemStatus;
}

// Continuous growth logic for autoclicking + running game
let last_timestamp: number | null = null;

function step(timestamp: number) {
  if (last_timestamp !== null) {
    const delta: number = timestamp - last_timestamp;
    const increment: number = delta / 1000;
    counter += increment * growthRate;
    counterElement.textContent = `${counter.toFixed(0)} Dopamine`;

    // Status updates
    growthDisplay.textContent = `${growthRate.toFixed(1)} dopamine/second`;
    for (const item of availableItems) {
      if (item.status) {
        item.status.textContent = `Amount purchased: ${item.amount} Cost: ${
          item.cost.toFixed(2)
        } dopamine, +${item.rate} dopamine/second`;
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
  last_timestamp = timestamp;
  requestAnimationFrame(step);
}
requestAnimationFrame(step);

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
