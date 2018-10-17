function showContent(event, id, displayStyle){
    var temporaryArray = document.getElementsByClassName("tab");
    for (var i=0; i<temporaryArray.length; i++) {
        // debugger    
        temporaryArray[i].style.display = "none";
        // var c = arr[i].children;
        // // debugger;
        // // var a = c[0].id;
        // // document.getElementById(a).style.display  = "none";
        // c[0].style.display = "none";
    }
    temporaryArray = document.getElementsByClassName("detail");
    for (var i=0; i<temporaryArray.length; i++) {
        temporaryArray[i].style.display = "none";
    }
    temporaryArray = document.getElementsByClassName("menu-label");
    for (var i=0; i<temporaryArray.length; i++) {
        temporaryArray[i].style.display = "none";
    }
    // debugger
    document.getElementById(id).style.display = displayStyle;
    // for (var i=0; i<arr.length; i++) {
    //     arr[i].style.display = displayStyle;
    // }
    temporaryArray = document.getElementsByClassName("choice");
    for (var i=0; i<temporaryArray.length; i++) {
        temporaryArray[i].className = temporaryArray[i].className.replace(" is-active","");
    }
    event.currentTarget.className += " is-active";
}

function showDetail(id){
    var currentId = id + "-label";
    document.getElementById(currentId).style.display = "block";

    var current = document.getElementById(id);
    if (current.style.display == "none") {
        current.style.display = "table";
    }
    else {
        current.style.display = "none";
        var temporaryArray = document.getElementsByClassName("menu-label");
        for (var i=0; i<temporaryArray.length; i++) {
            temporaryArray[i].style.display = "none";
        }
    }
}