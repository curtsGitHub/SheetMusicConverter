
// Find the proper spacing to consistantly print at good margins and no cutoffs
export function findLongestMeasure(trebleClef, bassClef) {
    let longestMeasure = 0;
    let longestCount = 0;
    let measureNum = 0;
    console.log(trebleClef.length + " like...")
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
    let numMeasures = 3;
    let totalLength = ( (numSpaces * longestMeasure * 5) + longestMeasure * 7 ) * numMeasures;

    // If it's too wide initially, it will change the number of measures per row
    while(totalLength > 600 && numMeasures > 1) {
        numMeasures--;
        totalLength = ( (numSpaces * longestMeasure * 5) + longestMeasure * 7 ) * numMeasures;
    }

    // Change the number of spaces to fit it
    while(totalLength < 700) {
        console.log(totalLength + "YIPPEEE")
        numSpaces++;
        totalLength = ( (numSpaces * longestMeasure * 5) + longestMeasure * 7 ) * numMeasures;
    }
    return { measures : numMeasures, spaces: numSpaces }; 
}

// Turns the type into a number beat
export function typeToNumber(type) {
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
export function findShortestNote(trebleClef) {
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
