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
