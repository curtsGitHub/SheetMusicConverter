let button = document.getElementById("showFile");
let title = "";
let composer = "";

button.addEventListener('click', function(){
    console.log(sessionStorage.getItem("file"));
    getData();
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(sessionStorage.getItem("file"), "text/xml");

    document.getElementById("output").innerHTML =
    xmlDoc.getElementsByTagName("sign")[0].childNodes[0].nodeValue;
})

function getData() {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(sessionStorage.getItem("file"), "text/xml");
    let notes = [];
    for(let i = 0; i < 10; i++) {
        if(xmlDoc.getElementById("credit-type")[i].childNodes[0].nodeValue === "title") {
            title = xmlDoc.getElementById("credit-words");
            break;
        }
    }
    console.log(title);
    document.getElementById("output").innerHTML =
    xmlDoc.getElementsByTagName("sign")[0].childNodes[0].nodeValue;

}
