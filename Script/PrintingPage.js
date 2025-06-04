/* --- Main processing page: Reads the file and converts it into an arraylist for easier access,
Finds the credits to display, manipulates the printing page's table to display the notes*/
let button = document.getElementById("showFile");
let title = "";
let composer = "";
let bassClef = [];
let trebleClef = [];
let numMeasures = 3;

// When they click show file run!!
button.addEventListener('click', function(){
    getCredits();
    getNotes();
    console.log(trebleClef);
    console.log(bassClef);
    createSheetMusic(trebleClef, bassClef);
})

// Creates the html file that will be printed
function createSheetMusic(trebleClef, bassClef) {
    let currentDiv = document.getElementsByClassName("measures")[0];
    let row1 = document.createElement("tr");
    let amountToAdd = findLongestMeasure();
    // let amountToAdd = 1;
    let measureCount = 0;
    let multiplier = findShortestNote();
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
    // Set up
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(sessionStorage.getItem("file"), "text/xml");
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
            }
            else if(note.chord) {
                addChord = false;
                chordNotes.addNote(note);
                if(note.staff === "1") {
                    atleastTreble = true;
                    measureTrebleData.addChord(chordNotes);
                }
                else if(note.staff === "2") {
                    //console.log(note);
                    measureBassData.addChord(chordNotes);
                }
            }
            else {
                if(note.staff === "1") {
                    atleastTreble = true;
                    measureBassData.addNote(note);
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

// Find the proper spacing to consistantly print at good margins and no cutoffs
function findLongestMeasure() {
    let longestMeasure = 0;
    let longestCount = 0;
    let measureNum = 0;

    // Find the widest measure and the number of notes in it
    for(let i = 0; i < trebleClef.length; i++) {
        let count = 0;
        for(let j = 0; j < trebleClef[i].notes.length; j++) {
            count++;
            if(trebleClef[i].notes[j].alter != 0) {
                count++;
            }
        }
        if(count > longestCount) {
            longestMeasure = trebleClef[i].notes.length;
            longestCount = count;
            measureNum = trebleClef[i].measureNum;
        }
    }
    for(let i = 0; i < bassClef.length; i++) {
        let count = 0;
        for(let j = 0; j < bassClef[i].notes.length; j++) {
            count++;
            if(bassClef[i].notes[j].alter != 0) {
                count++;
            }
        }
        if(count > longestCount) {
            longestMeasure = bassClef[i].notes.length;
            longestCount = count;
            measureNum = bassClef[i].measureNum;
        }
    }
    console.log(longestMeasure + " HOW");// delete
    console.log(measureNum + "HOW");// delete

    // Calculate the width of the whole table to see if it fits the printing requirements
    let numSpaces = 1;
    numMeasures = 3;
    let totalLength = ( (numSpaces * longestMeasure * 26.66) + longestMeasure * 10.66 ) * numMeasures;

    // If it's too wide initially, it will change the number of measures per row
    while(totalLength > 620 && numMeasures > 1) {
        numMeasures--;
        totalLength = ( (numSpaces * longestMeasure * 26.66) + longestMeasure * 10.66 ) * numMeasures;
    }

    // Change the number of spaces to fit it
    while(totalLength < 600) {
        console.log(totalLength + "YIPPEEE")
        numSpaces++;
        totalLength = ( (numSpaces * longestMeasure * 26.66) + longestMeasure * 10.66 ) * numMeasures;
    }
    return numSpaces;
}

// Turns the type into a number beat
function typeToNumber(type) {
    // WHEEEE
    let beat = 0;
    if(type === "whole") {
        beat = 1;
    }
    else if(type === "quarter") {
        beat = .25;
    }
    else if(type === "half") {
        beat = .5;
    }
    else if(type === "eighth") {
        beat = .125;
    }
    else if(type === "16th") {
        beat = .0625;
    }
    else if(type === "32nd") {
        beat = .03125
    }
    else {
        console.log(1 + "wydm");
    }

    return beat;
}

// Find the multiplier
function findShortestNote() {
    let shortestBeat = 1000;

    // Find the shortest beat
    for(let i = 0; i < trebleClef.length; i++) {
        for(let j = 0; j < trebleClef[i].notes.length; j++) {
            if(trebleClef[i].notes[j].type == null) {

            }
            else if(typeToNumber(trebleClef[i].notes[j].type) < shortestBeat) {
                shortestBeat = typeToNumber(trebleClef[i].notes[j].type);
            }
        }
    }
    // Find the multiplier to make that number whole
    for(let i = 1; i <= 32; i++) {
        if(shortestBeat * i == 1) {
            return i;
        }
    }
    return 16;
}

// Class for a measure, stores all the notes in the measure
class Measure {
    notes = [];
    measureNum;
    staff;
    division;
    constructor (staff, measureNum, division) {
        this.staff = staff;
        this.measureNum = measureNum;
        this.division = division;
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
    duration;
    constructor(note, alter, chord, rest, octave, type, staff, duration) {
        this.octave = octave;
        this.note = note;
        this.alter = alter;
        this.chord = chord;
        this.type = type;
        this.rest = rest;
        this.staff = staff;
        this.duration = duration;
    }
}

// Class for a chord, stores all the notes in each chord
class Chord {
    notes = [];
    staff = "";
    duration;
    constructor(note, staff, duration) {
        this.staff = staff;
        this.notes.push(note);
        this.duration = note.duration;
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