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

/*! Create grid-table of sorted images*/
function renderImages(imgs) {
  let html = `
  <div class="img_container" onclick="formToggle()">
    <div class="img_plus">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2z" fill="currentColor"></path></svg>
      <p>Upload image...</p>
    </div>
  </div>`;
  imgs.forEach((e, i) => {
    html += `<div class="img_container" onclick="previewToggle('${e.name}')"><img src="img/${e.name}"></div>`;
  })
  document.querySelector('.intro_wrapper').innerHTML = html;
}

/*! Preview image before uploading*/
window.onload = () => {
  getImages();
  document.querySelector('input[type="file"]').addEventListener('change', function() {
    if (this.files && this.files[0]) {
      let img = document.querySelector('#myImg');
      img.onload = () => {
          URL.revokeObjectURL(img.src);  // no longer needed, free memory
      }
      img.style.opacity = '1';
      document.querySelector('#file_name').innerHTML = this.files[0].name;

      img.src = URL.createObjectURL(this.files[0]); // set src to blob url
    }
  });
}

function formToggle() {
  let modal = document.querySelector(`#modal_form`);
  if (modal.classList.value.includes(`active`)) {
    modal.classList.toggle(`active`);
    setTimeout(() => {
      modal.style.display = 'none';
    }, 500)
  } else {
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.toggle(`active`);
    }, 10)
  }
}

function previewToggle(img) {
  console.log(img);
  if (img) {
    document.querySelector(`#previewImg`).src = `img/${img}`;
    document.querySelector(`#previewName`).innerHTML = img;
  }
  let modal = document.querySelector(`#modal_img_preview`);
  if (modal.classList.value.includes(`active`)) {
    modal.classList.toggle(`active`);
    setTimeout(() => {
      modal.style.display = 'none';
    }, 500)
  } else {
    modal.style.display = 'flex';
    setTimeout(() => {
      modal.classList.toggle(`active`);
    }, 10)
  }
}