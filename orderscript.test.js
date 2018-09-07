const passText = 'color: #61B97F';
const failText = 'color: #E42A1B';
//------------------------------------------------------------------------------------------------------------------------


// test function findUserPosition ----------------------------------------------------------------------------------------------
function testFindUserPosition(description, expectation, func) {
    if (func == expectation) {
        console.log(`%cPass: ${description}`, passText);
    }
    else {
        console.log(`%cFail: actual: ${func}, expectation: ${expectation}`, failText);
    }
}

var testVariable = JSON.parse(getItemFromLocal("accountArray"));
testFindUserPosition("Testing findUserPosition function: return correctly", -1, findUserPosition([], getItemFromLocal("currentAccount")));
testFindUserPosition("Testing findUserPosition function: return correctly", -1, findUserPosition(null, getItemFromLocal("currentAccount")));
testFindUserPosition("Testing findUserPosition function: return correctly", -1, findUserPosition(undefined, getItemFromLocal("currentAccount")));
testFindUserPosition("Testing findUserPosition function: return correctly", -1, findUserPosition([], ""));
testFindUserPosition("Testing findUserPosition function: return correctly", -1, findUserPosition(null, null));
testFindUserPosition("Testing findUserPosition function: return correctly", -1, findUserPosition(undefined, undefined));
testFindUserPosition("Testing findUserPosition function: return correctly", -1, findUserPosition(testVariable, ""));
testFindUserPosition("Testing findUserPosition function: return correctly", -1, findUserPosition(testVariable, null));
testFindUserPosition("Testing findUserPosition function: return correctly", -1, findUserPosition(testVariable, undefined));
//------------------------------------------------------------------------------------------------------------------------
function getItemFromLocal(item) {
    return localStorage.getItem(item);
}

// test function getItemfromLocal ----------------------------------------------------------------------------------------------
function testGetItemFromLocal(description, expectation, func) {
    if (func == expectation) {
        console.log(`%cPass: ${description}`, passText);
    }
    else {
        console.log(`%cFail: actual: ${func}, expectation: ${expectation}`, failText);
    }
}

testGetItemFromLocal("Testing getItemFromLocal function: return correctly", null, getItemFromLocal(""));
testGetItemFromLocal("Testing getItemFromLocal function: return correctly", null, getItemFromLocal(null));
testGetItemFromLocal("Testing getItemFromLocal function: return correctly", null, getItemFromLocal(undefined));
//------------------------------------------------------------------------------------------------------------------------



// test function getUserinLocalAccount -------------------------------------------------------------------------------------
function testGetUserInLocalAccount(description, expectation, func) {
    if (func == expectation) {
        console.log(`%cPass: ${description}`, passText);
    }
    else {
        console.log(`%cFail: actual: ${func}, expectation: ${expectation}`, failText);
    }
}

testGetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount([], getItemFromLocal("currentAccount")));
testGetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(null, getItemFromLocal("currentAccount")));
testGetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(undefined, getItemFromLocal("currentAccount")));
testGetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount([], ""));
testGetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(null, null));
testGetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(undefined, undefined));
testGetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(testVariable, ""));
testGetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(testVariable, null));
testGetUserInLocalAccount("Testing getUserInLocalAccount function: return correctly", -1, getUserInLocalAccount(testVariable, undefined));
//------------------------------------------------------------------------------------------------------------------------



// test function totalPrice ----------------------------------------------------------------------------------------------
function testTotalPrice(description, expectation, func) {
    if (func == expectation) {
        console.log(`%cPass: ${description}`, passText);
    }
    else {
        console.log(`%cFail: actual: ${func}, expectation: ${expectation}`, failText);
    }
}

testTotalPrice("Testing totalPrice function: return correctly", "0đ", totalPrice([]));
testTotalPrice("Testing totalPrice function: return correctly", "0đ", totalPrice(null));
testTotalPrice("Testing totalPrice function: return correctly", "0đ", totalPrice(undefined));
//------------------------------------------------------------------------------------------------------------------------


// test function findProductPosition ----------------------------------------------------------------------------------------------
function testFindProductPosition(description, expectation, func) {
    if (func == expectation) {
        console.log(`%cPass: ${description}`, passText);
    }
    else {
        console.log(`%cFail: actual: ${func}, expectation: ${expectation}`, failText);
    }
}

testFindProductPosition("Testing findProductPosition function: return correctly", -1, findProductPosition(getItemFromLocal("currentAccount")));
testFindProductPosition("Testing findProductPosition function: return correctly", -1, findProductPosition(getItemFromLocal("currentAccount"), null));
testFindProductPosition("Testing findProductPosition function: return correctly", -1, findProductPosition(getItemFromLocal("currentAccount"), undefined));
testFindProductPosition("Testing findProductPosition function: return correctly", -1, findProductPosition("", null));
//------------------------------------------------------------------------------------------------------------------------