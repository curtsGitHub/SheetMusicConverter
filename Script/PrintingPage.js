let button = document.getElementById("showFile");
let title = "";
let composer = "";
let measures = [];

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
    let measure = xmlDoc.getElementsByTagName("measure");
    xmlDoc.getElementsByTagName("measure");
    for(let k = 0; k < measure.length; k++) {
        let measureData = new Measure();
        for(let i = 0; i < measure[k].children.length; i++) {
            //console.log(measure[0].children[i].nodeName);
            if(measure[k].children[i].nodeName === "note") {
                let note;
                let alter = 0;
                let octave;
                let chord = false;
                let rest = false;
                let type;
                let j = 0;
                for(let j = 0; j < measure[k].children[i].children.length; j++) {
                    if(measure[k].children[i].children[j].nodeName === "chord") {
                        chord = true;
                    }
                    if(measure[k].children[i].children[j].nodeName === "rest") {
                        rest = true;
                    }
                    if(measure[k].children[i].children[j].nodeName === "pitch") {
                        note = measure[k].children[i].children[j].children[0].innerHTML; // Note
                        if(measure[k].children[i].children[j].children[1].nodeName === "alter") {
                            alter = measure[k].children[i].children[j].children[1].innerHTML;
                            octave = measure[k].children[i].children[j].children[2].innerHTML;
                        }
                        else {
                            octave = measure[k].children[i].children[j].children[1].innerHTML;
                        }
                    }
                    if(measure[k].children[i].children[j].nodeName === "type") {
                        type = measure[k].children[i].children[j].innerHTML; // Note's beat
                    }
                }
                measureData.addNote(new Note(note, alter, chord, rest, octave, type));
                //console.log(measureData);
            }
        }
        measures.push(measureData);
    }
    console.log(measures);
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
    constructor(note, alter, chord, rest, octave, type) {
        this.octave = octave;
        this.note = note;
        this.alter = alter;
        this.chord = chord;
        this.type = type;
        this.rest = rest;
    }
}