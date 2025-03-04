let button = document.getElementById("submit");
let file = document.getElementById("sheetMusic");


//let file = document.getElementById("sheetMusic");
//const file = document.getElementById("sheetMusic").files[0];

// button.addEventListener('click', function(){
//     let file = document.getElementById("sheetMusic").files[0];
//     console.log(new FileReader(file).readAsText);
// })

file.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const fileContent = e.target.result;
      // Process fileContent here
      console.log(fileContent);
    };
  
    reader.onerror = (e) => {
      console.error('Error reading file:', e);
    };
  
    reader.readAsText(file); // or readAsArrayBuffer, readAsDataURL
  });

function readXML(file) {
  
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader.readAsDataURL(file));
  }