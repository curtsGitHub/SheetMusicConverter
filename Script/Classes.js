/* --- Classes: Contains all the classes needed for the program --- */

// Class for a chord, stores all the notes in each chord
export class Chord {
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

// Class for a note, stores all the data needed in the note
export class Note {
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

// Class for a measure, stores all the notes in the measure
export class Measure {
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