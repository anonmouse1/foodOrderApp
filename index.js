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
    selectedFood.isOrdered = true;
    console.log("Selected food: " + JSON.stringify(selectedFood));
    getMenuHtml();
    handleOrder(selectedFood);
    render();
  } else if (e.target.dataset.payment) {
    handlePayment();
  }
});

function handlePayment() {
  console.log("handle payment called");
  const modal = document.getElementById("payment-modal");
  modal.style.display = "flex";
  const closeModalBtn = document.getElementById("modal-close-btn");
  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  const cardForm = document.getElementById("card-details");
  cardForm.addEventListener("submit", function (e) {
    e.preventDefault();
    modal.style.display = "none";
    orderInProcess = false;
    render();
  });
}

function handleOrder(food) {
  if (orderInProcess) {
    console.log("handle order called for food; " + food.name);
    //add the food to the orderList array that holds all currently on order food

    totalPrice += food.price;

    orderInnerHtml += `
  <div class="food-item">
    <div class="food-name-remove">
        <p id="order-food-name" class="title ">${food.name}</p>
        <input type="button" id="remove-btn" class="remove-btn" value="remove"></input>
    </div>
    <p id="food-price" class="title">$${food.price}</p>
  </div>
  `;
    orderHtml = `
  <div class="order">
    <p class="title">Your Order</p>
    ${orderInnerHtml}
    <div class ="line-item">
        <p id="total-text" class="title">Total</p>
        <p id="total-number" class="title">$${totalPrice}</p>
    </div>
    <button id="place-order-btn"  data-payment="readyToPay">Place Order</button>
  </div>`;
    console.log(orderHtml);
  }
}

function getMenuHtml() {
  let menuHtml = ``;
  let isOrdered = ``;

  menuArray.forEach(function (food) {
    if (food.isOrdered) {
      isOrdered = `ordered`;
    }
    menuHtml += `
  
    <div class="food-inner ${isOrdered}">
      <p id="menu-emoji" class="emoji">${food.emoji}</p>
      <div class="food-container" id="food-container">
          <p id="food-title class="title">${food.name}</p>
          <p id="food-ingredients">${food.ingredients}</p>
          <p id="food-price">$ ${food.price}</p>
      </div>
      <i class="fa-solid fa-plus fa-xl plus " data-food=${food.id}></i>
      
    </div>
    `;
  });
  console.log(menuHtml);

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
