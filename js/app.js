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
    // searchResult.textContent = '';
    // console.log(data.length);
    data.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML= `
        <div class="card">
            <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-2 mb-3" alt="...">
            <p class="bg-dark rounded-pill p-2 text-light mx-3 text-center">${phone.brand}</p>
            <div class="card-body">
                <h5 class="card-title mb-3">${phone.phone_name}</h5>
                <a href="#" class="btn btn-primary">Show Details</a>
                
            </div>
      </div>
      `;
    searchResult.appendChild(div);

    })

}
/*
 

*/