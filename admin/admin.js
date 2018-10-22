loadTodayOrders();

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

function removeOneContainer(id) {
    var myNode = document.getElementById(id);
    myNode.innerHTML = "";
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

//products
function loadProduct() {
    var choiceList = document.getElementsByClassName("choice");
    for (var i = 0; i < choiceList.length; i++) {
        choiceList[i].className = choiceList[i].className.replace(" is-active", "");
    }
    var currentChoice = document.getElementById("product");
    currentChoice.className = currentChoice.className + " is-active";
    removeAll();
    var loadProducts = new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        http.open("POST", "http://127.0.0.1:3000/admin/products", true);
        var obj = {};
        obj.token = "token";
        http.send(JSON.stringify(obj));
        http.onload = () => resolve(http.response);
        http.onerror = () => reject(http.response);
    });
    loadProducts.then((response) => {
        var listProduct = JSON.parse(response);
        var contentContainer = document.getElementById("product-content");
        if (contentContainer.style.display == "none" || contentContainer.style.display == "") {
            contentContainer.style.display = "block";
        }
        listProduct.forEach(product => {
            var newProduct = createNewProduct(product, product._id);
            contentContainer.appendChild(newProduct);
        });
        document.getElementById("user-content").style.display = "none";
    }).catch((error) => {
        alertError(error);
    });
}

function createNewProduct(product, currentID) {
    var newProduct = document.createElement('div');
    var productDetail = document.createElement('div');
    productDetail.innerHTML =
        `<div id="display-container" onclick="showDetail('product-detail-${currentID}', 'product-detail-label')">
        <table class="table is-fullwidth">
            <td class="display-item" style="width: 60%;">${product.name}</td>
            <td class="display-item" style="width: 40%;">${product.price}</td>
        </table>
    </div>`
    var productTable = document.createElement('div');
    productTable.innerHTML =
        `<div id="product-detail-${currentID}" class="detail">
        <table class="table is-striped is-fullwidth">
            <tr class="has-background-grey-lighter">
                <th style="width: 50%;">Product name</th>
                <th style="width: 20%;">Unit price</th>
                <th style="width: 30%;">Image</th>
            </tr> 
            <tr>
                <td style="width: 50%;">${product.name}</td>
                <td style="width: 20%;">${product.price}</td>
                <td style="width: 30%;">${product.img}</td>
            </tr>
        </table>
    </div>`
    newProduct.appendChild(productDetail);
    newProduct.appendChild(productTable);
    return newProduct;
}

//user
function loadUser() {
    var choiceList = document.getElementsByClassName("choice");
    for (var i = 0; i < choiceList.length; i++) {
        choiceList[i].className = choiceList[i].className.replace(" is-active", "");
    }
    var currentChoice = document.getElementById("users");
    currentChoice.className = currentChoice.className + " is-active";
    removeAll();
    var loadUsers = new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        http.open("POST", "http://127.0.0.1:3000/admin/users", true);
        var obj = {};
        obj.token = "token";
        http.send(JSON.stringify(obj));
        http.onload = () => resolve(http.response);
        http.onerror = () => reject(http.response);
    });
    loadUsers.then((response) => {
        var listUser = JSON.parse(response);
        var contentContainer = document.getElementById("user-content");
        if (contentContainer.style.display == "none" || contentContainer.style.display == "") {
            contentContainer.style.display = "block";
        }
        listUser.forEach(user => {
            var newUser = createNewUser(user, user._id);
            contentContainer.appendChild(newUser);
        });
        document.getElementById("product-content").style.display = "none";
    }).catch((error) => {
        alertError(error);
    });
}

function createNewUser(user, currentID) {
    var newUser = document.createElement('div');
    var userDetail = document.createElement('div');
    userDetail.innerHTML =
        `<div id="display-container" onclick="showDetail('user-detail-${currentID}', 'user-detail-label')">
        <table class="table is-fullwidth">
            <td class="display-item" style="width: 100%;">${user.user}</td>
        </table>
    </div>`
    var userTable = document.createElement('div');
    userTable.innerHTML =
        `<div id="user-detail-${currentID}" class="detail">
        <table class="table is-striped is-fullwidth">
            <tr class="has-background-grey-lighter">
                <th style="width: 16%;">Username</th>
                <th style="width: 16%;">Full name</th>
                <th style="width: 16%;">Phone</th>
                <th style="width: 20%;">Address</th>
                <th style="width: 16%;">Birthday</th>
                <th style="width: 16%;">Avatar</th>
            </tr> 
            <tr>
                <td style="width: 16%;">${user.user}</td>
                <td style="width: 16%;">${user.fullName}</td>
                <td style="width: 16%;">${user.phoneNumber}</td>
                <td style="width: 20%;">${user.address}</td>
                <td style="width: 16%;">${user.birthday}</td>
                <td style="width: 16%;">${user.avatarAddress}</td>
            </tr>
        </table>
    </div>`
    newUser.appendChild(userDetail);
    newUser.appendChild(userTable);
    return newUser;
}

//today-order
function loadTodayOrders() {
    var choiceList = document.getElementsByClassName("choice");
    for (var i = 0; i < choiceList.length; i++) {
        choiceList[i].className = choiceList[i].className.replace(" is-active", "");
    }
    var currentChoice = document.getElementById("today-order");
    currentChoice.className = currentChoice.className + " is-active";
    removeAll();
    var loadTodayOrder = new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        http.open("POST", "http://127.0.0.1:3000/admin/get-today-order", true);
        var obj = {};
        obj.token = "token";
        http.send(JSON.stringify(obj));
        http.onload = () => resolve(http.response);
        http.onerror = () => reject(http.response);
    });

    loadTodayOrder.then((response) => {
        var listProduct = JSON.parse(response);
        var productContainer = document.getElementById("today-content-container");
        var tableHeader = createTable();
        productContainer.appendChild(tableHeader);
        var productTable = document.getElementById("today-content");
        listProduct.forEach(product => {
            var newProduct = createTodayOrderProduct(product);
            productTable.appendChild(newProduct);
        });
    }).catch((error) => {
        alertError(error);
    });

}

function createTable() {
    var newTable = document.createElement("table");
    newTable.setAttribute("id", "today-content");
    newTable.setAttribute("class", "tab table is-striped is-fullwidth");
    newTable.innerHTML =
        `<tr class="has-background-grey-lighter">
            <th>Product name</th>
            <th>Quantity</th>
            <th>Unit price</th>
            <th>Total</th>
            <th>Buyer</th>
            <th>Actions</th>
        </tr> `
    return newTable;
}

function createTodayOrderProduct(product) {
    var newProduct = document.createElement("TR");
    newProduct.innerHTML =
        `<td>${product.name}</td>
    <td>${product.amount}</td>
    <td>${product.price}</td>
    <td>${product.totalPrice}</td>
    <td>${product.user}</td>
    <td>${product.state}</td>`;
    return newProduct;
}

//Fix burger responsive ---------------------------------------------------------------------
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
    // body.style.overflowY = "auto";
}

function fixBurgerToMobile(menu, body) {
    menu.style.position = "fixed";
    menu.style.width = "100%";
    menu.style.top = "52px";
    body.style.overflowY = "hidden";
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