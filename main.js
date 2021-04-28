let carts = document.querySelectorAll('.add-cart') ;
let decreasers = document.querySelectorAll('.decrease') ;

let products = [ {name: 'iPhone SE', tag: 'se', price: 1, inCart: 0},
                {name: 'iPhone 11', tag: '11', price: 2, inCart: 0},
                {name: 'iPhone 11 Pro', tag: '11pro', price: 3, inCart: 0},
                {name: 'iPhone 12 Mini', tag: '12mini', price: 4, inCart: 0},
                {name: 'iPhone 12', tag: '12', price: 5, inCart: 0},
                {name: 'iPhone 12 Pro', tag: '12pro', price: 6, inCart: 0} ] ;

for (let i=0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]) ;
    totalCost(products[i]) ;
  })
}

for (let i=0; i < decreasers.length; i++) {
  let decreaseButton = document.querySelector('.decrease' + products[i].tag) ;

  decreaseButton.addEventListener('click', () => {
    decreaseQuantity(products[i]) ;
  })
}

function decreaseQuantity(product) {
  let productNumbers = localStorage.getItem('cartNumbers') ;
  productNumbers = parseInt(productNumbers) ;

  localStorage.setItem('cartNumbers', productNumbers - 1) ;
  document.querySelector('.cart span').textContent = productNumbers - 1 ;


  let cartItems = localStorage.getItem('productsInCart') ;
  cartItems = JSON.parse(cartItems) ;

  cartItems[product.tag].inCart -= 1 ;

  localStorage.setItem("productsInCart", JSON.stringify(cartItems)) ;
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers') ;

  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers ;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem('cartNumbers') ;
  productNumbers = parseInt(productNumbers) ;

  if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1) ;
    document.querySelector('.cart span').textContent = productNumbers + 1 ;
  } else {
    localStorage.setItem('cartNumbers', 1) ;
    document.querySelector('.cart span').textContent = 1 ;
  }

  setItems(product) ;
}

function setItems(product) {
  let cartItems = localStorage.getItem('productsInCart') ;
  cartItems = JSON.parse(cartItems) ;

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = { ...cartItems, [product.tag]: product }
    }

    cartItems[product.tag].inCart += 1 ;
  } else {
    product.inCart = 1 ;
    cartItems = { [product.tag]: product }
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems)) ;
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost") ;

  if (cartCost != null) {
    cartCost = parseInt(cartCost) ;
    localStorage.setItem("totalCost", cartCost + product.price) ;
  } else {
    localStorage.setItem("totalCost", product.price) ;
  }
}

function displayCart() {
  let cartItems = localStorage.getItem('productsInCart') ;
  cartItems = JSON.parse(cartItems) ;

  let productContainer = document.querySelector(".products") ;

  let cartCost = localStorage.getItem('totalCost') ;

  if (cartItems && productContainer) {
    productContainer.innerHTML = '' ;
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class="product">
        <ion-icon name="trash-outline"></ion-icon>
        <img src="${item.tag}.jpg">
        <span>${item.name}</span>
      </div>
      <div class="price">R$ ${item.price}</div>
      <div class="quantity"> <a class="decrease ${item.tag}"> - </a> <span> ${item.inCart} </span> <a class="increase ${item.tag}"> + </a> </div>
      <div class="total"> R$ ${item.price * item.inCart}</div>
      `
    }) ;

    productContainer.innerHTML += `
    <div class="basketTotalContainer">
      <h1 class="basketTotalTitle"> Basket Total: </h1>
      <h3 class="basketTotal">R$ ${cartCost}</h3>
    </div>
    `
  }
}

onLoadCartNumbers() ;
displayCart() ;
