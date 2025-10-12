import "./style.css";

document.body.innerHTML = `
`;

// Create Button
const button = document.createElement("button");
button.textContent = "🧠";
document.body.append(button);

// Create counter element
const counterElement = document.createElement("div");
counterElement.textContent = "0 Brain Nourishment Points";
document.body.append(counterElement);

// Counter logic
let counter: number = 0;
button.addEventListener("click", () => {
  counter++;
  counterElement.textContent = `${counter} Brain Nourishment Points`;
});

// Upgrades
const upgrade1 = document.createElement("button");
upgrade1.textContent = "A";
document.body.append(upgrade1);
upgrade1.disabled = true;
let upgrade1amount = 0;
const upgrade1status = document.createElement("div");
upgrade1status.textContent =
  `Amount purchased: ${upgrade1amount} Cost: 10 Points, +0.1 points/second`;
document.body.append(upgrade1status);

const upgrade2 = document.createElement("button");
upgrade2.textContent = "B";
document.body.append(upgrade2);
upgrade2.disabled = true;
let upgrade2amount = 0;
const upgrade2status = document.createElement("div");
upgrade2status.textContent =
  `Amount purchased: ${upgrade2amount} Cost: 100 Points, +2 points/second`;
document.body.append(upgrade2status);

const upgrade3 = document.createElement("button");
upgrade3.textContent = "C";
document.body.append(upgrade3);
upgrade3.disabled = true;
let upgrade3amount = 0;
const upgrade3status = document.createElement("div");
upgrade3status.textContent =
  `Amount purchased: ${upgrade3amount} Cost: 1000 Points, +50 points/second`;
document.body.append(upgrade3status);

// Continuous growth logic for autoclicking + running game
let growthRate: number = 0;
let last_timestamp: number | null = null;

const growthDisplay = document.createElement("div"); // Display growth rate
growthDisplay.textContent = `${growthRate} points/second`;
document.body.insertBefore(growthDisplay, upgrade1);

function step(timestamp: number) {
  if (last_timestamp !== null) {
    const delta: number = timestamp - last_timestamp;
    const increment: number = delta / 1000;
    counter += increment * growthRate;
    counterElement.textContent = `${
      counter.toFixed(0)
    } Brain Nourishment Points`;

    // Status updates
    growthDisplay.textContent = `${growthRate.toFixed(1)} points/second`;
    upgrade1status.textContent =
      `Amount purchased: ${upgrade1amount} Cost: 10 Points, +0.1 points/second`;
    upgrade2status.textContent =
      `Amount purchased: ${upgrade2amount} Cost: 100 Points, +2 points/second`;
    upgrade3status.textContent =
      `Amount purchased: ${upgrade3amount} Cost: 1000 Points, +50 points/second`;

    // Unlock upgrade1 at 10 points
    if (counter >= 10) {
      upgrade1.disabled = false;
    }

    // Unlock upgrade2 at 100 points
    if (counter >= 100) {
      upgrade2.disabled = false;
    }

    // Unlock upgrade3 at 1000 points
    if (counter >= 1000) {
      upgrade3.disabled = false;
    }
  }
  last_timestamp = timestamp;
  requestAnimationFrame(step);
}
requestAnimationFrame(step);

// Upgrade logic
upgrade1.addEventListener("click", () => {
  counter -= 10;
  growthRate += 0.1; // Increase growth rate by 0.1 points per second
  upgrade1amount++;
  counterElement.textContent = `${counter} Brain Nourishment Points`;
  if (counter < 10) {
    upgrade1.disabled = true;
  }
});

upgrade2.addEventListener("click", () => {
  counter -= 100;
  growthRate += 2; // Increase growth rate by 2 points per second
  upgrade2amount++;
  counterElement.textContent = `${counter} Brain Nourishment Points`;
  if (counter < 100) {
    upgrade2.disabled = true;
  }
});

upgrade3.addEventListener("click", () => {
  counter -= 1000;
  growthRate += 50; // Increase growth rate by 50 points per second
  upgrade3amount++;
  counterElement.textContent = `${counter} Brain Nourishment Points`;
  if (counter < 1000) {
    upgrade3.disabled = true;
  }
});
