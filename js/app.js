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
    
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML="";
    
    // Show Details for Every Phone
    // console.log("in show",data);
    // for(let i=0; i < data.length; i++){
    //     console.log("slug-",i,": ",data[i].slug);
    // }

    //Main Display Done
    data.forEach(phone => {
        let phoneId = phone.slug;
        //console.log(phoneId);
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
    console.log(data);
    const phoneDetails = document.getElementById('phone-details');
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML=''; 
    phoneDetails.innerHTML='';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <h1 class="p-3 text-center text-primary">Detils Information</h1>
        <h5 class="card-title fs-1">${data.name}</h5>
        <img src="${data.image}" class="card-img-top w-50 mx-auto mt-2 mb-3" alt="...">
    <p><a href="" class="btn btn-primary">Buy Now</a></p>
    `;
    phoneDetails.appendChild(div);
}

{/* <p class="card-text">${meal.strInstructions.slice(0, 150)}</p> */}
