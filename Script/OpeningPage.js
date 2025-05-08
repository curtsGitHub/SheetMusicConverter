// --- File reader: Gets the file stores it ---
let button = document.getElementById("submit");
let file = document.getElementById("sheetMusic");
let fileNew;
let addFileButton = document.getElementById("addFile");
let helpButton = document.getElementById("help");
let closeHelpButton = document.getElementById("closeHelp");
let helpBox = document.getElementById("helpBox")
let fileInfo = document.getElementById("fileContent");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  helpBox.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == helpBox) {
    helpBox.style.display = "none";
  }
}
//let file = document.getElementById("sheetMusic");
//const file = document.getElementById("sheetMusic").files[0];

// button.addEventListener('click', function(){
//     let file = document.getElementById("sheetMusic").files[0];
//     console.log(new FileReader(file).readAsText);
// })
helpButton.addEventListener('click', function() {
  helpBox.style.display = "block";
})
addFileButton.addEventListener('click', function() {
  file.click();
})
file.addEventListener('change', (event) => {
    fileNew = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const fileContent = e.target.result;
      // Stores the file for the next page to get
      sessionStorage.setItem("file", fileContent);
      console.log(fileContent);
    };
  
    reader.onerror = (e) => {
      console.error('Error reading file:', e);
    };
    
    reader.readAsText(fileNew); // or readAsArrayBuffer, readAsDataURL
    fileInfo.innerHTML = fileNew.name;
  });

function readXML(fileNew) {
    const reader = new FileReader();
    reader.readAsDataURL(fileNew);
    console.log(reader.readAsDataURL(fileNew));
  }

function getFile() {
  return file;
}