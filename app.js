const backgroundContainerElement = document.querySelector(
  ".background-colors-container"
);
const colorsContainerElement = document.querySelector(
  ".colors-value-container"
);

const colorPicked = document.querySelector(".color-picker");
const getColorBtn = document.querySelector(".color-btn");

const colorsList = document.querySelector(".colors-list");

getColorBtn.addEventListener("click", () => {
  // Extract Color & Color Scheme From The INputs
  const color = colorPicked.value.slice(1);
  const colorScheme = colorsList.value;

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${color}&mode=${colorScheme}&count=5`
  )
    .then((res) => res.json())
    .then(({ colors }) => {
      renderHTML(colors);
    });
});

function renderHTML(colorsArr) {
  let backgroundContainerHTML = "";
  let colorsContainerHTML = "";

  colorsContainerElement.innerHTML = backgroundContainerElement.innerHTML = "";
  for (let color of colorsArr) {
    // Inject the background colors and the values to an html element
    colorsContainerHTML += `<p>${color.hex.value}</p>`;
    backgroundContainerHTML += `<div style="background:${color.hex.value}"></div>`;
  }
  // Manipulate the DOM outside the loop for better performance
  backgroundContainerElement.innerHTML = backgroundContainerHTML;
  colorsContainerElement.innerHTML = colorsContainerHTML;
}

// Change the background of the color picker once we select a new color
colorPicked.addEventListener("change", () => {
  colorPicked.style.background = `${"#"}${colorPicked.value.slice(1)}`;
});
