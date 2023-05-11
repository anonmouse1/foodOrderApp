import { menuArray } from "./data";

let orderInProcess = false;
let orderHtml = ``;
let orderInnerHtml = ``;
let currentMenuHtml = getMenuHtml();
let totalPrice = 0;

//listen to any click on homepage
document.addEventListener("click", function (e) {
  if (e.target.dataset.food) {
    orderInProcess = true;
    console.log("item added");
    let selectedFood = menuArray.find(function (foodItem) {
      return foodItem.id === Number(e.target.dataset.food);
    });
    console.log("Selected food: " + JSON.stringify(selectedFood));
    handleOrder(selectedFood);
    render();
  }
});

function handleOrder(food) {
  if (orderInProcess) {
    console.log("handle order called for food; " + food.name);
    //add the food to the orderList array that holds all currently on order food

    totalPrice += food.price;

    orderInnerHtml += `
  <div class="food-item">
    <p id="order-food-name">${food.name}</p>
    <button id="remove-btn"></button>
    <p id="food-price">${food.price}</p>
  </div>
  `;
    orderHtml = `
  <div class="order">
    <p>Your Order</p>
    ${orderInnerHtml}
    <p id="total-text">Total</p>
    <p id="total-number">${totalPrice}</p>
    <button id="place-order-btn">Place Order</button>
  </div>`;
    console.log(orderHtml);
  }
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
  if (orderInProcess) {
    document.getElementById("menu-container").innerHTML =
      currentMenuHtml + orderHtml;
  } else {
    document.getElementById("menu-container").innerHTML = currentMenuHtml;
  }
}
render();
