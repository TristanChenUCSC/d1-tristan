import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example change: <img src="${exampleIconUrl}" class="icon" /></p>
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
upgrade1.textContent = "🚽 Skibidi Toilet Episode";
document.body.append(upgrade1);
upgrade1.disabled = true;

// Continuous growth logic for autoclicking + running game
let growthRate: number = 0;
let last_timestamp: number | null = null;

function step(timestamp: number) {
  if (last_timestamp !== null) {
    const delta: number = timestamp - last_timestamp;
    const increment: number = delta / 1000;
    counter += increment * growthRate;
    counterElement.textContent = `${
      counter.toFixed(0)
    } Brain Nourishment Points`;

    // Unlock upgrade1 at 10 points
    if (counter >= 10) {
      upgrade1.disabled = false;
    }
  }
  last_timestamp = timestamp;
  requestAnimationFrame(step);
}
requestAnimationFrame(step);

// Upgrade logic
upgrade1.addEventListener("click", () => {
  counter -= 10;
  growthRate += 1; // Increase growth rate by 1 point per second
  counterElement.textContent = `${counter} Brain Nourishment Points`;
  if (counter < 10) {
    upgrade1.disabled = true;
  }
});
