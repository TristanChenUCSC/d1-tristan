import "./style.css";

document.body.innerHTML = `
`;

// Create Button
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

// Upgrades
const upgrade1 = document.createElement("button");
upgrade1.textContent = "Scrolling Thumb";
document.body.append(upgrade1);
upgrade1.disabled = true;
let upgrade1amount = 0;
let upgrade1cost = 10;
const upgrade1status = document.createElement("div");
upgrade1status.textContent =
  `Amount purchased: ${upgrade1amount} Cost: ${upgrade1cost} dopamine, +0.1 dopamine/second`;
document.body.append(upgrade1status);

const upgrade2 = document.createElement("button");
upgrade2.textContent = "Repost Bot";
document.body.append(upgrade2);
upgrade2.disabled = true;
let upgrade2amount = 0;
let upgrade2cost = 100;
const upgrade2status = document.createElement("div");
upgrade2status.textContent =
  `Amount purchased: ${upgrade2amount} Cost: ${upgrade2cost} dopamine, +2 dopamine/second`;
document.body.append(upgrade2status);

const upgrade3 = document.createElement("button");
upgrade3.textContent = "Brainrot Engine";
document.body.append(upgrade3);
upgrade3.disabled = true;
let upgrade3amount = 0;
let upgrade3cost = 1000;
const upgrade3status = document.createElement("div");
upgrade3status.textContent =
  `Amount purchased: ${upgrade3amount} Cost: ${upgrade3cost} dopamine, +50 dopamine/second`;
document.body.append(upgrade3status);

// Continuous growth logic for autoclicking + running game
let growthRate: number = 0;
let last_timestamp: number | null = null;

const growthDisplay = document.createElement("div"); // Display growth rate
growthDisplay.textContent = `${growthRate} dopamine/second`;
document.body.insertBefore(growthDisplay, upgrade1);

function step(timestamp: number) {
  if (last_timestamp !== null) {
    const delta: number = timestamp - last_timestamp;
    const increment: number = delta / 1000;
    counter += increment * growthRate;
    counterElement.textContent = `${counter.toFixed(0)} Dopamine`;

    // Status updates
    growthDisplay.textContent = `${growthRate.toFixed(1)} dopamine/second`;
    upgrade1status.textContent = `Amount purchased: ${upgrade1amount} Cost: ${
      upgrade1cost.toFixed(2)
    } dopamine, +0.1 dopamine/second`;
    upgrade2status.textContent = `Amount purchased: ${upgrade2amount} Cost: ${
      upgrade2cost.toFixed(2)
    } dopamine, +2 dopamine/second`;
    upgrade3status.textContent = `Amount purchased: ${upgrade3amount} Cost: ${
      upgrade3cost.toFixed(2)
    } dopamine, +50 dopamine/second`;

    // Unlock upgrade1
    if (counter >= upgrade1cost) {
      upgrade1.disabled = false;
    } else {
      upgrade1.disabled = true;
    }

    // Unlock upgrade2
    if (counter >= upgrade2cost) {
      upgrade2.disabled = false;
    } else {
      upgrade2.disabled = true;
    }

    // Unlock upgrade3
    if (counter >= upgrade3cost) {
      upgrade3.disabled = false;
    } else {
      upgrade3.disabled = true;
    }
  }
  last_timestamp = timestamp;
  requestAnimationFrame(step);
}
requestAnimationFrame(step);

// Upgrade logic
upgrade1.addEventListener("click", () => {
  counter -= upgrade1cost;
  growthRate += 0.1; // Increase growth rate by 0.1 dopamine per second
  upgrade1amount++;
  upgrade1cost *= 1.15; // Increase cost by 15%
  counterElement.textContent = `${counter} Dopamine`;
});

upgrade2.addEventListener("click", () => {
  counter -= upgrade2cost;
  growthRate += 2; // Increase growth rate by 2 dopamine per second
  upgrade2amount++;
  upgrade2cost *= 1.15; // Increase cost by 15%
  counterElement.textContent = `${counter} Dopamine`;
});

upgrade3.addEventListener("click", () => {
  counter -= upgrade3cost;
  growthRate += 50; // Increase growth rate by 50 dopamine per second
  upgrade3amount++;
  upgrade3cost *= 1.15; // Increase cost by 15%
  counterElement.textContent = `${counter} Dopamine`;
});
