$(document).ready(function() {

    var cartList = document.querySelector(".cart-list");
    //load all cart items when load page
    let cartItems = JSON.parse(localStorage.getItem("cart-items"));
    let itemQuantity = JSON.parse(localStorage.getItem("cart-items-quantity"));
    if (cartItems != null) {
        var totalPrice = 0;
        for (let i = 0; i < cartItems["cartItems"].length; i++) {
            createCartItem(cartItems["cartItems"][i], itemQuantity["quantities"][i]);
            totalPrice +=
                parseInt(cartItems["cartItems"][i].price) *
                parseInt(itemQuantity["quantities"][i]);
        }

        createCheckoutItem(cartItems["cartItems"], itemQuantity["quantities"]);

        var totalPriceTag = document.querySelector(".cart-total-price");
        totalPriceTag.innerHTML = "Total: $" + totalPrice + ".00";

        // add event listeners for checkout buttons
        document.querySelectorAll(".checkout_product").forEach(function(element) {
            element.addEventListener("click", function() {
                createCheckoutItem(cartItems["cartItems"], itemQuantity["quantities"]);
            });
        });

        // add event listeners for process checkout items
        document
            .querySelector(".checkout_order")
            .addEventListener("click", function() {
                var user_id = localStorage.getItem("user_id");
                var cartObj = { "user_id": user_id,"cartItems": cartItems["cartItems"], "quantities": itemQuantity["quantities"] }
                $.ajax({
                    url: "http://localhost:8080/checkout",
                    method: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    data: JSON.stringify(cartObj)
                }).done(function(response) {});

                localStorage.removeItem("cart-items");
                localStorage.removeItem("cart-items-quantity");
                localStorage.removeItem("test");
                localStorage.removeItem("user-id");

                alert("Order Items Success");
            });
    }

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
        div.addEventListener("click", function() {
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

    function removeCartItem(item) {
        var index = cartItems["cartItems"].indexOf(item);
        cartItems["cartItems"].splice(index, 1);
        itemQuantity["quantities"].splice(index, 1);

        localStorage.setItem("cart-items", JSON.stringify(cartItems));
        localStorage.setItem("cart-items-quantity", JSON.stringify(itemQuantity));
    }

    function createCheckoutItem(cartItems, itemQuantity) {
        var tableShoppingCart = document.querySelector(".table-shopping-cart");
        var tr, td, div, img, icon, input;
        var totalPrice = 0;

        for (var i = 0; i < cartItems.length; i++) {
            // table row
            tr = document.createElement("tr");
            tr.setAttribute("class", "table_row");
            // append table row to table body
            tableShoppingCart.appendChild(tr);

            // column 1
            td = document.createElement("td");
            td.setAttribute("class", "column-1 text-center");
            div = document.createElement("div");
            div.setAttribute("class", "how-itemcart1");
            img = document.createElement("img");
            img.setAttribute("src", cartItems[i].image.image1);
            div.appendChild(img);
            td.appendChild(div);
            // append column data to table row
            tr.appendChild(td);

            // column 2
            td = document.createElement("td");
            td.setAttribute("class", "column-2 text-center");
            td.innerHTML = cartItems[i].name;
            // append column data to table row
            tr.appendChild(td);

            // column 3
            td = document.createElement("td");
            td.setAttribute("class", "column-3 text-center");
            td.innerHTML = "$ " + parseInt(cartItems[i].price) + ".00";
            // append column data to table row
            tr.appendChild(td);

            // column 4
            td = document.createElement("td");
            td.setAttribute("class", "column-4 text-center");
            // main div of column
            var mainDiv = document.createElement("div");
            mainDiv.setAttribute("class", "wrap-num-product flex-w m-l-auto m-r-0");
            mainDiv.innerHTML +=
                "<div class='btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m'><i class='fs-16 zmdi zmdi-minus'></i></div>";
            mainDiv.innerHTML +=
                "<input class='mtext-104 cl3 txt-center num-product' id = 'addQuantity' type='number' name='num-product' value='" + itemQuantity[i] + "'/>";
            mainDiv.innerHTML +=
                '<div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"><i class="fs-16 zmdi zmdi-plus"></i></div>';
            // append to column 4
            td.appendChild(mainDiv);
            // append column data to table row
            tr.appendChild(td);

            // column 5
            td = document.createElement("td");
            td.setAttribute("class", "column-5 text-center");
            td.innerHTML =
                "$ " + parseInt(cartItems[i].price) * itemQuantity[i] + ".00";
            //update total price
            totalPrice += parseInt(cartItems[i].price) * itemQuantity[i];
            // append column data to table row
            tr.appendChild(td);
        }

        var subtotal = document.querySelector(".total-price");
        subtotal.innerHTML = "$ " + totalPrice + ".00";
        subtotal.style.fontSize = "20px";
        subtotal.style.fontWeight = "bold";
        subtotal.style.color = "red";
        var total = document.querySelector(".subtotal-price");
        total.innerHTML = "$ " + totalPrice + ".00";
        total.style.fontWeight = "bold";
    }
});