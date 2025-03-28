let button = document.getElementById("showFile");
let title = "";
let composer = "";
let bassClef = [];
let trebleClef = [];

button.addEventListener('click', function(){
    getCredits();
    getNotes();
    createSheetMusic(trebleClef, bassClef);
    console.log(trebleClef);
    console.log(bassClef);
})

function createSheetMusic(trebleClef, bassClef) {
    console.log(trebleClef);
    for(let i = 0; i < trebleClef.length; i++) {
        for(let j = 0; j < trebleClef[i].notes.length; j++) {
            let newDiv = document.createElement("div");
            let newContent = document.createTextNode(trebleClef[i].notes[j].note);

            // add the text node to the newly created div
            newDiv.appendChild(newContent);
            let currentDiv = document.getElementById("container");
            document.body.insertBefore(newDiv, currentDiv);
            console.log(trebleClef[i].notes[j].note);
        }
    }
}
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
        title = "_";
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
        composer = "_";
    }
    document.getElementById("composer").innerHTML = composer;
}

function getNotes() {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(sessionStorage.getItem("file"), "text/xml");
    let notes = [];
    let measureCount = 1;
    let measures = [];
    let prevNote = new Note();
    // let bassClef = [];
    // let trebleClef = [];
    let measure = xmlDoc.getElementsByTagName("measure");
    xmlDoc.getElementsByTagName("measure");
    
    for(let k = 0; k < measure.length; k++) {
        let measureTrebleData = new Measure("treble");
        let measureBassData = new Measure("bass");
        let firstChord = true;
        let addChord = false;
        let chordNotes;
        //console.log(measure[k]);
        for(let i = 0; i < measure[k].children.length-1; i++) {
            //console.log(i);
            //console.log(measure[0].children[i].nodeName);
            if(measure[k].children[i].nodeName === "note") {
                let note = getNote(measure[k].children[i]);
                let nextNote = getNote(measure[k].children[i+1]);
                if(note.chord && firstChord) {
                    firstChord = false;
                    addChord = true;
                    chordNotes = new Chord(prevNote);
                }
                if(note.chord) {
                    chordNotes.addNote(note);
                }
                else {
                    //console.log(chordNotes)
                    //console.log(note);
                    if(chordNotes != null) {
                        firstChord = true;
                        addChord = false;
                        if(chordNotes.getStaff === "1") {
                            //measureTrebleData.removeLast();
                            measureTrebleData.addChord(chordNotes);
                        }
                        else {
                            //measureBassData.removeLast();
                            measureBassData.addChord(chordNotes);
                            //console.log(measureBassData);
                        }

                    }
                    if(note.staff === "1" && nextNote.chord == false) {
                        measureTrebleData.addNote(note);
                    }
                    else if(note.staff === "2" && nextNote.chord == false) {
                        //console.log(note);
                        measureBassData.addNote(note);
                    }
                }
                prevNote = note;
                //measureData.addNote(new Note(note, alter, chord, rest, octave, type, staff));
                //console.log(measureData);
            }
        }
        if(measure[k].children[measure[k].children.length-1].nodeName === "note") {
            let note = getNote(measure[k].children[measure[k].children.length-1]);
            //console.log("WOW")
            //console.log(measureBassData);
            //console.log("__________________")
            if(note.chord) {
                addChord = false;
                chordNotes.addNote(note);
                if(note.staff === "1") {
                    measureTrebleData.addChord(chordNotes);
                }
                else if(note.staff === "2") {
                    //console.log(note);
                    measureBassData.addChord(chordNotes);
                }
            }
        }
        if(chordNotes != null && addChord == true) {
            //console.log("ADDED NOTES");
            //console.log(k);
            //console.log(addChord)
            if(chordNotes.notes[0].staff === "1") {
                measureTrebleData.addChord(chordNotes);
            }
            else if(chordNotes.notes[0].staff === "2") {
                measureBassData.addChord(chordNotes)
            }
            //console.log(measureBassData);
        }

        if(measureTrebleData != null && measureTrebleData.notes.length != 0) {
            trebleClef.push(measureTrebleData);
        }
        if(measureBassData != null && measureBassData.notes.length != 0) {
            bassClef.push(measureBassData);
        }
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
function getNote(node) {
    let note;
    let alter = 0;
    let octave;
    let chord = false;
    let rest = false;
    let type;
    let staff;
    for(let j = 0; j < node.children.length; j++) {
        let currentNode = node.children[j];
        if(currentNode.nodeName === "chord") {
            chord = true;
            //console.log(measure[k].children[i]);
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
    note = new Note(note, alter, chord, rest, octave, type, staff);
    return note;
}
class Measure {
    notes = [];
    staff;
    constructor (staff) {
        this.staff = staff;
    }
    addNote(note) {
        this.notes.push(note);
    }
    addChord(chord) {
        this.notes.push(chord);
    }
    removeLast() {
        console.log(this.notes);
        this.notes.pop();
        console.log(this.notes);
    }
    getStaff() {
        return staff;
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

class Chord {
    notes = [];
    staff;
    constructor(note, staff) {
        this.staff = staff;
        this.notes.push(note);
    }
    addNote(note) {
        this.notes.push(note);
    }
    checkEmpty() {
        if(this.notes.length == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    getStaff() {
        return staff;
    }


}