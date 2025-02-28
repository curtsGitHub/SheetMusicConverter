let button = document.getElementById("submit");

//let file = document.getElementById("sheetMusic");
//const file = document.getElementById("sheetMusic").files[0];

button.addEventListener('click', function(){
    let file = document.getElementById("sheetMusic").files[0];
    
})


// function readXML(file) {
//     // Check if the file is an image.
//     if (file.type && !file.type.startsWith('image/')) {
//       console.log('File is not an image.', file.type, file);
//       return;
//     }
  
//     const reader = new FileReader();
//     reader.addEventListener('load', (event) => {
//       img.src = event.target.result;
//     });
//     reader.readAsDataURL(file);
//   }