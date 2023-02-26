const loadPhones = async(searchText,dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data,dataLimit);
}
const displayPhone = (phones,dataLimit) =>{
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerText = '';
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none');
    }
    // no found 
    const searchF = document.getElementById('not-found');
    if( phones.length === 0){
        searchF.classList.remove('d-none')
    }
    else{
        searchF.classList.add('d-none')
    }

    // display phone found
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card px-5 py-2">
                        <img src="${phone.image}" class="card-img-top img-fluid p-3" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-toggle="modal" data-target="#phoneDetail">Show Details</button>
                          

                        </div>
                      </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleLoader(false);
}

const processSearch = (dataLimit) => {
    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    processSearch(10);
})


// enter key handle
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})


const toggleLoader = isLoading => {
    const loaderSpin = document.getElementById('loader');
    if(isLoading){
        loaderSpin.classList.remove('d-none');
    }
    else{
        loaderSpin.classList.add('d-none');
    }
}


// not the best way
document.getElementById('btn-showall').addEventListener('click', function(){
    processSearch();
})


const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    console.log(phone.mainFeatures.displaySize
        );
    const modalTitle = document.getElementById('phoneDetailLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date : ${phone.releaseDate ? phone.releaseDate : "No release date found"}</p>
    <p>Storage : ${phone.mainFeatures.storage ? phone.mainFeatures.storage : "No storage information given"}<br> Display Size : ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : "No display information given"}</p>
    `
}


loadPhones('apple');

