let currentName = ""; // More descriptive variable name
let virtualDom = createDom();
let previousDom;
let realElements;

// Improved readability with descriptive variable names and comments
function createDom() {
  return [
    ["input", currentName, handle],
    ["div", `Hello ${currentName}`],
  ];
}

function handle(e) {
  currentName = e.target.value;
  try {
    updateDom();
  } catch (error) {
    console.error("Error updating DOM:", error);
  }
}

function updateDom() {
  if (realElements == undefined) {
    realElements = virtualDom.map(convert);
    document.body.append(...realElements);
  } else {
    previousDom = virtualDom.slice(); // Efficient cloning
    virtualDom = createDom();
    findDiff(previousDom, virtualDom);
  }
}

function convert(node) {
  const element = document.createElement(node[0]);
  if (node[0] === "input") {
    element.value = node[1];
    element.addEventListener("input", node[2]); // Modern event listener syntax
  } else {
    element.textContent = node[1];
  }
  return element;
}

function findDiff(prev, current) {
  for (let i = 0; i < current.length; i++) {
    if (prev[i] !== current[i]) {
      // Strict equality for comparison
      if (current[i][0] === "input") {
        realElements[i].value = current[i][1]; // Update only relevant property
      } else {
        realElements[i].textContent = current[i][1];
      }
    }
  }
}

updateDom();
