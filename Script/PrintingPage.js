let button = document.getElementById("showFile");
let title = "";
let composer = "";
let notes = [];

button.addEventListener('click', function(){
    getCredits();
    getNotes();
})
function getCredits() {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(sessionStorage.getItem("file"), "text/xml");
    if(xmlDoc.getElementsByTagName("work-title").length != 0) {
        title = xmlDoc.getElementsByTagName("work-title")[0].childNodes[0].nodeValue;
    }
    else if(xmlDoc.getElementsByTagName("credit-type") != null) {
        let i = 0;
        while(xmlDoc.getElementsByTagName("credit-type")[i].childNodes[0].nodeValue != "title") {
            i++;
        }
        title = xmlDoc.getElementsByTagName("credit-words")[i].childNodes[0].nodeValue;
    }
    document.getElementById("title").innerHTML = title;
    if(xmlDoc.getElementsByTagName("creator").length != 0) {
        composer = xmlDoc.getElementsByTagName("creator")[0].childNodes[0].nodeValue;
    }
    else if(xmlDoc.getElementsByTagName("credit-type") != null) {
        let i = 0;
        while(xmlDoc.getElementsByTagName("credit-type")[i].childNodes[0].nodeValue != "composer") {
            i++;
        }
        composer = xmlDoc.getElementsByTagName("credit-words")[i].childNodes[0].nodeValue;
    }
    document.getElementById("composer").innerHTML = composer;
}
function getNotes() {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(sessionStorage.getItem("file"), "text/xml");
    let notes = [];
    let measureCount = 1;
    let noteData = [];
    let measure = xmlDoc.getElementsByTagName("measure");
    console.log(measure[0]);
    for(let i = 0; i < measure[0].children.length; i++) {
        //console.log(measure[0].children[i].nodeName);
        if(measure[0].children[i].nodeName === "note") {
            if(measure[0].children[i].children[0].nodeName === "pitch") {
                //console.log(i);
                noteData.push(measure[0].children[i].children[0].children[0].innerHTML);
                noteData.push(measure[0].children[i].children[0].children[1].innerHTML);
                notes.push(noteData);
            }
        }
    }
    // console.log(notes.length);
    // for(let i = 0; i < notes.length; i++) {
    //     console.log(notes[i][0]);
    // }
    // console.log(measure);
    // let note = measure.childNodes[0];
    // console.log(note);
    // let pitch = note.childNodes;
    // noteData.push(pitch[0].childNodes);
    // notes.push(noteData);
    // console.log(notes[0][0]);
}
