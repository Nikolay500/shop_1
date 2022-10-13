let data;
let isCartActive = false
let chosedItems = []
const goodsBlock = document.querySelector(".goods");
const popupDiv = document.querySelector(".popup")
const btnPopup = document.querySelector(".btn-popup")
const divPrice = document.querySelector(".cart-total-price")
const cart = document.querySelector(".cart-container")
const cartPrice = document.querySelector(".cart-int-price")

getData()

function getData() {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then((json) => {
      data = json;
      showShopItems()
    })
}

function showShopItems() {
  goodsBlock.textContent = ""
  data.map((item) => {
    makeShopCard(item);
  });
}

function makeShopCard(product) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  const cardTitle = document.createElement("h2");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = product.title;
  const cardLink = document.createElement("a");
  cardLink.classList.add("lightzoom");
  cardLink.setAttribute("href", product.image);
  const cardImg = document.createElement("img");
  cardImg.classList.add("card-image");
  cardImg.setAttribute("src", product.image);
  const cardDesc = document.createElement("p");
  cardDesc.classList.add("card-description");
  cardDesc.textContent = product.description;
  const cardButton = document.createElement("button");
  cardButton.classList.add("btn");
  cardButton.classList.add("btn-danger");
  cardButton.textContent = `В корзину (${product.price} $)`;
  cardButton.addEventListener("click", () => {
    chosedItems.push(product)
    showChosedItems()
    data = data.filter(item => {
      if (item.id != product.id) return item
    })
    showShopItems()
    receivingTotalPrice()
  })
  const divRate = document.createElement("div");
  divRate.classList.add("card-rate");
  divRate.textContent = product.rating.rate.toFixed(1);
  divRate.style.border = `5px solid ${changeBorder(product.rating.rate)}`;
  cardDiv.appendChild(cardTitle);
  cardLink.appendChild(cardImg)
  cardDiv.appendChild(cardLink);
  cardDiv.appendChild(cardDesc);
  cardDiv.appendChild(cardButton);
  cardDiv.appendChild(divRate);
  goodsBlock.appendChild(cardDiv);
}



function changeBorder(rate) {
  if (rate > 0 && rate <= 2) {
    return "red"
  } else if (rate > 2 && rate <= 3) {
    return "orange"
  } else if (rate > 3 && rate <= 4) {
    return "yellow"
  } else {
    return "green"
  }
}

function showPopup() {
  if (!isCartActive) {
    popupDiv.style.right = "0px"
    popupDiv.style.opacity = "1"
    isCartActive = true
    receivingTotalPrice()
  } else {
    popupDiv.style.right = "-500px"
    popupDiv.style.opacity = "0"
    isCartActive = false
    cart.textContent = ""
  };

}


function showChosedItems() {
  cart.textContent = ""
  chosedItems.map((item) => {
    makeCartCard(item);
  });
}

function makeCartCard(product) {
  const cartCardDiv = document.createElement("div");
  cartCardDiv.classList.add("cart-card");
  const infoDiv = document.createElement("div")
  infoDiv.classList.add("info")
  const priceDiv = document.createElement("div")
  priceDiv.classList.add("price-div")
  const cartCardTitle = document.createElement("h6");
  cartCardTitle.classList.add("cart-title");
  cartCardTitle.textContent = product.title;
  const cartCardImg = document.createElement("img");
  cartCardImg.classList.add("cart-image");
  cartCardImg.setAttribute("src", product.image);
  const cartCardDesc = document.createElement("p");
  cartCardDesc.classList.add("cart-desc");
  cartCardDesc.textContent = product.description;
  const cartCardButton = document.createElement("button");
  cartCardButton.classList.add("fa-solid");
  cartCardButton.classList.add("fa-xmark");
  cartCardButton.classList.add("cart-card-btn")
  cartCardButton.textContent = ``;
  cartCardButton.addEventListener("click", () => {
    chosedItems.map((item) => {
      if (item.id == product.id) {
        data.push(item)
        showShopItems()
      }
    })
    chosedItems = chosedItems.filter((item) => {
      if (item.id != product.id) {
        return item
      };
    })
    showChosedItems()
    receivingTotalPrice()
  })
  const cartCardPrice = document.createElement("span")
  cartCardPrice.classList.add("cart-card-price")
  cartCardPrice.textContent = product.price * cartCounter(priceDiv)
  cartCardDiv.appendChild(cartCardImg)
  infoDiv.appendChild(cartCardTitle)
  infoDiv.appendChild(cartCardDesc)
  priceDiv.appendChild(cartCardButton)
  priceDiv.appendChild(cartCardPrice)
  cartCardDiv.appendChild(infoDiv)
  cartCardDiv.appendChild(priceDiv)
  cart.appendChild(cartCardDiv)
  cartCounter(priceDiv)
}

function cartCounter(div) {
  let num = 1
  const counterDiv = document.createElement("div")
  counterDiv.classList.add("counter-div")
  const buttonMinus = document.createElement("button")
  buttonMinus.classList.add("minus")
  const contentMinus = document.createElement("p")
  contentMinus.textContent = "-"
  buttonMinus.addEventListener("click", function (){
    if (num > 1) {
      --num
      counter.textContent = num
    }
  })
  const counter = document.createElement("p")
  counter.textContent = num
  const buttonPlus = document.createElement("button")
  buttonPlus.classList.add("plus")
  const contentPlus = document.createElement("p")
  contentPlus.textContent = "+"
  buttonPlus.addEventListener("click", () => {
    ++num
    counter.textContent = num
  })

  buttonMinus.appendChild(contentMinus)
  buttonPlus.appendChild(contentPlus)
  counterDiv.appendChild(buttonMinus)
  counterDiv.appendChild(counter)
  counterDiv.appendChild(buttonPlus)
  div.appendChild(counterDiv)
  return num
}

function resultPrice(item){
  
}

function receivingTotalPrice() {
  if (chosedItems.length == 0) {
    emptyCart()
    divPrice.style.display = "none"
  } else {
    divPrice.style.display = "block"
    cartPrice.textContent = chosedItems.reduce((sum, item) => {
      return sum + item.price
    }, 0);
  }
}

function emptyCart() {
  const container = document.createElement("div")
  container.classList.add("empty-cart-div")
  const text = document.createElement("p")
  text.textContent = "Ваша корзина пуста."
  const image = document.createElement("i")
  image.classList.add("fa-solid")
  image.classList.add("fa-cart-shopping")
  container.appendChild(text)
  container.appendChild(image)
  cart.appendChild(container)
}