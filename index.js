import { menuArray } from "./data";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

let orderInProcess = false;
let orderHtml = ``;
let orderPaidHtml = ``;
let orderInnerHtml = ``;
let currentMenuHtml = getMenuHtml();
let totalPrice = 0;
let hasPaid = false;

let orderedItems = [];
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
  } else if (e.target.dataset.remove) {
    let selectedFood = orderedItems.find(function (foodItem) {
      return foodItem.uuid === e.target.dataset.remove;
    });
    //selectedFood.isOrdered = false;

    console.log("item removed: " + selectedFood.name);
    console.log("dataset Remove: " + e.target.dataset.remove);
    handleRemove(selectedFood);
  } else if (e.target.dataset.payment) {
    handlePayment();
  }
});

function handlePayment() {
  console.log("handle payment called");
  const modal = document.getElementById("payment-modal");
  modal.style.display = "flex";
  modal.style.flexDirection = "column";
  const closeModalBtn = document.getElementById("modal-close-btn");
  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  const cardForm = document.getElementById("card-details");

  cardForm.addEventListener("submit", function (e) {
    e.preventDefault();
    modal.style.display = "none";
    orderInProcess = false;
    const formData = new FormData(cardForm);
    //.trim removes whitespace from both ends of a string then split splits the string into an array of substrings
    let firstName = formData.get("name").trim().split(" ")[0];
    orderPaidHtml = `
    <div class="order-paid">
      <p id="order-paid-txt" >Thanks, ${firstName} ! Sit tight, your order is on the way 👩‍🍳 </p>
    </div>`;
    hasPaid = true;

    console.log("hasPaid: " + hasPaid);
    console.log("Customer name" + formData.get("name"));
    render();
  });
}

function handleOrder(food) {
  if (orderInProcess) {
    console.log("handle order called for food; " + food.name);
    // Create a copy of the selectedFood object
    let copiedFood = Object.assign({}, food);
    orderedItems.push(copiedFood);
    //edit the orderItems array to set uuid value for the food that has been ordered
    orderedItems.forEach(function (food) {
      if (food.uuid === "notSet") {
        food.uuid = uuidv4();
      }
    });

    console.log("orderedItems: " + JSON.stringify(orderedItems));

    orderInnerHtml = ``;
    totalPrice = 0;
    orderedItems.forEach(function (food) {
      totalPrice += food.price;
      console.log("Total price inside forEach: " + totalPrice);
      orderInnerHtml += `
  <div class="food-item">
    <div class="food-name-remove">
        <p id="order-food-name" class="title">${food.name}</p>
        <input type="button" id="remove-btn" class="remove-btn" value="remove" data-remove=${food.uuid}></input>
    </div>
    <p id="food-price" class="title">$${food.price}</p>
  </div>
  `;
    });
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
  render();
}

function handleRemove(food) {
  //console.log("handle remove called for food; " + food.name);
  orderedItems = orderedItems.filter(function (foodItem) {
    return foodItem.uuid !== food.uuid;
  });
  totalPrice -= food.price;
  console.log("totalPrice: " + totalPrice);

  console.log("orderedItems: " + JSON.stringify(orderedItems));
  render();
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
          <p id="food-title" class="title">${food.name}</p>
          <p id="food-ingredients">${food.ingredients}</p>
          <p id="food-price" class="title">$ ${food.price}</p>
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
    orderInnerHtml = ``;
    totalPrice = 0;
    orderedItems.forEach(function (food) {
      totalPrice += food.price;
      console.log("Total price inside forEach: " + totalPrice);
      orderInnerHtml += `
        <div class="food-item">
          <div class="food-name-remove">
            <p id="order-food-name" class="title">${food.name}</p>
            <input type="button" id="remove-btn" class="remove-btn" value="remove" data-remove=${food.uuid}></input>
          </div>
          <p id="food-price" class="title">$${food.price}</p>
        </div>
      `;
    });

    orderHtml = `
      <div class="order">
        <p class="title">Your Order</p>
        ${orderInnerHtml}
        <div class="line-item">
          <p id="total-text" class="title">Total</p>
          <p id="total-number" class="title">$${totalPrice}</p>
        </div>
        <button id="place-order-btn" data-payment="readyToPay">Place Order</button>
      </div>`;
    document.getElementById("menu-container").innerHTML =
      currentMenuHtml + orderHtml;
  } else if (!orderInProcess && hasPaid) {
    document.getElementById("menu-container").innerHTML =
      currentMenuHtml + orderPaidHtml;
  } else {
    document.getElementById("menu-container").innerHTML = currentMenuHtml;
  }
}
render();
