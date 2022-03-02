//Show Error Message Function
const shoewErrorMessage = () =>{
    const div= document.getElementById('error-message');
        div.innerHTML=`<div class="Container text-center text-danger">
        <h1 class="fs-2">Please search only for iPhone, Huawei, Oppo or Samsung</h1>
        </div>
        `;
}


const searchPhoe = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    const finalSearch= searchText.toLowerCase();
    //console.log(finalSearch);
    searchField.value = '';
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML= '';
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = '';
    const div= document.getElementById('error-message');
    div.innerHTML="";
    const url= `https://openapi.programming-hero.com/api/phones?search=${finalSearch}`;

    if (finalSearch == '') {
        shoewErrorMessage();
    }
    else if(finalSearch=='iphone' || finalSearch=='oppo' || finalSearch=='huawei' || finalSearch=='apple' || finalSearch=='samsung'){
        fetch(url)
            .then(res => res.json())
            .then(phones => displaySearchResult(phones.data));
    }
    else{
        shoewErrorMessage();
    }
};

const displaySearchResult = data =>{
    //console.log(data.length);
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML="";

    let phoneCount = 0;
    //Main Display Done
    data.forEach(phone => {
        let phoneId = phone.slug;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML= `
        <div class="card shadow">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-2 mb-3" alt="...">
            <p class="bg-dark rounded-pill p-2 text-light mx-3 text-center w-50 mx-auto">${phone.brand}</p>
            <div class="card-body">
                <h5 class="card-title mb-3">${phone.phone_name}</h5>
                <button class="btn btn-primary" onclick="showDetails('${phoneId}')">Show Details</button>
            </div>
      </div>
      `;
    searchResult.appendChild(div);
    
    })
    
}

const showDetails = id =>{
    //console.log("phone id:",id);
    const url= `https://openapi.programming-hero.com/api/phone/${id}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(phone => displayPhoneDetail(phone.data));
}

const displayPhoneDetail = data => {
    //console.log(data);
    const releaseDate = data.releaseDate;
    const chipSet = data.mainFeatures.chipSet;
    const display = data.mainFeatures.displaySize;
    const memorySize = data.mainFeatures.memory;
    const sensors = data.mainFeatures.sensors;
    const storage = data.mainFeatures.storage;
    //other features
    const waln = data.others.WLAN;
    const bluetooth = data.others.Bluetooth;
    const gps = data.others.GPS;
    const nfc = data.others.NFC;
    const radio = data.others.Radio;
    const usb = data.others.USB;

    //console.log(data.others.WLAN);
    const checkReleaseDate = text =>{
        if(text == '' || text == undefined){
            return 'Not Found!';
        }
        else{
            return text;
        }
    }

    const phoneDetails = document.getElementById('phone-details');
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML=''; 
    phoneDetails.innerHTML='';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <h1 class="p-3 text-center text-primary">Detail Information</h1>
        <h5 class="card-title fs-1 text-center">${data.name}</h5>
        <img src="${data.image}" class="row w-50 mx-auto mt-3 mb-3" alt="...">
        <table class="table table-hover w-100">
            <tbody>
                <tr>
                    <td class="border text-center m-auto w-50 fw-bold">Release Date:</td>
                    <td class="border">${checkReleaseDate(releaseDate)}</td>
                </tr>
                <tr>
                    <td class="border text-center m-auto w-50 fw-bold">Processor:</td>
                    <td class="border">${checkReleaseDate(chipSet)}</td>
                </tr>
                <tr>
                    <td class="border text-center m-auto w-50 fw-bold">Display:</td>
                    <td class="border">${checkReleaseDate(display)}</td>
                </tr>
                <tr>
                    <td class="border text-center m-auto w-50 fw-bold">Memory:</td>
                    <td class="border">${checkReleaseDate(memorySize)}</td>
                </tr>
                <tr>
                    <td class="border text-center m-auto w-50 fw-bold">Sensors:</td>
                    <td class="border">${checkReleaseDate(sensors)}</td>
                </tr>
                <tr>
                    <td class="border text-center m-auto w-50 fw-bold">Storage:</td>
                    <td class="border">${checkReleaseDate(storage)}</td>
                </tr>
                <tr>
                    <td class="border text-center m-auto w-50 fw-bold">Others:</td>
                    <td class="border">
                        <span class="fw-bold">WALN:</span> <span>${checkReleaseDate(waln)}</span><br>
                        <span class="fw-bold">Bluetooth:</span> <span>${checkReleaseDate(bluetooth)}</span><br>
                        <span class="fw-bold">GPS:</span> <span>${checkReleaseDate(gps)}</span><br>
                        <span class="fw-bold">NFC:</span> <span>${checkReleaseDate(nfc)}</span><br>
                        <span class="fw-bold">Radio:</span> <span>${checkReleaseDate(radio)}</span><br>
                        <span class="fw-bold">USB:</span> <span>${checkReleaseDate(usb)}</span><br>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="row w-50 text-center mx-auto"><a href="" class="btn btn-primary fs-2">Buy Now</a></p>
    `;
    phoneDetails.appendChild(div);
}

/*

data.forEach(phone => {
    let phoneId = phone.slug;
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML= `
    <div class="card shadow">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-2 mb-3" alt="...">
        <p class="bg-dark rounded-pill p-2 text-light mx-3 text-center w-50 mx-auto">${phone.brand}</p>
        <div class="card-body">
            <h5 class="card-title mb-3">${phone.phone_name}</h5>
            <button class="btn btn-primary" onclick="showDetails('${phoneId}')">Show Details</button>
        </div>
  </div>
  `;
searchResult.appendChild(div);

})

*/