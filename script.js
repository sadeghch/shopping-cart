// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// count in cart bag
let countInCart = document.querySelector(".countInCart");

//show countincart localstorage
document.addEventListener("DOMContentLoaded", getLocalcountincart);
//show product in cart
document.addEventListener("DOMContentLoaded", getLocalproductincart);
//show total price in cart
document.addEventListener("DOMContentLoaded", getLocaltotalincart);
//show input value in cart
document.addEventListener("DOMContentLoaded", getLocalinputvalue);
// the chevron up
let chevronUp = document.getElementsByClassName("bx-chevron-up");
// the chevron down
let chevronDown = document.getElementsByClassName("bx-chevron-down");
// open cart
cartIcon.onclick = (e) => {
  cart.classList.add("active");
  // the chevron up listener
  for (var i = 0; i < chevronUp.length; i++) {
    chevronUp[i].addEventListener("click", getchevronUp);
  } // the chevron down listener
  for (var i = 0; i < chevronDown.length; i++) {
    chevronDown[i].addEventListener("click", getchevronDown);
  }
  //add value input to local storage
  let price = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < price.length; i++) {
    let valueprice = Number(price[i].value);
    saveLocalinputvalue(valueprice++);
  }
};
//close cart
closeCart.onclick = () => {
  //add value input to local storage
  let price = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < price.length; i++) {
    let valueprice = Number(price[i].value);
    saveLocalinputvalue(valueprice++);
  }
  cart.classList.remove("active");
};

//cart working js
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

//the functions

function ready() {
  //remove product
  let removeCartButtons = document.getElementsByClassName("cart-remove");

  for (let i = 0; i < removeCartButtons.length; i++) {
    let Button = removeCartButtons[i];
    Button.addEventListener("click", removeCartItem);
  }
  //quantity change
  let quantityinputs = document.getElementsByClassName("cart-quantity");

  for (let i = 0; i < quantityinputs.length; i++) {
    let input = quantityinputs[i];

    input.addEventListener("change", getchevronUp);
    input.addEventListener("change", getchevronDown);
  }
  // add to cart
  let addCart = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCart.length; i++) {
    let button = addCart[i];

    button.addEventListener("click", addCartClicked);
  }
  // buy button work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buybuttonclicked);
}

//buy button function
function buybuttonclicked() {
  swal("Your Cart  Deleted");
  let cartcontent = document.getElementsByClassName("cart-content")[0];
  //remove total in cart
  let removetotalcart =
    (cartcontent.parentElement.childNodes[9].children[1].innerText = "$0");
  while (cartcontent.hasChildNodes()) {
    //remove count in cart
    let countcart = (countInCart.innerText = 0);
    saveLocalcountincart(countcart);
    //remove product in cart
    removeLocalproductincart(cartcontent);
    //remove numberQt in cart
    removeLocalinputvalue(cartcontent);
    //remove total in cart
    removeLocaltotaltincart(removetotalcart);
    cartcontent.removeChild(cartcontent.firstChild);
  }
  //close cart buying
  cart.classList.remove("active");
  updatetotale();
}

//remove item from cart
function removeCartItem(event) {
  let buttonClicked = event.target;
  //close the cart
  let lastremoveIcon =
    buttonClicked.parentElement.parentElement.children.length;

  //remove count in cart
  let removeInputvalue =
    buttonClicked.parentElement.childNodes[3].childNodes[5].value;
  let removecount = countInCart.innerText - Number(removeInputvalue);
  let count = (countInCart.innerText = removecount);
  saveLocalcountincart(count);
  //remove product in cart
  let removecartcountproduct = buttonClicked.parentElement;
  //remove numberQT in cart
  removeLocalinputvalue(removecartcountproduct);

  //remove product in cart
  removeLocalproductincart(removecartcountproduct);
  //remove input value in cart
  removeLocalcountincart(removecount);
  removecartcountproduct.remove();
  if (lastremoveIcon == 1) {
    //close the cart

    cart.classList.remove("active");
  }
  updatetotale();
}

//quantity changes
function quantityChange(event) {
  //check the value
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
    return;
  }
  updatetotale();
}
//increment the input value
function getchevronUp(e) {
  let input = e.target.parentElement.childNodes[5];
  let price = document.getElementsByClassName("cart-quantity");

  let tot = 0;
  for (var i = 0; i < price.length; i++) {
    if (parseFloat(price[i].value)) tot += parseFloat(price[i].value);
  }
  input.value++;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
    return;
  }

  if (input.value >= 1) {
    let count = (countInCart.innerText = tot + 1);
    saveLocalcountincart(count);
    for (var i = 0; i < price.length; i++) {
      let valueprice = Number(price[i].value);
      saveLocalinputvalue(valueprice++);
    }
  }
  updatetotale();
}
//dicrement the input value
function getchevronDown(e) {
  let input = e.target.parentElement.childNodes[5];
  let price = document.getElementsByClassName("cart-quantity");
  let tot = 0;
  for (var i = 0; i < price.length; i++) {
    if (parseFloat(price[i].value)) tot += parseFloat(price[i].value);
    let valueprice = Number(price[i].value);
    saveLocalinputvalue(valueprice--);
  }
  input.value--;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
    return;
  }

  if (input.value >= 1) {
    let count = (countInCart.innerText = tot - 1);
    saveLocalcountincart(count);
    for (var i = 0; i < price.length; i++) {
      let valueprice = Number(price[i].value);
      saveLocalinputvalue(valueprice--);
    }
  }
  updatetotale();
}

//add to cart function
function addCartClicked(event) {
  let countcart = countInCart.innerText++;
  //save count in cart
  saveLocalcountincart(countcart + 1);
  let button = event.target;
  let shopProducts = button.parentElement;

  let title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  console.log(title);
  let price = shopProducts.getElementsByClassName("price")[0].innerText;

  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotale();
}

function addProductToCart(title, price, productImg) {
  let cartshopbox = document.createElement("div");
  cartshopbox.classList.add("cart-box");
  let cartItem = document.getElementsByClassName("cart-content")[0];
  let cartItemNames = cartItem.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      swal("You have already add this item to cart");
      let count = countInCart.innerHTML--;
      saveLocalcountincart(count - 1);
      return;
    }
  }

  let cartBoxContent = `  
<img src="${productImg}" alt="" class="cart-img" />
<div class="detail-box">
  <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
  <input class="cart-quantity " type="number" value="1"/><i class='bx bx-chevron-up' id"bx-chevron-up"></i><i class='bx bx-chevron-down' id"bx-chevron-down"></i>
</div>
<!-- remove cart -->
<i class="bx bxs-trash-alt cart-remove"></i>`;

  cartshopbox.innerHTML = cartBoxContent;
  cartItem.appendChild(cartshopbox);
  //save product in cart
  saveLocalproductincart(cartItem.innerHTML);
  cartshopbox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartshopbox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("click", getchevronUp);
}
//update total
function updatetotale() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxs = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxs.length; i++) {
    let cartBox = cartBoxs[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

    let price = parseFloat(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  //if price have some cents value
  total = Math.round(total * 100) / 100;
  let totalPrice = (document.getElementsByClassName(
    "total-price"
  )[0].innerText = "$" + total);
  saveLocaltotalincart(totalPrice);
}

// local storage of cart in count
function saveLocalcountincart(countcart) {
  let savedcountcart = localStorage.getItem("counts")
    ? JSON.parse(localStorage.getItem("counts"))
    : [];
  savedcountcart.push(countcart);
  localStorage.setItem("counts", JSON.stringify(savedcountcart));
}
function getLocalcountincart() {
  let savedcountcart = localStorage.getItem("counts")
    ? JSON.parse(localStorage.getItem("counts"))
    : [];
  savedcountcart.forEach((countcart) => {
    countInCart.innerText = countcart;
  });
}

function removeLocalcountincart(countcart) {
  let savedcountcart = localStorage.getItem("counts")
    ? JSON.parse(localStorage.getItem("counts"))
    : [];
  const filteredcountincar = savedcountcart.slice(0, savedcountcart.length);
  localStorage.setItem("counts", JSON.stringify(filteredcountincar));
}
//end  local storage of cart in count

// local storage of product in cart
function saveLocalproductincart(productcart) {
  let productincart = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  productincart.push(productcart);
  localStorage.setItem("products", JSON.stringify(productincart));
}
function getLocalproductincart() {
  let productincart = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];

  productincart.forEach((productincart) => {
    let cartcontentt = document.querySelector(".cart-content");
    cartcontentt.innerHTML = productincart;
  });
}

function removeLocalproductincart(productcart) {
  let productincart = localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];

  const filteredproductincart = productincart.slice(0, -1);
  localStorage.setItem("products", JSON.stringify(filteredproductincart));
}
//end local storage of product in cart

// local storage of total in cart
function saveLocaltotalincart(totalprice) {
  let totalincart = localStorage.getItem("totals")
    ? JSON.parse(localStorage.getItem("totals"))
    : [];
  totalincart.push(totalprice);
  localStorage.setItem("totals", JSON.stringify(totalincart));
}

function getLocaltotalincart() {
  let totalincart = localStorage.getItem("totals")
    ? JSON.parse(localStorage.getItem("totals"))
    : [];

  totalincart.forEach((totalprice) => {
    let totalPrice = (document.getElementsByClassName(
      "total-price"
    )[0].innerText = totalprice);
  });
}

function removeLocaltotaltincart(totalprice) {
  let totalincart = localStorage.getItem("totals")
    ? JSON.parse(localStorage.getItem("totals"))
    : [];

  const filteredtotalincart = totalincart.slice(0, -1);
  localStorage.setItem("totals", JSON.stringify(filteredtotalincart));
}

// local storage of input value in cart
function saveLocalinputvalue(input) {
  let inputvalue = localStorage.getItem("inputs")
    ? JSON.parse(localStorage.getItem("inputs"))
    : [];
  inputvalue.push(input);
  localStorage.setItem("inputs", JSON.stringify(inputvalue));
}

function getLocalinputvalue(e) {
  let inputvalue = localStorage.getItem("inputs")
    ? JSON.parse(localStorage.getItem("inputs"))
    : [];
  let numberQt = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < numberQt.length; i++) {
    numberQt[i].value = 1;
    let me = inputvalue.slice(-numberQt.length);

    numberQt[i].value = 1;
    numberQt[0].value = me[0];
    numberQt[1].value = me[1];
    numberQt[2].value = me[2];
    numberQt[3].value = me[3];
    numberQt[4].value = me[4];
    numberQt[5].value = me[5];
    numberQt[6].value = me[6];
    numberQt[7].value = me[7];
  }
}

function removeLocalinputvalue(input) {
  let inputvalue = localStorage.getItem("inputs")
    ? JSON.parse(localStorage.getItem("inputs"))
    : [];
  console.log(inputvalue.length);
  let leng = inputvalue.length - 1;
  const filteredinputvalue = inputvalue.slice(
    inputvalue.length,
    inputvalue.length
  );
  console.log(filteredinputvalue);
  localStorage.setItem("inputs", JSON.stringify(filteredinputvalue));
}
//end local storage of  input value in cart
