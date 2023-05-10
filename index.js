//import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { menuArray } from "./data";

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleAddFood(e.target.dataset.add);
  }
});

function handleAddFood(food) {
  console.log(food.id);
}

function getMenuHtml() {
  let menuHtml = ``;

  menuArray.forEach(function (food) {
    menuHtml += `
  
    <div class="food-inner">
      <p id="menu-emoji" class="emoji">${food.emoji}</p>
      <div class="food-container" id="food-container">
          <p id="food-title">${food.name}</p>
          <p id="food-ingredients">${food.ingredients}</p>
          <p id="food-price">$ ${food.price}</p>
      </div>
      <i class="fa-solid fa-plus fa-xl" data-food=${food.id}></i>
      
    </div>
    `;
  });
  return menuHtml;
}

function render() {
  document.getElementById("menu-container").innerHTML = getMenuHtml();
}
render();
