// --- Gets all of the data from the XML file and stores it in arrays or variables --- //

import { Chord, Note, Measure } from "./Classes.js";

// Gets the title and composer
export function getCredits() {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(sessionStorage.getItem("file"), "text/xml");
    let title = "";
    let composer = "";
    
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
export function getNotes() {
    // Set up
    let trebleClef = [];
    let bassClef = [];
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(sessionStorage.getItem("file"), "text/xml");
    let notes = [];
    let measureCount = 1;
    let measures = [];
    let prevNote = new Note();
    let measure = xmlDoc.getElementsByTagName("measure");
    xmlDoc.getElementsByTagName("measure");
    let attributes = xmlDoc.getElementsByTagName("attributes");
    let division;

    // Get the divisions
    for(let i = 0; i < attributes[0].children.length; i++) {
        if(attributes[0].children[i].nodeName === "divisions") {
            division = attributes[0].children[i].innerHTML;
        }
    }

    // Go through each measure
    for(let k = 0; k < measure.length; k++) {
        let measureTrebleData = new Measure("treble", k, division);
        let measureBassData = new Measure("bass", k, division);
        let firstChord = true;
        let addChord = false;
        let chordNotes;
        let atleastTreble = false;
        
        // Go through each note
        for(let i = 0; i < measure[k].children.length-1; i++) {
            
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
                    
                    // If there is a chord, add it and reset chord flags
                    if(chordNotes != null) {
                        firstChord = true;
                        addChord = false;
                        if(chordNotes.getStaff() === "1") {
                            atleastTreble = true;
                            measureTrebleData.addChord(chordNotes);
                        }
                        else {
                            measureBassData.addChord(chordNotes);
                        }
                        chordNotes = null;

                    }
                    // Add normal notes and make sure you don't add the first note of a chord
                    if(note.staff === "1" && nextNote.chord == false && note.chord == false) {
                        atleastTreble = true;
                        measureTrebleData.addNote(note);
                    }
                    else if(note.staff === "2" && nextNote.chord == false && note.chord == false) {
                        measureBassData.addNote(note);
                    }
                }
                prevNote = note;
            }
        }
        // Check the note that you're missing because you look at the next note so you have to add
        // a bound
        if(measure[k].children[measure[k].children.length-1].nodeName === "note") {
            let note = getNote(measure[k].children[measure[k].children.length-1]);

            // Check if it's the second note of the chord
            if(note.chord && firstChord) {
                chordNotes = new Chord(prevNote, prevNote.staff);
                chordNotes.addNote(note);
                addChord = true;
            }
            else if(note.chord) {
                addChord = false;
                chordNotes.addNote(note);
                if(note.staff === "1") {
                    atleastTreble = true;
                    measureTrebleData.addChord(chordNotes);
                }
                else if(note.staff === "2") {
                    measureBassData.addChord(chordNotes);
                }
            }
            else {
                if(note.staff === "1") {
                    atleastTreble = true;
                    measureTrebleData.addNote(note);
                }
                if(note.staff === "2") {
                    measureBassData.addNote(note);
                }

            }
        }
        // Add the newly added chord
        if(chordNotes != null && addChord == true) {
            if(chordNotes.notes[0].staff === "1") {
                atleastTreble = true;
                measureTrebleData.addChord(chordNotes);
            }
            else if(chordNotes.notes[0].staff === "2") {
                measureBassData.addChord(chordNotes)
            }
        }

        // Make sure there is at least one note in the measure for treble clef
        // Treble clef starts each measure so there needs to be at least one
        if(!atleastTreble) {
            measureTrebleData.addNote(new Note(null,null,null,true,null,null,"1",1));
        }

        // Add the measure to the entire treble/bass clef
        if(measureTrebleData != null && measureTrebleData.notes.length != 0) {
            trebleClef.push(measureTrebleData);
        }
        if(measureBassData != null && measureBassData.notes.length != 0) {
            bassClef.push(measureBassData);
        }
        
    }
    return { newTrebleClef: trebleClef, newBassClef: bassClef };
}

// Gets the note data
function getNote(node) {
    // All the info set up
    let note;
    let alter = 0;
    let octave;
    let chord = false;
    let rest = false;
    let type;
    let staff;
    let duration;

    // Go through the note's children to extract data
    for(let j = 0; j < node.children.length; j++) {
        let currentNode = node.children[j];
        if(currentNode.nodeName === "chord") {
            chord = true;
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
        if(currentNode.nodeName === "duration") {
            duration = currentNode.innerHTML;
        }
    }

    // Add it all to a note
    note = new Note(note, alter, chord, rest, octave, type, staff, duration);
    return note;
}
