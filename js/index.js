$(document).ready(function () {
  let div;
  let img;
  let span;

  // Load user id
  $.ajax({
    url: "http://localhost:8080"
  });

  // Load Categories
  $.ajax({
    url: "http://localhost:8080/category",
    method: "GET",
  }).done(function (response) {
    loadAllProduct();
    
    var categories = response.data;
    
    for (var i = 0; i < categories.length; i++) {
      console.log(categories[i]);
    }

    var mainCategory = document.getElementById("category");

    var link = document.createElement("a");
    link.innerHTML = "All Products";
    link.setAttribute(
      "class",
      "stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 category-feature how-active1"
    );
    link.addEventListener("click", function(){
      activeCategory(this);
      loadAllProduct();
    });
    mainCategory.appendChild(link);

    
    for (var i = 0; i < categories.length; i++) {
      let id = categories[i].id;
      var element = document.createElement("a");
      element.innerHTML = categories[i].name;
      element.setAttribute(
        "class",
        "stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 category-feature"
      );
      element.setAttribute("id", categories[i].id);

      element.addEventListener("click", function () {
        
        activeCategory(this);
        
        loadProductByCategory(id);
        
      });

      mainCategory.appendChild(element);
    }
  });


  function activeCategory(activeLink){
    activeLink.style.color = "grey";
    activeLink.style.pointerEvents = "none";
    activeLink.setAttribute(
    "class",
    "stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 category-feature how-active1");

    var links = document.querySelectorAll(".category-feature");
    for(var i=0; i<links.length; i++){
      if(links[i] != activeLink){
        links[i].style.color = "black";
        links[i].style.pointerEvents = "auto";
        links[i].setAttribute(
          "class",
          "stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 category-feature");
      }
    }
  }

  function reload(){
    var items = document.querySelectorAll(".isotope-item");
    for(var i=0; i<items.length; i++){
      items[i].remove();
    }
  }

  function loadAllProduct(){
    $.ajax({
      url: "http://localhost:8080/product",
      method: "GET",
    }).done(function(response){ 
      reload();

      var items = response.data;

      for (var j = 0; j < items.length; j++) {
        createItemELement(items[j]);
      }  
    });
  }

  function loadProductByCategory(id){
    $.ajax({
      url: "http://localhost:8080/product/category/" + id,
      method: "GET",
    }).done(function (response) {
      reload();

      var items = response.data;

      for (var j = 0; j < items.length; j++) {
        createItemELement(items[j]);
      }  
    });
  }

  function createItemELement(data){
        let itemDetail = document.getElementById("items-detail");

        var quarter = document.createElement("div");
        quarter.setAttribute("class", "col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women");
        
        let rootElement = document.createElement("div");
        rootElement.setAttribute("class", "block2");

        // list products by category id
        // upper side of product detail
        div = document.createElement("div");
        div.setAttribute("class", "block2-pic hov-img0");
        // feature detail of div 1
        img = document.createElement("img");
        img.setAttribute("src", data.image.image1);
        img.style.width = "20rem";
        img.style.height = "25rem";
        img.setAttribute("alt", "IMG-PRODUCT");

        let link = document.createElement("a");
        link.setAttribute(
          "class",
          "block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
        );
        link.setAttribute("href", "product-detail.html");
        productDetail(link, data.id);
        link.innerHTML = "Quick View";

        div.appendChild(img);
        div.appendChild(link);
        rootElement.appendChild(div);

        // lower side of product detail
        let rootElement2 = document.createElement("div");
        rootElement2.setAttribute(
          "class",
          "block2-txt flex-w flex-t p-t-14"
        );

        div = document.createElement("div");
        div.setAttribute("class", "block2-txt-child1 flex-col-l");

        link = document.createElement("a");
        link.setAttribute(
          "class",
          "stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
        );
        link.setAttribute("href", "product-detail.html");
        productDetail(link, data.id);
        link.innerHTML = data.name;

        span = document.createElement("span");
        span.setAttribute("class", "stext-105 cl3");
        span.style.color = "red";
        span.innerHTML = "$" + data.price;

        div.appendChild(link);
        div.appendChild(span);
        rootElement2.appendChild(div);

        div = document.createElement("div");
        div.setAttribute("class", "block2-txt-child2 flex-r p-t-3");
        link = document.createElement("a");
        link.setAttribute("class", "btn-addwish-b2 dis-block pos-relative js-addwish-b2");
        link.setAttribute("href", "#");
        img = document.createElement("img");
        img.setAttribute("class", "icon-heart1 dis-block trans-04");  
        img.setAttribute("src", "images/icons/icon-heart-01.png");
        img.setAttribute("alt", "ICON");
        link.appendChild(img);
        img = document.createElement("img");
        img.setAttribute("class", "icon-heart2 dis-block trans-04 ab-t-l");  
        img.setAttribute("src", "images/icons/icon-heart-02.png");
        img.setAttribute("alt", "ICON");
        link.appendChild(img);
        div.appendChild(link);
        rootElement2.appendChild(div);
          
        rootElement.appendChild(rootElement2);
        quarter.appendChild(rootElement);

        itemDetail.appendChild(quarter);
        itemDetail.style.marginBottom = "60rem";
  }

  function productDetail(link, id){
    
    link.addEventListener("click", function(){

      localStorage.setItem("product-detail-id", id);
    });
  }
  
  function removeCartItem(item) {
    var index = cartItems["cartItems"].indexOf(item);
    cartItems["cartItems"].splice(index, 1);
    itemQuantity["quantities"].splice(index, 1);

    localStorage.setItem("cart-items", JSON.stringify(cartItems));
    localStorage.setItem("cart-items-quantity", JSON.stringify(itemQuantity));
  }
  

  var cartList = document.querySelector(".cart-list");
  function createCartItem(item, addQuantity) {
    var div;
    var img;
    var link;
    var span;

    var li = document.createElement("li");
    li.setAttribute("class", "header-cart-item flex-w flex-t m-b-12");

    div = document.createElement("div");
    div.setAttribute("class", "header-cart-item-img");
    img = document.createElement("img");
    img.setAttribute("src", item.image.image1);
    img.setAttribute("alt", "IMG");
    div.appendChild(img);
    li.appendChild(div);
    div.addEventListener("click", function () {
      li.remove();
      document.querySelector(".cart-total-price").innerHTML = "";
      removeCartItem(item);
    });

    div = document.createElement("div");
    div.setAttribute("class", "header-cart-item-txt p-t-8");
    link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "header-cart-item-name m-b-18 hov-cl1 trans-04");
    link.innerHTML = item.name;
    span = document.createElement("span");
    span.setAttribute("class", "header-cart-item-info");
    span.setAttribute("id", item.id);
    span.innerHTML =
      addQuantity + " x " + "$" + parseInt(item.price) * addQuantity + ".00";
    div.appendChild(link);
    div.appendChild(span);
    li.appendChild(div);

    cartList.appendChild(li);
  }

  //load all cart items when load page
  let cartItems = JSON.parse(localStorage.getItem("cart-items"));
  let itemQuantity = JSON.parse(localStorage.getItem("cart-items-quantity"));
  if (cartItems != null) {
    var totalPrice = 0;
    for (let i = 0; i < cartItems["cartItems"].length; i++) {
      createCartItem(cartItems["cartItems"][i], itemQuantity["quantities"][i]);
      totalPrice += parseInt(cartItems["cartItems"][i].price)*parseInt(itemQuantity["quantities"][i]);
    }

    var totalPriceTag = document.querySelector(".cart-total-price")
    totalPriceTag.innerHTML = "Total: $" + totalPrice + ".00";
  }
});
