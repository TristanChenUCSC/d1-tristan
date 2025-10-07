import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example change: <img src="${exampleIconUrl}" class="icon" /></p>
`;

// Create Button
const button = document.createElement("button");
button.textContent = "💰";
document.body.append(button);
