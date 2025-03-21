let button = document.getElementById("showFile");
let title = "";
let composer = "";
let bassClef = [];
let trebleClef = [];

button.addEventListener('click', function(){
    getCredits();
    getNotes();
    console.log(trebleClef);
    console.log(bassClef);
})

function getCredits() {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(sessionStorage.getItem("file"), "text/xml");
    if(xmlDoc.getElementsByTagName("work-title").length != 0) {
        title = xmlDoc.getElementsByTagName("work-title")[0].childNodes[0].nodeValue;
    }
    else if(xmlDoc.getElementsByTagName("credit-type").length != 0) {
        let i = 0;
        while(xmlDoc.getElementsByTagName("credit-type")[i].childNodes[0].nodeValue != "title") {
            i++;
        }
        title = xmlDoc.getElementsByTagName("credit-words")[i].childNodes[0].nodeValue;
    }
    else {
        title = " ";
    }
    document.getElementById("title").innerHTML = title;
    if(xmlDoc.getElementsByTagName("creator").length != 0) {
        composer = xmlDoc.getElementsByTagName("creator")[0].childNodes[0].nodeValue;
    }
    else if(xmlDoc.getElementsByTagName("credit-type").length != 0) {
        let i = 0;
        while(xmlDoc.getElementsByTagName("credit-type")[i].childNodes[0].nodeValue != "composer") {
            i++;
        }
        composer = xmlDoc.getElementsByTagName("credit-words")[i].childNodes[0].nodeValue;
    }
    else {
        composer = " ";
    }
    document.getElementById("composer").innerHTML = composer;
}

function getNotes() {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(sessionStorage.getItem("file"), "text/xml");
    let notes = [];
    let measureCount = 1;
    let measures = [];
    // let bassClef = [];
    // let trebleClef = [];
    let measure = xmlDoc.getElementsByTagName("measure");
    xmlDoc.getElementsByTagName("measure");
    for(let k = 0; k < measure.length; k++) {
        let measureTrebleData = new Measure();
        let measureBassData = new Measure();
        for(let i = 0; i < measure[k].children.length; i++) {
            //console.log(measure[0].children[i].nodeName);
            if(measure[k].children[i].nodeName === "note") {
                let note;
                let alter = 0;
                let octave;
                let chord = false;
                let rest = false;
                let type;
                let staff;
                for(let j = 0; j < measure[k].children[i].children.length; j++) {
                    let currentNode = measure[k].children[i].children[j];
                    if(currentNode.nodeName === "chord") {
                        chord = true;
                    }
                    if(currentNode.nodeName === "rest") {
                        rest = true;
                    }
                    if(currentNode.nodeName === "pitch") {
                        note = currentNode.children[0].innerHTML; // Note
                        if(currentNode.children[1].nodeName === "alter") {
                            alter = currentNode.children[1].innerHTML;
                            octave = currentNode.children[2].innerHTML;
                        }
                        else {
                            octave = currentNode.children[1].innerHTML;
                        }
                    }
                    if(currentNode.nodeName === "type") {
                        type = currentNode.innerHTML; // Note's beat
                    }
                    if(currentNode.nodeName === "staff") {
                        staff = currentNode.innerHTML;
                    }
                }
                if(staff === "1") {
                    measureTrebleData.addNote(new Note(note, alter, chord, rest, octave, type, staff));
                }
                else if(staff === "2") {
                    measureBassData.addNote(new Note(note, alter, chord, rest, octave, type, staff));
                }
                //measureData.addNote(new Note(note, alter, chord, rest, octave, type, staff));
                //console.log(measureData);
            }
        }
        trebleClef.push(measureTrebleData);
        bassClef.push(measureBassData);
        //measures.push(measureData);
    }
    //console.log(measures);
    //return bassClef;
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

function seperateClefs(measures) {
    bassClef = [];
    trebleClef = [];
    for(let i = 0; i < measures.length(); i++) {

    }
}

class Measure {
    notes = [];
    constructor() {
        
    }

    addNote(note) {
        this.notes.push(note);
    }
    
}

class Note {
    octave;
    note;
    alter;
    chord;
    rest;
    type;
    staff;
    constructor(note, alter, chord, rest, octave, type, staff) {
        this.octave = octave;
        this.note = note;
        this.alter = alter;
        this.chord = chord;
        this.type = type;
        this.rest = rest;
        this.staff = staff
    }
}