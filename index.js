const dropArea = document.getElementById('dropArea');

// Handle drag events
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, false);
});

dropArea.addEventListener('dragenter', (e) => {
  e.target.style = "border-color:red"
}, false);
dropArea.addEventListener('dragleave', (e) => {
  e.target.style = ""
}, false);

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  e.target.style = ""
  const dt = e.dataTransfer;
  const files = dt.files;

  if (files.length > 1) {
    window.alert("تنها یک پرونده را بارگذاری کنید!");
    return;
  }

  const file = files[0];

  const acceptableFontNameRegex = /\.(ttf|otf|woff2?)$/;

  if (acceptableFontNameRegex.test(file.name)) {
    const reader = new FileReader();

    reader.onload = function(event) {
      // Assuming the font file is Base64 encoded
      let base64Font = event.target.result;
      applyFontStyle(base64Font, file);
    };

    reader.readAsDataURL(file);
  } else {
    window.alert("نام پروندهٔ بارگذاری شده معتبر نیست!")
  }
}

function applyFontStyle(fontBase64, fontFile) {
  const fontFace = '@font-face {' +
    `font-family: "${fontFile.name}";` +
    `src: url(${fontBase64}) format('truetype');` +
    '}';

  const style = document.createElement('style');
  style.appendChild(document.createTextNode(fontFace));
  document.head.appendChild(style);

  const mainSection = document.querySelector('main');

  mainSection.style.fontFamily = `"${fontFile.name}", sans-serif`;
}
