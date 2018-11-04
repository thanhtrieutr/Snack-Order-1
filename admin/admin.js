//Utilities variable for all admin page function
var orderIdList = [];
var userList = [];
var productRank;
var userRank;

//showDetail for toggle order history detail table
function showDetail(id, labelID) {
    var current = document.getElementById(id);
    if (current.style.display == "none" || current.style.display == "") {
        var temporaryArray = document.getElementsByClassName("detail");
        for (var i = 0; i < temporaryArray.length; i++) {
            document.getElementById(temporaryArray[i].id).style.display = "none";
        }
        document.getElementById(labelID).style.display = "block";
        current.style.display = "table";
    } else {
        document.getElementById(labelID).style.display = "none";
        current.style.display = "none";
    }
}

//showModal and closeModal function for toggle product and user modal box
function showModal(id, labelID){
    var current = document.getElementById(id);
    var temporaryArray = document.getElementsByClassName("modal");
    for (var i = 0; i < temporaryArray.length; i++) {
        document.getElementById(temporaryArray[i].id).style.display = "none";
    }
    document.getElementById(labelID).style.display = "none";
    current.style.display = "none";
    if (current.style.display == "none") {        
        document.getElementById(labelID).style.display = "block";
        current.style.display = "inline-block";
    }
}
function closeModal(id, labelID) {
    var current = document.getElementById(id);
    var temporaryArray = document.getElementsByClassName("modal");
    if (current.style.display == "inline-block") {      
        for (var i = 0; i < temporaryArray.length; i++) {
            document.getElementById(temporaryArray[i].id).style.display = "none";
        }
        document.getElementById(labelID).style.display = "none";
        current.style.display = "none";
    }
}

//removeAll function for displaying element in admin
function removeOneContainer(id) {
    var myNode = document.getElementById(id);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function removeAll() {
    var temporaryArray = document.getElementsByClassName("tab");
    for (var i = 0; i < temporaryArray.length; i++) {
        removeOneContainer(temporaryArray[i].id);
    }
    temporaryArray = document.getElementsByClassName("menu-label");
    for (var i = 0; i < temporaryArray.length; i++) {
        document.getElementById(temporaryArray[i].id).style.display = "none";
    }
}

//Fix burger responsive 
document.getElementById('navbar-burger').addEventListener('click', showBurger);

//> Show/hide burger when click
function showBurger() {
    var burger = document.getElementById('navbar-burger');
    var menu = document.getElementById('nav-menu');
    var body = document.getElementsByTagName("HTML")[0];

    if (burger.className.match("is-active")) {
        burger.className = burger.className.replace(" is-active", "");
        menu.style.display = "none";
        fixBurgerToDesktop(menu, body);
    } else {
        burger.className += " is-active";
        menu.style.display = "block";
        fixBurgerToMobile(menu, body);
    }
}
//> Set values for Burger UI in specific cases
function fixBurgerToDesktop(menu, body) {
    menu.style.position = "relative";
    menu.style.width = "16.66667%";
    menu.style.top = "0";
}

function fixBurgerToMobile(menu, body) {
    menu.style.position = "fixed";
    menu.style.width = "100%";
    menu.style.top = "52px";
}
//> Set UI when resize window
function fixBurgerDisplay(billOrder) {
    var burger = document.getElementById('navbar-burger');
    burger.className = burger.className.replace(" is-active", "");

    var menu = document.getElementById('nav-menu');
    var body = document.getElementsByTagName("BODY")[0];

    if (billOrder.matches) {
        body.style.position = "sticky";
        menu.style.display = "block";
        fixBurgerToDesktop(menu, body);
    } else {
        menu.style.display = "none";
        fixBurgerToMobile(menu, body);
    }
}
//> Catch window's size
var desktopDisplay = window.matchMedia("(min-width: 1088px)");
var mobileDisplay = window.matchMedia("(min-width: 100px)");

fixBurgerDisplay(desktopDisplay);
fixBurgerDisplay(mobileDisplay)

desktopDisplay.addListener(fixBurgerDisplay);
mobileDisplay.addListener(fixBurgerDisplay);

//> Hide menu when window's size < 1088px
function autoHide() {
    if (window.matchMedia("(max-width: 1088px)").matches) {
        document.getElementById("nav-menu").style.display = "none";
    }
}
autoHide();
//-------------------------------------------------------------------------------------


function createUserContainer(oneOrder, currentId) {
    var userOrder = document.createElement("div");
    userOrder.setAttribute("id", "display-container");
    userOrder.setAttribute("onclick", `showDetail('order-detail-${currentId}', "order-detail-label")`);
    userOrder.innerHTML = 
    `<table class="table is-fullwidth"> 
        <tbody>
            <tr>
                <td class="display-item" style="width: 30%;">
                    ${oneOrder.user}
                </td>
                <td class="display-item" style="width: 35%;">
                    Total: ${displayPrice(oneOrder.actualTotalPrice)}
                </td>
                <td class="display-item" style="width: 35%;">
                    Time: ${oneOrder.time}
                </td>
            </tr>
        </tbody>
    </table>`;
    return userOrder;
}
function createRowProdct(oneProduct) {
    var oneRowProduct = document.createElement('TR');
    oneRowProduct.innerHTML = 
    `<td>${oneProduct.name}</td>
    <td>${oneProduct.quantity}</td>
    <td>${displayPrice(oneProduct.price)}</td>
    <td>${displayPrice(oneProduct.totalPrice)}</td>
    <td>${oneProduct.status}</td>`;
    return oneRowProduct;
}
function createOrderDetail(oneOrder, currentId) {
    var orderDetail = document.createElement('div');
    orderDetail.setAttribute("id", `order-detail-${currentId}`);
    orderDetail.setAttribute("class", "detail");

    var orderTable = document.createElement('TABLE');
    orderTable.setAttribute("class", "table is-striped is-fullwidth");

    var oneRow = document.createElement("TR");
    oneRow.setAttribute("class", "has-background-grey-lighter");
    oneRow.innerHTML = `<th>Product name</th>
    <th>Quantity</th>
    <th>Unit price</th>
    <th>Total</th>
    <th>Actions</th>`;
    orderTable.appendChild(oneRow);

    for (var i in oneOrder.products) {
        oneRow = createRowProdct(oneOrder.products[i]);
        orderTable.appendChild(oneRow);
    }

    orderDetail.appendChild(orderTable);
    return orderDetail;
}
function loadOrderHistory() {
    var choiceList = document.getElementsByClassName("choice");
    for (var i = 0; i < choiceList.length; i++) {
        choiceList[i].className = choiceList[i].className.replace(" is-active", "");
    }
    var currentChoice = document.getElementById("order-history");
    currentChoice.className = currentChoice.className + " is-active";
    removeAll();
    var loadOrder = new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        http.open("POST", "http://127.0.0.1:3000/admin-controller/get-order-history", true);
        var obj = {};
        obj.token = localStorage.getItem("token");
        http.send(JSON.stringify(obj));
        http.onload = () => resolve(http);
        http.onerror = () => reject(http.response);
    });

    loadOrder.then((http) => {
        if (http.status == 200) {
            var response = http.response;
        }
        else {
            alertError(http.response);
            return;
        }
        var listProduct = JSON.parse(response);
        var orderContainer = document.getElementById("order-content");
        var currentId = 0;
        listProduct.reverse();
        listProduct.forEach(oneOrder => {
            var oneUserContainer = createUserContainer(oneOrder, currentId);
            var oneOrderDetail = createOrderDetail(oneOrder, currentId);
            var oneDiv = document.createElement("div");
            oneDiv.appendChild(oneUserContainer);
            oneDiv.appendChild(oneOrderDetail);
            currentId++;
            orderContainer.appendChild(oneDiv);
        });
    }).catch((error) => {
        alertError(error);
    });
}