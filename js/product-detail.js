$(document).ready(function () {
  var cartList = document.querySelector(".cart-list");

  var id = localStorage.getItem("product-detail-id");
  $.ajax({
    url: "http://localhost:8080/product/" + id,
    method: "GET",
  }).done(function (response) {
    let optionElement;

    var item = response.data;
    localStorage.setItem("product-detail", JSON.stringify(item));

    document.querySelector(".product-detail-name-link").innerHTML = item.name;

    var productName = document.querySelector(".product-detail-name");
    productName.innerHTML = item.name;

    var productCategory = document.querySelector(".product-detail-category");
    productCategory.innerHTML += item.category.name;
    productCategory.innerHTML +=
      "<i class='fa fa-angle-right m-l-9 m-r-10' aria-hidden='true'> </i>";

    var productPrice = document.querySelector(".product-detail-price");
    productPrice.innerHTML = "$" + item.price;
    productPrice.style.color = "red";
    productPrice.style.fontWeight = "bold";
    productPrice.style.fontSize = "30px";

    var productDescription = document.querySelectorAll(
      ".product-detail-description"
    );
    for (var i = 0; i < productDescription.length; i++) {
      productDescription[i].innerHTML = item.description;
    }

    var productSize = document.querySelectorAll(".product-detail-size");
    for (var i = 0; i < productSize.length; i++) {
      optionElement = document.createElement("option");
      optionElement.innerHTML = item.size.name;

      if (i < 1) {
        optionElement.style.fontWeight = "bold";
        optionElement.style.fontSize = "20px";
        optionElement.style.padding = "5px";
        optionElement.style.textTransform = "uppercase";
      }
      productSize[i].appendChild(optionElement);
    }

    var productColor = document.querySelectorAll(".product-detail-color");
    for (var i = 0; i < productColor.length; ++i) {
      optionElement = document.createElement("option");
      optionElement.innerHTML = item.color.name;

      if (i < 1) {
        optionElement.style.fontWeight = "bold";
        optionElement.style.fontSize = "20px";
        optionElement.style.padding = "5px";
        optionElement.style.textTransform = "uppercase";
      }
      productColor[i].appendChild(optionElement);
    }

    let productThumb;
    let productImage;
    let productImageZoom;

    // Thumbnail, Image1 of product
    productThumb = document.querySelector(".product-detail-thumb1");
    productThumb.setAttribute("data-thumb", item.image.image1);
    productImage = document.querySelector(".product-detail-image1");
    productImage.setAttribute("src", item.image.image1);
    productImageZoom = document.querySelector(".product-detail-image1-zoom");
    productImageZoom.setAttribute("href", item.image.image1);

    // Thumbnail, Image2 of product
    productThumb = document.querySelector(".product-detail-thumb2");
    productThumb.setAttribute("data-thumb", item.image.image2);
    productImage = document.querySelector(".product-detail-image2");
    productImage.setAttribute("src", item.image.image2);
    productImageZoom = document.querySelector(".product-detail-image2-zoom");
    productImageZoom.setAttribute("href", item.image.image2);

    // Thumbnail, Image3 of product
    productThumb = document.querySelector(".product-detail-thumb3");
    productThumb.setAttribute("data-thumb", item.image.image3);
    productImage = document.querySelector(".product-detail-image3");
    productImage.setAttribute("src", item.image.image3);
    productImageZoom = document.querySelector(".product-detail-image3-zoom");
    productImageZoom.setAttribute("href", item.image.image3);

    var slickDots = document.querySelector(".wrap-slick3-dots");
    var listDots = slickDots.firstChild;
    listDots.childNodes[0].firstChild.setAttribute("src", item.image.image1);
    listDots.childNodes[1].firstChild.setAttribute("src", item.image.image2);
    listDots.childNodes[2].firstChild.setAttribute("src", item.image.image3);

    relatedItems(item.category.id, item.id);

    function relatedItems(category, currItemId) {
      $.ajax({
        url: "http://localhost:8080/product/relateItem/?categoryId=" +
          category +
          "&currentProductId=" +
          currItemId,
        method: "GET",
      }).done(function (response) {
        var items = response.data;

        for (var i = 0; i < items.length; ++i) {
          let wrapSlick = document.getElementById("items-detail");

          var quarter = document.createElement("div");
          quarter.setAttribute(
            "class",
            "col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item"
          );
          //   quarter.style.width = "272px";
          //   quarter.setAttribute("data-slick-index", i);
          // //   if(i <= 4){
          //     quarter.setAttribute("tabindex" , "0");
          //     quarter.setAttribute("aria-hidden", "false");
          //   }else{
          //     quarter.setAttribute("aria-hidden", "true");
          //     quarter.setAttribute("tabindex", "-1");
          //   }

          let rootElement = document.createElement("div");
          rootElement.setAttribute("class", "block2");

          // list products by category id
          // upper side of product detail
          div = document.createElement("div");
          div.setAttribute("class", "block2-pic hov-img0");
          // feature detail of div 1
          img = document.createElement("img");
          img.setAttribute("src", items[i].image.image1);
          img.style.width = "20rem";
          img.style.height = "25rem";
          img.setAttribute("alt", "IMG-PRODUCT");

          let link = document.createElement("a");
          link.setAttribute(
            "class",
            "block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
          );
          link.setAttribute("href", "product-detail.html");
          productDetail(link, items[i].id);
          link.innerHTML = "Quick View";

          div.appendChild(img);
          div.appendChild(link);
          rootElement.appendChild(div);

          // lower side of product detail
          let rootElement2 = document.createElement("div");
          rootElement2.setAttribute("class", "block2-txt flex-w flex-t p-t-14");

          div = document.createElement("div");
          div.setAttribute("class", "block2-txt-child1 flex-col-l");

          link = document.createElement("a");
          link.setAttribute(
            "class",
            "stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
          );
          link.setAttribute("href", "product-detail.html");
          productDetail(link, items[i].id);
          link.innerHTML = items[i].name;

          span = document.createElement("span");
          span.setAttribute("class", "stext-105 cl3");
          span.style.color = "red";
          span.innerHTML = "$" + items[i].price;
          span.style.fontWeight = "bold";
          span.style.fontSize = "20px";

          div.appendChild(link);
          div.appendChild(span);
          rootElement2.appendChild(div);

          div = document.createElement("div");
          div.setAttribute("class", "block2-txt-child2 flex-r p-t-3");
          link = document.createElement("a");
          link.setAttribute(
            "class",
            "btn-addwish-b2 dis-block pos-relative js-addwish-b2"
          );
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
          wrapSlick.appendChild(quarter);
        }

        function productDetail(link, id) {
          link.addEventListener("click", function () {
            localStorage.setItem("product-detail-id", id);
          });
        }
      });
    }
  });

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

  function removeCartItem(item) {
    var index = cartItems["cartItems"].indexOf(item);
    cartItems["cartItems"].splice(index, 1);
    itemQuantity["quantities"].splice(index, 1);

    document.querySelector(".cart-total-price").innerHTML = "";

    localStorage.setItem("cart-items", JSON.stringify(cartItems));
    localStorage.setItem("cart-items-quantity", JSON.stringify(itemQuantity));
  }

  function countTotalPrice(cartItems, itemQuantity) {
    var totalPrice = 0;
    for (let i = 0; i < cartItems["cartItems"].length; i++) {
      totalPrice +=
        parseInt(cartItems["cartItems"][i].price) *
        parseInt(itemQuantity["quantities"][i]);
    }
    var totalPriceTag = document.querySelector(".cart-total-price");
    totalPriceTag.innerHTML = "Total: $" + totalPrice + ".00";
  }

  //load all cart items when load page
  let cartItems = JSON.parse(localStorage.getItem("cart-items"));
  let itemQuantity = JSON.parse(localStorage.getItem("cart-items-quantity"));
  if (cartItems != null) {
    var totalPrice = 0;
    for (let i = 0; i < cartItems["cartItems"].length; i++) {
      createCartItem(cartItems["cartItems"][i], itemQuantity["quantities"][i]);
    }

    countTotalPrice(cartItems, itemQuantity);
  }

  // shopping-cart quick-view
  var cartBtn = document.querySelector(".cart-btn");
  cartBtn.addEventListener("click", function () {
    var item = JSON.parse(localStorage.getItem("product-detail"));

    // localStorage.removeItem("cart-items");
    // localStorage.removeItem("cart-items-quantity");

    cartItems = '{"cartItems":[]}';
    itemQuantity = '{"quantities":[]}';

    var list = localStorage.getItem("cart-items");
    if (list != null) {
      cartItems = JSON.parse(localStorage.getItem("cart-items"));
      itemQuantity = JSON.parse(localStorage.getItem("cart-items-quantity"));
    } else {
      cartItems = JSON.parse(cartItems);
      itemQuantity = JSON.parse(itemQuantity);
    }

    // var object = JSON.parse(cartItems);
    // cartItems['cartItems'].push(item);
    // console.log(cartItems);
    // console.log(JSON.stringify(object));

    var index = cartItems["cartItems"].findIndex((object) => {
      return object.id === item.id;
    });

    var addQuantity = 1;
    if (document.getElementById("addQuantity") != null) {
      addQuantity = parseInt(document.getElementById("addQuantity").value);
    }
    if (index > -1) {
      var quantity = itemQuantity["quantities"][parseInt(index)];
      itemQuantity["quantities"][parseInt(index)] =
        parseInt(quantity) + addQuantity;
      addQuantity = parseInt(quantity) + addQuantity;

      document.getElementById(item.id).innerHTML =
        addQuantity +
        " x " +
        "$" +
        parseInt(item.price) * itemQuantity["quantities"][parseInt(index)] +
        ".00";
    } else {
      cartItems["cartItems"].push(item);
      itemQuantity["quantities"].push(addQuantity);

      createCartItem(item, addQuantity);
    }

    countTotalPrice(cartItems, itemQuantity);
    console.log(cartItems)
    localStorage.setItem("cart-items", JSON.stringify(cartItems));
    localStorage.setItem("cart-items-quantity", JSON.stringify(itemQuantity));

  });
});