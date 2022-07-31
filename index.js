// Take element when galerry has been added (div container)
const photoContainer = document.querySelector('.photo-container');

//loader
const loader = document.getElementById('loader');
// Initializing variables
let ready = false;
let imageLoad = 0;
let totalImages = 0;
let page = 1;
let fotos = [];


// Check if all images are loaded
function imageLoaded() {
    ready = false;
    imageLoad++;
    if (imageLoad === totalImages) {
        ready = true;
       setAttributes (loader, {class: "hide"})
    } 
}

// Function help adding attributes to creating DOM element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Show photos geted from API
function showPhoto() {
    imageLoad = 0;
    totalImages = fotos.length;
    fotos.forEach((foto) => {
        // If photo heven't alt description, converting photo url to titel
        let title;
        if (foto.alt == "") {
            let splitUrl = foto.url.split('/');
            let splitTitle = splitUrl[splitUrl.length - 2].split('-');
            splitTitle.pop();
            title = splitTitle.join(" ")
        } else { title = foto.alt };
        // create main div
    const item = document.createElement('div');
    setAttributes(item, {
        id: foto.id,
        class: 'photo',
        data: 'open-modal',
    });
        // create img
    const img = document.createElement('img');
    setAttributes(img, {
        src: foto.src.medium,
        alt: foto.alt,
        title: title,
    });
        img.addEventListener('load', imageLoaded);
        // create div
        const author = document.createElement('div');
        setAttributes(author, {
            class: "hidden author",
        });
        author.innerHTML = `<a href="${foto.photographer_url}">${foto.photographer}</a>`;
        //inserting img and author div inside main div
        item.appendChild(img);
        item.appendChild(author);
        // inserting main div inside div container
    photoContainer.appendChild(item);
    });

}

// fetching data from API
async function fetchImage(page) {
    loader.classList.remove('hide');
    try {
        const API_KEY = '563492ad6f91700001000001da637683279540acbe61e6e7a850248e';
        const baseURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=30`;
        // const searchURL = `"https://api.pexels.com/v1/search?query=nature&per_page=30"`
        const response = await fetch(baseURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: API_KEY
            }
        });
        const data = await response.json();
        fotos = data.photos;
        showPhoto();
    }
    catch (error) {
        console.log(error.message)

    }
}
    
    

    
// On load
fetchImage(page)

// Event to start infinity scroll
window.addEventListener('scroll', () => {

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        page = page + 1;
       
        fetchImage(page);
        
    }

});



