import { menuArray } from "./data";

let orderInProcess = false;
let orderHtml = ``;
let orderInnerHtml = ``;
let currentMenuHtml = getMenuHtml();

//listen to any click on homepage
document.addEventListener("click", function (e) {
  if (e.target.dataset.food) {
    orderInProcess = true;
    console.log("item added");
    currentMenuHtml += handleOrder(Number(e.target.dataset.food));
    console.log("current menu:" + currentMenuHtml);
    render();
  }
});

function handleOrder(food) {
  let orderList = [];

  if (orderInProcess) {
    console.log("handle order called for food; " + food);
    let selectedFood = menuArray.find(function (foodItem) {
      return foodItem.id === food;
    });
    //add the food to the orderList array that holds all currently on order food

    orderList.push(selectedFood);

    console.log("Selected food: " + JSON.stringify(selectedFood));

    orderList.forEach(function (foodItem) {
      orderInnerHtml += `
  <div class="food-item">
    <p id="order-food-name">${foodItem.name}</p>
    <button id="remove-bt"n"></button>
    <p id="food-price">${foodItem.price}</p>
  </div>
  `;
    });
    orderHtml = `
  <div class="orderHtml">
    <p>Your Order</p>
    ${orderInnerHtml}
    <p id="total-text"></p>
    <p id="total-number"></p>
    <button id="place-order-btn">Place Order</button>
  </div>`;
    console.log(orderHtml);
  }

  return orderHtml;
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
  document.getElementById("menu-container").innerHTML = currentMenuHtml;
}
render();
