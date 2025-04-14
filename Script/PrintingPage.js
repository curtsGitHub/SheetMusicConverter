/* --- Main processing page: Reads the file and converts it into an arraylist for easier access,
Finds the credits to display, manipulates the printing page's table to display the notes*/
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

// Creates the html file that will be printed
function createSheetMusic(trebleClef, bassClef) {
    //console.log(trebleClef);
    let currentDiv = document.getElementsByClassName("measures")[0];
    let numMeasures = 0.0;
    let row1 = document.createElement("tr");
    for(let i = 0; i < trebleClef.length; i++) {
        let newColumn = document.createElement("td");
        let newMeasure = document.createElement("table");
        newMeasure.className = "measure" + (i+1);
        let newDiv = document.createElement("table");
        newDiv.className = "measure" + (i+1);
        console.log(numMeasures + " MEASURES");
        console.log(numMeasures % 3);
        if(numMeasures % 3 == 0) {
            row1 = document.createElement("tr");
            currentDiv.appendChild(row1);
        }
        let data1 = document.createElement("td");
        row1.appendChild(data1);
        
        //console.log(currentDiv);
        data1.appendChild(newDiv);
        let row2 = document.createElement("tr");
        newDiv.appendChild(row2);
        let data2 = document.createElement("td");
        row2.appendChild(data2);
        let treble = document.createElement("table");
        treble.className = "treble";
        data2.appendChild(treble);

        let note = document.createElement("tr");
        note.id = "c8";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "b7";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "a7";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "g7";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "f7";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "e7";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "d7";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "c7";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "b6";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "a6";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "g6";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "f6";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "e6";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "d6";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "c6";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "b5";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "a5";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "g5";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "f5";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "e5";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "d5";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "c5";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "b4";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "a4";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "g4";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "f4";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "e4";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "d4";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "c4";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "b3";
        treble.appendChild(note);
        numMeasures++;

        // note = document.createElement("tr");
        // note.id = "b1";
        // newDiv.appendChild(note);
        // note = document.createElement("tr");
        // note.id = "a1";
        // newDiv.appendChild(note);
        // note = document.createElement("tr");
        // note.id = "g1";
        // newDiv.appendChild(note);
        // note = document.createElement("tr");
        // note.id = "f1";
        // newDiv.appendChild(note);
        // note = document.createElement("tr");
        // note.id = "e1";
        // newDiv.appendChild(note);
        // note = document.createElement("tr");
        // note.id = "d1";
        // newDiv.appendChild(note);
        // note = document.createElement("tr");
        // note.id = "c1";
        // newDiv.appendChild(note);
        
        // note = document.createElement("tr");
        // note.id = "b2";
        // newDiv.appendChild(note);
        
        let currentNumNotes = 0;
        //console.log(document);
        let content;
        // add the text node to the newly created div
        for(let j = 0; j < trebleClef[i].notes.length; j++) {
            //console.log(trebleClef[i].notes[j].rest);
            //console.log(newDiv);
            let currentNote = treble.rows[0];
            let currentNotes = treble.rows;
            //let newNote = document.createElement("td");
            if(trebleClef[i].notes[j] instanceof Chord) {
                for(let m = 0; m < trebleClef[i].notes[j].notes.length; m++) {
                    //console.log(currentNotes);
                    for(let k = 0; k < currentNotes.length; k++) {
                        if(currentNotes[k].id.toUpperCase() === trebleClef[i].notes[j].notes[m].note + "" + trebleClef[i].notes[j].notes[m].octave) {
                            console.log(trebleClef[i].notes[j].notes[m].note + "" + trebleClef[i].notes[j].notes[m].octave);
                            currentNote = currentNotes[k];
                            // console.log("_______________");
                            // console.log(currentNote);
                            // console.log(trebleClef[i].notes[j].note);
                        }
                    }
                    let newNote = document.createElement("td");
                    let noteData = document.createTextNode(trebleClef[i].notes[j].notes[m].note);
                    //console.log(noteData);
                    newNote.appendChild(noteData);
                    let limit = currentNumNotes-currentNote.querySelectorAll("td").length;
                    for(let l = 0; l < limit; l++) {
                        let blankNote = document.createElement("td");
                        blankNote.textContent = "";
                        currentNote.appendChild(blankNote);
                    }
                    currentNote.appendChild(newNote);
                }
                currentNumNotes++;
            }
            else if(trebleClef[i].notes[j].rest) {
                //console.log(trebleClef[i].notes[j]);
            }
            else {
                //console.log(currentNotes);
                for(let k = 0; k < currentNotes.length; k++) {
                    if(currentNotes[k].id.toUpperCase() === trebleClef[i].notes[j].note + "" + trebleClef[i].notes[j].octave) {
                        currentNote = currentNotes[k];
                        // console.log("_______________");
                        // console.log(currentNote);
                        // console.log(trebleClef[i].notes[j].note);
                    }
                }
                let newNote = document.createElement("td");
                let noteData = document.createTextNode(trebleClef[i].notes[j].note);
                //console.log(noteData);
                newNote.appendChild(noteData);
                let limit = currentNumNotes-currentNote.querySelectorAll("td").length;
                for(let l = 0; l < limit; l++) {
                    let blankNote = document.createElement("td");
                    blankNote.textContent = "";
                    currentNote.appendChild(blankNote);
                }
                currentNote.appendChild(newNote);
                currentNumNotes++;
            }
                //console.log(newNote);
                //currentNote[0].appendChild(noteData);
                //console.log(document.getElementsByClassName("measure" + (i + 1))[0]);
                // console.log(currentNote.querySelectorAll("td").length);
                // console.log(currentNumNotes);
                // console.log(currentNote);
                // let limit = currentNumNotes-currentNote.querySelectorAll("td").length;
                // for(let l = 0; l < limit; l++) {
                //     let blankNote = document.createElement("td");
                //     blankNote.textContent = "";
                //     currentNote.appendChild(blankNote);
                // }
                // currentNote.appendChild(newNote);
                // currentNumNotes++;
                //console.log(trebleClef[i].notes[j].note);
        }
        // console.log(trebleClef[i].notes[j].note);
    }

    let rowNum = 0;
    for(let i = 0; i < bassClef.length; i++) {
        let currentDiv = document.getElementsByClassName("measure" + (i+1));
        currentDiv[0].appendChild(document.createElement("tr"));
        currentDiv[0].appendChild(document.createElement("tr"));
        currentDiv[0].appendChild(document.createElement("tr"));
        currentDiv[0].appendChild(document.createElement("tr"));
        currentDiv[0].appendChild(document.createElement("tr"));
        let row = document.createElement("tr");
        currentDiv[0].appendChild(row);
        let data1 = document.createElement("td");
        row.appendChild(data1);
        let bass = document.createElement("table");
        bass.className = "bass";
        data1.appendChild(bass);

        let note = document.createElement("tr");
        note.id = "a3";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "g3";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "f3";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "e3";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "d3";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "c3";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "b2";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "a2";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "g2";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "f2";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "e2";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "d2";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "c2";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "b1";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "a1";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "g1";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "f1";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "e1";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "d1";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "c1";
        bass.appendChild(note);
        
        let currentNumNotes = 0;
        //console.log(document);
        let content;
        // add the text node to the newly created div
        for(let j = 0; j < bassClef[i].notes.length; j++) {
            //console.log(trebleClef[i].notes[j].rest);
            //console.log(newDiv);
            let currentNote = bass.rows[0];
            let currentNotes = bass.rows;
            //let newNote = document.createElement("td");
            if(bassClef[i].notes[j] instanceof Chord) {
                for(let m = 0; m < bassClef[i].notes[j].notes.length; m++) {
                    //console.log(currentNotes);
                    for(let k = 0; k < currentNotes.length; k++) {
                        if(currentNotes[k].id.toUpperCase() === bassClef[i].notes[j].notes[m].note + "" + bassClef[i].notes[j].notes[m].octave) {
                            console.log(bassClef[i].notes[j].notes[m].note + "" + bassClef[i].notes[j].notes[m].octave);
                            currentNote = currentNotes[k];
                            // console.log("_______________");
                            // console.log(currentNote);
                            // console.log(trebleClef[i].notes[j].note);
                        }
                    }
                    let newNote = document.createElement("td");
                    let noteData = document.createTextNode(bassClef[i].notes[j].notes[m].note);
                    //console.log(noteData);
                    newNote.appendChild(noteData);
                    let limit = currentNumNotes-currentNote.querySelectorAll("td").length;
                    for(let l = 0; l < limit; l++) {
                        let blankNote = document.createElement("td");
                        blankNote.textContent = "";
                        currentNote.appendChild(blankNote);
                    }
                    currentNote.appendChild(newNote);
                }
                currentNumNotes++;
            }
            else if(bassClef[i].notes[j].rest) {
                //console.log(trebleClef[i].notes[j]);
            }
            else {
                //console.log(currentNotes);
                for(let k = 0; k < currentNotes.length; k++) {
                    if(currentNotes[k].id.toUpperCase() === bassClef[i].notes[j].note + "" + bassClef[i].notes[j].octave) {
                        currentNote = currentNotes[k];
                        // console.log("_______________");
                        // console.log(currentNote);
                        // console.log(trebleClef[i].notes[j].note);
                    }
                }
                let newNote = document.createElement("td");
                let noteData = document.createTextNode(bassClef[i].notes[j].note);
                //console.log(noteData);
                newNote.appendChild(noteData);
                let limit = currentNumNotes-currentNote.querySelectorAll("td").length;
                for(let l = 0; l < limit; l++) {
                    let blankNote = document.createElement("td");
                    blankNote.textContent = "";
                    currentNote.appendChild(blankNote);
                }
                currentNote.appendChild(newNote);
                currentNumNotes++;
            }
                //console.log(newNote);
                //currentNote[0].appendChild(noteData);
                //console.log(document.getElementsByClassName("measure" + (i + 1))[0]);
                // console.log(currentNote.querySelectorAll("td").length);
                // console.log(currentNumNotes);
                // console.log(currentNote);
                // let limit = currentNumNotes-currentNote.querySelectorAll("td").length;
                // for(let l = 0; l < limit; l++) {
                //     let blankNote = document.createElement("td");
                //     blankNote.textContent = "";
                //     currentNote.appendChild(blankNote);
                // }
                // currentNote.appendChild(newNote);
                // currentNumNotes++;
                //console.log(trebleClef[i].notes[j].note);
        }
        // console.log(trebleClef[i].notes[j].note);
    }
    console.log(document);
}

// Gets the title and composer
function getCredits() {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(sessionStorage.getItem("file"), "text/xml");
    
    // All the different ways titles could be shown
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

    // All the different ways the composer could be shown
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

// Gets the measures data
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
    
    // Go through each measure
    for(let k = 0; k < measure.length; k++) {
        let measureTrebleData = new Measure("treble");
        let measureBassData = new Measure("bass");
        let firstChord = true;
        let addChord = false;
        let chordNotes;
        //console.log(measure[k]);
        // Go through each note
        for(let i = 0; i < measure[k].children.length-1; i++) {
            //console.log(i);
            //console.log(measure[0].children[i].nodeName);
            // Extract the note, the octave, sharps/flats, if its a rest and if it's a chord
            if(measure[k].children[i].nodeName === "note") {
                let note = getNote(measure[k].children[i]);
                let nextNote = getNote(measure[k].children[i+1]);

                // Chord extraction to keep all the notes in the chord together
                if(note.chord && firstChord) {
                    firstChord = false;
                    addChord = true;
                    chordNotes = new Chord(prevNote, String(prevNote.staff));
                }
                if(note.chord) {
                    chordNotes.addNote(note);
                }
                else {
                    //console.log(chordNotes)
                    //console.log(note);
                    // If there is a chord, add it and reset chord flags
                    if(chordNotes != null) {
                        firstChord = true;
                        addChord = false;
                        if(chordNotes.getStaff() === "1") {
                            //measureTrebleData.removeLast();
                            measureTrebleData.addChord(chordNotes);
                        }
                        else {
                            //measureBassData.removeLast();
                            measureBassData.addChord(chordNotes);
                            //console.log(measureBassData);
                        }
                        chordNotes = null;

                    }
                    // Add normal notes and make sure you don't add the first note of a chord
                    if(note.staff === "1" && nextNote.chord == false && note.chord == false) {
                        measureTrebleData.addNote(note);
                    }
                    else if(note.staff === "2" && nextNote.chord == false && note.chord == false) {
                        //console.log(note);
                        measureBassData.addNote(note);
                    }
                }
                prevNote = note;
                //measureData.addNote(new Note(note, alter, chord, rest, octave, type, staff));
                //console.log(measureData);
            }
        }
        // Check the note that you're missing because you look at the next note so you have to add
        // a bound
        if(measure[k].children[measure[k].children.length-1].nodeName === "note") {
            let note = getNote(measure[k].children[measure[k].children.length-1]);
            //console.log("WOW")
            //console.log(measureBassData);
            //console.log("__________________")
            // Check if it's the second note of the chord
            if(note.chord && firstChord) {
                chordNotes = new Chord(prevNote, prevNote.staff);
            }
            else if(note.chord) {
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
        // Add the newly added chord
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

        // Add the measure to the entire treble/bass clef
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

// Gets the note data
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
            if(currentNode.children[1].nodeName === "alter") { // sharps/flats
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

// Class for a measure, stores all the notes in the measure
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
    removeLast() { // remove this
        console.log(this.notes);
        this.notes.pop();
        console.log(this.notes);
    }
    getStaff() {
        return staff;
    }
    
}

// Class for a note, stores all the data needed in the note
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

// Class for a chord, stores all the notes in each chord
class Chord {
    notes = [];
    staff = "";
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
        return this.staff;
    }


}