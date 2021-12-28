//! Copying text to clipboard
function copy(text, element) {
    let input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    if(!element || element.classList.value.includes('active')) return;
    
    element.classList.toggle('active');
    
    setTimeout(() => {
      element.classList.toggle('active');
    }, 2000)
}

function getImages() {
  axios.get('/get_imgs')
  .then(res => {
    console.log(res.data);
    renderImages(res.data);
  })
}

function renderImages(imgs) {
  let html = '<div class="img_container"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z" fill="currentColor"></path></svg><p>Upload image...</p></div>';
  imgs.forEach((e, i) => {
    html += `<div class="img_container"><img src="img/${e.name}"></div>`;
  })
  document.querySelector('.intro_wrapper').innerHTML = html;
}

window.onload = getImages();