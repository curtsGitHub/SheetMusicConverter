/* --- Main processing page: Reads the file and converts it into an arraylist for easier access,
Finds the credits to display, manipulates the printing page's table to display the notes --- */
import { Chord, Note, Measure } from "./Classes.js";
import { getCredits, getNotes } from "./GetNotes.js";
import { findLongestMeasure, findShortestNote, typeToNumber } from "./GetData.js";
let button = document.getElementById("showFile");
let bassClef = [];
let trebleClef = [];
let numMeasures = 3;

// When they click show file run!!
button.addEventListener('click', function(){
    getCredits();
    const { newTrebleClef: newtrebleClef, newBassClef: newbassClef } = getNotes();
    trebleClef = newtrebleClef;
    bassClef = newbassClef;
    console.log(trebleClef.length + "ok actually did something");
    console.log(bassClef + "ok actually did something");
    createSheetMusic(trebleClef, bassClef);
})

// Creates the html file that will be printed
function createSheetMusic(trebleClef, bassClef) {
    console.log(trebleClef.length + "wtf.");
    let currentDiv = document.getElementsByClassName("measures")[0];
    let row1 = document.createElement("tr");
    let amountToAdd = findLongestMeasure(trebleClef, bassClef);
    // let amountToAdd = 1;
    let measureCount = 0;
    let multiplier = findShortestNote(trebleClef);
    console.log(multiplier + "multi")
    
    // Go through all of the measures in the treble clef
    for(let i = 0; i < trebleClef.length; i++) {

        // Set up a new measure
        let newColumn = document.createElement("td");
        let newMeasure = document.createElement("table");
        newMeasure.className = "measure" + (i+1);
        newMeasure.id = "measure";
        let newDiv = document.createElement("table");
        newDiv.className = "measure" + (i+1);
        newDiv.id = "measure";
        console.log(measureCount + " MEASURES");// delete
        console.log(measureCount % numMeasures);// delete

        // Splits the amount of measures up per row
        if(measureCount % numMeasures == 0) {
            row1 = document.createElement("tr");
            currentDiv.appendChild(row1);
        }
        let data1 = document.createElement("td");
        row1.appendChild(data1);
        
        // Split the measures up into treble and base clef
        data1.appendChild(newDiv);
        let row2 = document.createElement("tr");
        newDiv.appendChild(row2);
        let data2 = document.createElement("td");
        row2.appendChild(data2);
        let treble = document.createElement("table");
        treble.className = "treble";
        data2.appendChild(treble);
        console.log(newDiv.className + "SAVE");

        // Add all of the note options for the measure as rows
        let note = document.createElement("tr");
        note.id = "firstTempo";
        treble.appendChild(note);
        note = document.createElement("tr");
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
        note = document.createElement("tr");
        note.id = "a3";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "g3";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "f3";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "e3";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "d3";
        treble.appendChild(note);
        note = document.createElement("tr");
        note.id = "c3";
        treble.appendChild(note);
        measureCount++;
        
        let currentNumNotes = 0;
        let limitCurrentNotes = 0;
        let content;
        let beatCount = 0;

        // Go through all the notes in that measure
        for(let j = 0; j < trebleClef[i].notes.length; j++) {
            limitCurrentNotes = currentNumNotes;
            let currentNote = treble.rows[0];
            let currentNotes = treble.rows;
            let tempoNotes = treble.rows[0];
            let triggerOnce = true;

            // If the note is a chord, there is a special way to display them
            if(trebleClef[i].notes[j] instanceof Chord) {
                let isAlter = false;
                // Find if there is a sharp or flat in the chord
                for(let m = 0; m < trebleClef[i].notes[j].notes.length; m++) {
                    if(trebleClef[i].notes[j].notes[m].alter == -1) {
                        isAlter = true;
                    }
                    else if(trebleClef[i].notes[j].notes[m].alter == 1) { 
                        isAlter = true;
                    }
                }
                // Go through the notes in the chords
                for(let m = 0; m < trebleClef[i].notes[j].notes.length; m++) {
                    // Find the note to add and find the row to add it in
                    for(let k = 0; k < currentNotes.length; k++) {
                        if(currentNotes[k].id.toUpperCase() === trebleClef[i].notes[j].notes[m].note + "" + trebleClef[i].notes[j].notes[m].octave) {
                            currentNote = currentNotes[k];
                            tempoNotes = currentNotes[k-1];
                        }
                    }
                    // Set up the sharp/flat
                    let alter = document.createElement("td");
                    let data;
                    if(trebleClef[i].notes[j].notes[m].alter == -1) {
                        data = document.createTextNode("♭")
                        alter.appendChild(data);
                    }
                    else if(trebleClef[i].notes[j].notes[m].alter == 1) {
                        data = document.createTextNode("♯")
                        alter.appendChild(data);
                    }
                    // Set up the note
                    let newNote = document.createElement("td");
                    let noteData = document.createTextNode(trebleClef[i].notes[j].notes[m].note);
                    newNote.appendChild(noteData);
                    // Add proper spacing
                    let limit = limitCurrentNotes-currentNote.querySelectorAll("td").length;
                    for(let l = 0; l < limit; l++) {
                        let blankNote = document.createElement("td");
                        blankNote.textContent = "";
                        currentNote.appendChild(blankNote);
                    }
                    // Add the sharp/flat
                    if(trebleClef[i].notes[j].notes[m].alter != 0) {
                        currentNote.appendChild(alter);
                        
                        // This will cause the tempo number to be shifted one
                        if(triggerOnce) {
                            currentNumNotes++;
                            triggerOnce = false;
                        }
                    }
                    // If the chord had a sharp/flat, shift all of the other notes one to match that note
                    if(isAlter && trebleClef[i].notes[j].notes[m].alter == 0) {
                        let blankNote = document.createElement("td");
                        blankNote.textContent = "";
                        currentNote.appendChild(blankNote);
                        
                    }
                    currentNote.appendChild(newNote);
                }
                // Add the spacing for the tempo note at the note above the top note of the chord
                let tempoLimit = currentNumNotes-tempoNotes.querySelectorAll("td").length;
                for(let l = 0; l < tempoLimit; l++) {
                    let tempoBlank = document.createElement("td"); // MAYBE CHANGE IT
                    tempoBlank.textContent = "";
                    tempoNotes.appendChild(tempoBlank);
                }
                // Set up the tempo number
                let tempo = document.createElement("td");
                if(trebleClef[i].notes[j].type != null) { // Jump point
                    console.log("hehehee. " + trebleClef[i].notes[j].type); // Delete
                    // Find the type of the beat and convert it into its number form
                    // Then multiply it by a multiplier to end with a whole number
                    beatCount += typeToNumber(trebleClef[i].notes[j].type) * multiplier;
                    //beatCount += trebleClef[i].notes[j].duration/trebleClef[i].division;
                }
                else {
                    console.log("hehehee.;-;; " + trebleClef[i].notes[j].duration); // delete
                    console.log("hehehee.;-; " + trebleClef[i].division); // delete
                    // If it doesn't have a type, find it with divisions and durations
                    beatCount += trebleClef[i].notes[j].duration/trebleClef[i].division * multiplier;
                }
                
                // Add the tempo number
                tempo.textContent = beatCount;
                tempoNotes.appendChild(tempo);
                currentNumNotes+=amountToAdd;
            }
            // Account for rest notes
            else if(trebleClef[i].notes[j].rest) {
                //console.log(trebleClef[i].notes[j]); DELETE
                // Add it to the beat count
                if(trebleClef[i].notes[j].type != null) { // Jump point
                    beatCount += typeToNumber(trebleClef[i].notes[j].type) * multiplier;
                    //beatCount += trebleClef[i].notes[j].duration/trebleClef[i].division;// delete
                }
                else {
                    console.log("||||||||||||||||||||||||||||||||||||||||||||")// delete
                    console.log(beatCount);// delete
                    console.log(trebleClef[i].notes[j]);// delete
                    console.log(trebleClef[i].notes[j].duration);// delete
                    console.log(trebleClef[i].division);// delete
                    console.log(trebleClef[i].notes[j].duration/trebleClef[i].division);// delete
                    console.log(trebleClef[i].notes[j].duration/trebleClef[i].notes[j].division * multiplier);// delete
                    console.log("|||||||||||||||||||||||||||||||||||||||||||")// delete
                    beatCount += trebleClef[i].notes[j].duration/trebleClef[i].division * multiplier;
                }
            }
            // Normal notes
            else {
                //console.log(currentNotes); DELETE
                // Find the note to add
                for(let k = 1; k < currentNotes.length; k++) {  
                    if(currentNotes[k].id.toUpperCase() === trebleClef[i].notes[j].note + "" + trebleClef[i].notes[j].octave) {
                        currentNote = currentNotes[k];
                        tempoNotes = currentNotes[k-1];
                        // console.log("_______________"); DELETE
                        // console.log(currentNote); DELETE
                        // console.log(trebleClef[i].notes[j].note); DELETE
                    }
                }
                
                // Set up the note
                let newNote = document.createElement("td");
                let noteData = document.createTextNode(trebleClef[i].notes[j].note);
                //console.log(noteData);
                newNote.appendChild(noteData);// jumppoint

                // Set up the sharp/flat
                let alter = document.createElement("td");
                let data;
                if(trebleClef[i].notes[j].alter == -1) {
                    data = document.createTextNode("♭")
                    alter.appendChild(data);
                }
                else if(trebleClef[i].notes[j].alter == 1) {
                    data = document.createTextNode("♯")
                    alter.appendChild(data);
                }

                // Correctly space both the tempo and the note
                let limit = currentNumNotes-currentNote.querySelectorAll("td").length;
                let tempoLimit = currentNumNotes-tempoNotes.querySelectorAll("td").length;
                for(let l = 0; l < limit; l++) {
                    let blankNote = document.createElement("td");
                    blankNote.textContent = "";
                    currentNote.appendChild(blankNote);
                }
                for(let l = 0; l < tempoLimit; l++) {
                    let tempoBlank = document.createElement("td"); // MAYBE CHANGE IT // delete
                    tempoBlank.textContent = "";
                    tempoNotes.appendChild(tempoBlank);
                }

                // Add the sharp/flat
                if(trebleClef[i].notes[j].alter != 0) {
                    currentNote.appendChild(alter);
                    currentNumNotes+=amountToAdd;
                    // Add another space for the tempo to properly line up
                    let tempoBlank = document.createElement("td"); // MAYBE CHANGE IT// delete
                    tempoBlank.textContent = "";
                    tempoNotes.appendChild(tempoBlank);
                }

                // Set up the tempo number
                let tempo = document.createElement("td");
                if(trebleClef[i].notes[j].type != null) { // Jump point
                    beatCount += typeToNumber(trebleClef[i].notes[j].type) * multiplier;
                    //beatCount += trebleClef[i].notes[j].duration/trebleClef[i].division;// delete
                }
                else {
                    beatCount += trebleClef[i].notes[j].duration/trebleClef[i].notes[j].division * multiplier;
                }
                tempo.textContent = beatCount;
                tempoNotes.appendChild(tempo);
                currentNote.appendChild(newNote);
                currentNumNotes+=amountToAdd;
            }
        }
    }

    // Display bass clef notes
    let rowNum = 0;
    for(let i = 0; i < bassClef.length; i++) {
        // Set up the bass clef in the measure
        let currentDiv = document.getElementsByClassName("measure" + (bassClef[i].measureNum+1));
        let row = document.createElement("tr");
        console.log(bassClef[i].measureNum+1 + "u exist");// delete
        console.log(currentDiv[0]);// delete
        currentDiv[0].appendChild(row);
        let data1 = document.createElement("td");
        row.appendChild(data1);
        let bass = document.createElement("table");
        bass.className = "bass";
        data1.appendChild(bass);

        // Set up the notes for the measure as rows
        let note = document.createElement("tr");
        note.id = "a6";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "g6";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "f6";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "e6";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "d6";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "c6";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "b5";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "a5";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "g5";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "f5";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "e5";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "d5";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "c5";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "b4";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "a4";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "g4";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "f4";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "e4";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "d4";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "c4";
        bass.appendChild(note);
        note = document.createElement("tr");
        note.id = "b3";
        bass.appendChild(note);
        note = document.createElement("tr");
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
        let content;
        // Go through all of the notes in the bass clef
        for(let j = 0; j < bassClef[i].notes.length; j++) {
            let currentNote = bass.rows[0];
            let currentNotes = bass.rows;
            //let newNote = document.createElement("td");// delete
            // Format the notes if its a chord
            if(bassClef[i].notes[j] instanceof Chord) {
                //console.log(bassClef[i].notes[j].notes[1].note.length);// delete
                let isAlter = false;
                // Check if there are sharps/flats in the bass clef
                for(let m = 0; m < bassClef[i].notes[j].notes.length; m++) {
                    if(bassClef[i].notes[j].notes[m].alter == -1) {
                        isAlter = true;
                    }
                    else if(bassClef[i].notes[j].notes[m].alter == 1) {
                        isAlter = true;
                    }
                }

                // Iterate through the notes in the chord and find the row it matches
                for(let m = 0; m < bassClef[i].notes[j].notes.length; m++) {
                    for(let k = 0; k < currentNotes.length; k++) { 
                        if(currentNotes[k].id.toUpperCase() === bassClef[i].notes[j].notes[m].note + "" + bassClef[i].notes[j].notes[m].octave) {
                            currentNote = currentNotes[k];
                            break;
                        }
                    }

                    // Set up sharp/flat
                    let alter = document.createElement("td");
                    let data;
                    if(bassClef[i].notes[j].notes[m].alter == -1) {
                        data = document.createTextNode("♭")
                        alter.appendChild(data);
                    }
                    else if(bassClef[i].notes[j].notes[m].alter == 1) {
                        data = document.createTextNode("♯")
                        alter.appendChild(data);
                    }

                    // Set up note
                    let newNote = document.createElement("td");
                    let noteData = document.createTextNode(bassClef[i].notes[j].notes[m].note);
                    newNote.appendChild(noteData);

                    // Add proper spacing
                    let limit = currentNumNotes-currentNote.querySelectorAll("td").length;
                    for(let l = 0; l < limit; l++) {
                        let blankNote = document.createElement("td");
                        blankNote.textContent = "";
                        currentNote.appendChild(blankNote);
                    }

                    // Add sharp/flat
                    if(bassClef[i].notes[j].notes[m].alter != 0) {
                        currentNote.appendChild(alter);
                    }

                    // Update spacing for the rest of the notes if there is an alter
                    if(isAlter && bassClef[i].notes[j].notes[m].alter == 0) {
                        let blankNote = document.createElement("td");
                        blankNote.textContent = "";
                        currentNote.appendChild(blankNote);
                        
                    }
                    currentNote.appendChild(newNote);
                }
                currentNumNotes+=amountToAdd;
            }
            else if(bassClef[i].notes[j] == null || bassClef[i].notes[j].rest) {
                // To make sure it doesn't crash
            }
            // Display normal notes
            else {// jumppoint// delete

                // Find the note's row
                for(let k = 0; k < currentNotes.length; k++) {
                    if(currentNotes[k].id.toUpperCase() === bassClef[i].notes[j].note + "" + bassClef[i].notes[j].octave) {
                        currentNote = currentNotes[k];
                    }
                }

                // Set up the note
                let newNote = document.createElement("td");
                let noteData = document.createTextNode(bassClef[i].notes[j].note);
                newNote.appendChild(noteData);

                // Set up the alter
                let alter = document.createElement("td");
                let data;
                if(bassClef[i].notes[j].alter == -1) {
                    data = document.createTextNode("♭")
                    alter.appendChild(data);
                }
                else if(bassClef[i].notes[j].alter == 1) {
                    data = document.createTextNode("♯")
                    alter.appendChild(data);
                }

                // Make proper spacing
                let limit = currentNumNotes-currentNote.querySelectorAll("td").length;
                for(let l = 0; l < limit; l++) {
                    let blankNote = document.createElement("td");
                    blankNote.textContent = "";
                    currentNote.appendChild(blankNote);
                }

                // Add alter
                if(bassClef[i].notes[j].alter != 0) {
                    currentNote.appendChild(alter);
                    currentNumNotes+=amountToAdd;
                }
                currentNote.appendChild(newNote);
                currentNumNotes+=amountToAdd;
            }
        }
    }

    console.log(document);
}
