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
    createSheetMusic(trebleClef, bassClef);
})

// Creates the html file that will be printed
function createSheetMusic(trebleClef, bassClef) {
    let currentDiv = document.getElementsByClassName("measures")[0];
    let row1 = document.createElement("tr");
    let amountToAdd = findLongestMeasure(trebleClef, bassClef);
    // let amountToAdd = 1;
    let measureCount = 0;
    let multiplier = findShortestNote(trebleClef);
    
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

        // Add all of the note options for the measure as rows
        let note = document.createElement("tr");
        note.id = "firstTempo";
        treble.appendChild(note);
        for(let j = 0; j <= 5; j++) {
            for(let k = 0; k < 7; k++) {
                note = document.createElement("tr");
                note.id = "" +  String.fromCharCode((97 + k)) + "" + (8-j);
                treble.appendChild(note);
            }
        }
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
                    // Find the type of the beat and convert it into its number form
                    // Then multiply it by a multiplier to end with a whole number
                    beatCount += typeToNumber(trebleClef[i].notes[j].type) * multiplier;
                    //beatCount += trebleClef[i].notes[j].duration/trebleClef[i].division;
                }
                else {
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
                // Add it to the beat count
                if(trebleClef[i].notes[j].type != null) { // Jump point
                    beatCount += typeToNumber(trebleClef[i].notes[j].type) * multiplier;
                }
                else {
                    beatCount += trebleClef[i].notes[j].duration/trebleClef[i].division * multiplier;
                }
            }
            // Normal notes
            else {
                // Find the note to add
                for(let k = 1; k < currentNotes.length; k++) {  
                    if(currentNotes[k].id.toUpperCase() === trebleClef[i].notes[j].note + "" + trebleClef[i].notes[j].octave) {
                        currentNote = currentNotes[k];
                        tempoNotes = currentNotes[k-1];
                    }
                }
                
                // Set up the note
                let newNote = document.createElement("td");
                let noteData = document.createTextNode(trebleClef[i].notes[j].note);
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
                    let tempoBlank = document.createElement("td");
                    tempoBlank.textContent = "";
                    tempoNotes.appendChild(tempoBlank);
                }

                // Add the sharp/flat
                if(trebleClef[i].notes[j].alter != 0) {
                    currentNote.appendChild(alter);
                    currentNumNotes+=amountToAdd;
                    // Add another space for the tempo to properly line up
                    let tempoBlank = document.createElement("td");
                    tempoBlank.textContent = "";
                    tempoNotes.appendChild(tempoBlank);
                }

                // Set up the tempo number
                let tempo = document.createElement("td");
                if(trebleClef[i].notes[j].type != null) { // Jump point
                    beatCount += typeToNumber(trebleClef[i].notes[j].type) * multiplier;
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
        currentDiv[0].appendChild(row);
        let data1 = document.createElement("td");
        row.appendChild(data1);
        let bass = document.createElement("table");
        bass.className = "bass";
        data1.appendChild(bass);

        // Set up the notes for the measure as rows
        let note = document.createElement("tr");
        for(let j = 0; j <= 5; j++) {
            for(let k = 0; k < 7; k++) {
                note = document.createElement("tr");
                note.id = "" +  String.fromCharCode((97 + k)) + "" + (6-j);
                bass.appendChild(note);
            }
        }
        
        let currentNumNotes = 0;
        let content;
        // Go through all of the notes in the bass clef
        for(let j = 0; j < bassClef[i].notes.length; j++) {
            let currentNote = bass.rows[0];
            let currentNotes = bass.rows;
            // Format the notes if its a chord
            if(bassClef[i].notes[j] instanceof Chord) {
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
            else {

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
