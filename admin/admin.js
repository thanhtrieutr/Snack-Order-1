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



//user
function loadUser() {
    userRank = 0;
    var choiceList = document.getElementsByClassName("choice");
    for (var i = 0; i < choiceList.length; i++) {
        choiceList[i].className = choiceList[i].className.replace(" is-active", "");
    }
    var currentChoice = document.getElementById("users");
    currentChoice.className = currentChoice.className + " is-active";
    removeAll();
    var loadUsers = new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        http.open("POST", "http://127.0.0.1:3000/admin-controller/get-users", true);
        var obj = {};
        obj.token = localStorage.getItem("token");
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

//Function create modal to check user information with user database
function createNewUser(user, currentID) {
    userRank++;
    var newUser = document.createElement('div');
    var userDetail = document.createElement('div');
    userDetail.innerHTML = 
    `<div id="display-container" onclick="showModal('user-detail-${userRank}', 'user-detail-label')">
        <table class="table is-fullwidth">
            <td class="display-item" style="width: 100%;">${user.user}</td>
        </table>
    </div>`
    var userTable = document.createElement('div');
    userTable.innerHTML = 
    `<div id="user-detail-${userRank}" class="modal">
        <div class="columns is-mobile">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title"> <b> User Information </b> </p>
                </header>
                <section class="modal-card-body">
                <div class="columns">
                    <div id="profile-user-picture" class="column is-5">
                        <div id="profile-description"> <u> <b> Profile Picture </b> </u> </div>
                        <div id="profile-border-box">
                            <img id="avatar" class="avatar" src=${user.avatarAddress} alt="User Avatar">
                        </div>
                    </div>
                <div id="profile-user-information" class="column is-7">
                    <div id="profile-description"> <u> <b> Profile Information </b> </u> </div>
                    <div id="user-information-box" class="is-multiline">
                        <div id="user-information" class="columns is-mobile">
                            <div class="property column is-3"> <b> Name: </b> </div>
                            <div class="description column is-9">${user.fullName} </div>
                        </div>  
                        <div id="user-information" class="columns is-mobile">
                            <div class="property column is-3"> <b> Email:</b> </div>
                            <div class="description column is-9"> ${user.user} </div>
                        </div>  
                        <div id="user-information" class="columns is-mobile">
                            <div class="property column is-3"> <b> Phone:</b> </div>
                            <div class="description column is-9"> ${user.phoneNumber} </div>
                        </div> 
                        <div id="user-information" class="columns is-mobile">
                            <div class="property column is-3"> <b> Birthday:</b> </div>
                            <div class="description column is-9"> ${user.birthday} </div>
                        </div> 
                        <div id="user-information" class="columns is-mobile">
                            <div class="property column is-3"> <b> Address:</b> </div>
                            <div class="description column is-9"> ${user.address} </div>
                        </div>          
                </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" onclick="closeModal('user-detail-${userRank}', 'user-detail-label')"> <b> Close </b> </button>
                </footer>
            </div>
        </div>
    </div>`
    newUser.appendChild(userDetail);
    newUser.appendChild(userTable);
    return newUser;
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

//add product
function loadAddForm(){
    var choiceList = document.getElementsByClassName("choice");
    for (var i = 0; i < choiceList.length; i++) {
        choiceList[i].className = choiceList[i].className.replace(" is-active", "");
    }
    var currentChoice = document.getElementById("add-product");
    currentChoice.className = currentChoice.className + " is-active";
    removeAll();
    var inputField = inputNameField();
    document.getElementById("add-product-content").appendChild(inputField);
}

function checkValidProductName() {
    var check;
    var productName = document.getElementById("product-name").value;
    if (productName == "" || productName == null || productName.length > 40) {
        check = true;
    } 
    else {
        check = /[!@#$%^&*_+\-=\[\]{};':"\\|,.<>\/?]/.test(productName);
    }
    if (!check) {
        sendProductname(productName);
    } else {
        alert("Wrong product name");
    }
}

function sendProductname(productName) {
    var sendName = new Promise((resolve, reject) => {
        var http = new XMLHttpRequest();
        http.open("POST", "http://127.0.0.1:3000/admin-controller/check-product-name", true);
        var obj = {};
        obj.token = localStorage.getItem("token");
        obj.productName = productName;
        http.send(JSON.stringify(obj));
        http.onload = () => resolve(http.response);
        http.onerror = () => reject(http.response);
    });
    
    sendName.then((response) => {
        if (response == "OK") {
            afterCheck();
        } 
        else {
            alert("Your new product already exist");
        }
    }).catch((error) => {
        alertError(error);
    });
}

function afterCheck() {
    var button = document.getElementById("submit-name-button");
    button.parentNode.removeChild(button);
    var productName = document.getElementById("product-name").value;
    document.getElementById("input-field").innerHTML = 
    `<input id="product-name" class="input" type="text" value="${productName}" readonly>`
    var infoField = productInfoField();
    document.getElementById("product-field").appendChild(infoField);
    document.getElementById("product-price").focus();
    document.getElementById("product-image").addEventListener("change", addSubmitButton);
}



function productInfoField() {
    var infoField = document.createElement("div");
    infoField.innerHTML = 
    `
    <div class="field is-horizontal">
        <div class="field-label is-medium">
            <label class="label">Product price</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div class="control">
                    <input id="product-price" class="input" type="text" placeholder="*Price in number*" required>
                </div> 
            </div>
        </div>
    </div>
    <div class="file has-name">
        <div class="field-label is-medium">
            <label class="label">Product image</label>
        </div>
        <input type="file" id="product-image">  
    </div>
    `
    return infoField;
}


function addSubmitButton() {
    var newButton = document.getElementById("submit-button");
    if (newButton != null) {
        return;
    }
    var submitContainer = document.createElement('div');
    submitContainer.innerHTML = 
    `<a id="submit-button" class="button is-info" onclick="createProduct()">Submit</a>`
    document.getElementById("product-field").appendChild(submitContainer);
}

function createProduct() {
    var productImage = document.getElementById("product-image").files[0];
    var reader = new FileReader();
    reader.readAsDataURL(productImage);
    reader.onload = function () {
        var object = {
            file: reader.result,
            fileName: productImage.name
        };
        var obj = {};
        obj.token = localStorage.getItem("token");
        obj.productName = document.getElementById("product-name").value;
        obj.productPrice = document.getElementById("product-price").value;
        obj.productImage = object;
        var sendProduct = new Promise((resolve, reject) => {
            var http = new XMLHttpRequest();
            http.open("POST", "http://127.0.0.1:3000/admin-controller/create-new-product", true);
            http.send(JSON.stringify(obj));
            http.onload = () => resolve(http.response);
            http.onerror = () => reject(http.response);
        });
        sendProduct.then((response) => {
            if (response == "OK") {
                alert("Success");
            }
            else {
                alert("Fail");
            } 
        }).catch((error) => {
            alertError(error);
        });
    };
}


function inputNameField(){
    var nameField = document.createElement('div');
    nameField.setAttribute("id","product-field");
    nameField.innerHTML = 
    `<div class="field is-horizontal">
        <div class="field-label is-medium">
            <label class="label">Product name</label>
        </div>
        <div class="field-body">
            <div class="field">
                <div id = "input-field" class="control">
                    <input id="product-name" class="input" type="text" placeholder="*Product name is less than 40 letters*" required>
                </div> 
            </div>
        </div>
    </div>
    <a id="submit-name-button" class="button is-info is-hovered" onclick="checkValidProductName()">Submit</a>
    `
    return nameField;
}

function checkKeyPress(key) {
    var tab = document.getElementById("add-product");
    var checkCurrentTab = tab.className.indexOf("is-active");
    if (key.keyCode == 13 && checkCurrentTab != -1) {
        checkValidProductName();
    }
}

addEventListener("keypress",checkKeyPress);
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