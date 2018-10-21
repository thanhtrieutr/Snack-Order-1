loadTodayOrders();

function showDetail(id, labelID){
    var current = document.getElementById(id);
    if (current.style.display == "none" || current.style.display == "") {
        var temporaryArray = document.getElementsByClassName("detail");
        for (var i = 0; i < temporaryArray.length; i++) {
            document.getElementById(temporaryArray[i].id).style.display = "none";
        }
        document.getElementById(labelID).style.display = "block";
        current.style.display = "table";
    }
    else {
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
    for (var i = 0; i<temporaryArray.length; i++) {
        removeOneContainer(temporaryArray[i].id);
    }
    temporaryArray = document.getElementsByClassName("menu-label");
    for (var i = 0; i<temporaryArray.length; i++) {
        document.getElementById(temporaryArray[i].id).style.display = "none";
    }
}

//products
function loadProduct(){
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
function loadUser(){
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
function loadTodayOrders(){
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
        obj.token = localStorage.getItem("token");
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

function createTable(){
    var newTable = document.createElement("table");
    newTable.setAttribute("id", "today-content");
    newTable.setAttribute("class", "tab table is-striped is-fullwidth" );
    newTable.innerHTML = 
        `<tr class="has-background-grey-lighter">
            <th>Product name</th>
            <th>Quantity</th>
            <th>Unit price</th>
            <th>Total</th>
            <th>Buyer</th>
            <th>Actions</th>
            <th>Time</th>
        </tr> `
    return newTable;                   
}

function createTodayOrderProduct(product) {
    var newProduct = document.createElement("TR");
    newProduct.innerHTML =
    `<td>${product.name}</td>
    <td>${product.quantity}</td>
    <td>${product.price}</td>
    <td>${product.totalPrice}đ</td>
    <td>${product.user}</td>
    <td>${product.status}</td>
    <td>${product.time}</td>`;
    return newProduct;
}