// Store Elements In Variables
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "creat";
let tmp;

// START Function ---1--- : Get The Total Price;
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#0f0";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#f10";
  }
}
// END Function ---1--- : Get The Total Price;

//START Function ---2--- : Creat a New Product And Save It In LocalStorage;
let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
submit.onclick = function () {
  let newPro = {
    proTitle: title.value.toLowerCase(),
    proPrice: price.value,
    proTaxes: taxes.value,
    proAds: ads.value,
    proDiccont: discount.value,
    proTotal: total.innerHTML,
    proCount: count.value,
    proCategory: category.value.toLowerCase(),
  };
  //Start Nested Step --- 0--- : Creat A Quantity Of Products;
 if(title.value !='' 
  && price.value !=''
  && category.value !=''
  && newPro.proCount < 100){
    if (mood === "creat") {
      if (newPro.proCount > 1) {
        for (let i = 0; i < newPro.proCount; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "creat";
      count.style.display = "block";
      submit.innerHTML = "Creat";
    }
 }
  

  localStorage.setItem("product", JSON.stringify(dataPro));
  clearData();
  showData();
  getTotal() 
};
//END Function ---2--- : Creat a New Product And Save It In LocalStorage;

//START Function ---3--- : Clear All Input's Data;
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";

}
//END Function ---3--- : Clear All Input's Data;

//START Function ---4--- : Read All Input's Data;
function showData() {
  let readProducts = "";
  for (let i = 0; i < dataPro.length; i++) {
    readProducts += `<tr>
                            <td>${i}</td>
                            <td>${dataPro[i].proTitle}</td>
                            <td>${dataPro[i].proPrice}</td>
                            <td>${dataPro[i].proTaxes}</td>
                            <td>${dataPro[i].proAds}</td>
                            <td>${dataPro[i].proDiccont}</td>
                            <td>${dataPro[i].proTotal}</td>
                            <td>${dataPro[i].proCategory}</td>
                            <td><button id="button" onclick=" updateData(${i})">update</button></td>
                            <td><button id="button" onclick="deleteData (${i})">delete</button></td>
                        </tr>`;
  }
  document.getElementById("tbody").innerHTML = readProducts;
  let deleteAll = document.getElementById("delete_all");
  if (dataPro.length > 0) {
    deleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length}) </button>`;
  } else {
    deleteAll.innerHTML = "";
  }
}
showData();
getTotal();
//END Function ---4--- : Read All Input's Data;

//START Function ---5--- : Delete One Product;
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
// START Function ---6--- : Delete All ;
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
// End Function ---6--- : Delete All ;

// Start Function ---7--- : Update Products ;
function updateData(i) {
  title.value = dataPro[i].proTitle;
  price.value = dataPro[i].proPrice;
  taxes.value = dataPro[i].proTaxes;
  ads.value = dataPro[i].proAds;
  discount.value = dataPro[i].proDiccont;
  category.value = dataPro[i].proCategory;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// Start Function ---8--- : Search By Title or Catogery ;
// Step--1--: select one mood;
let searchmood = "title";
function getSearchMood(id) {
 
  let search = document.getElementById("search");
  if (id == "searchByTitle") {
    searchmood = "title";
    search.placeholder = " Search by Title";
  } else {
    searchmood = "category";
    search.placeholder = " Search by Category";
   
  }
  search.focus();
  search.value='';
  showData();
}
// step--2--: creat search data function;
function searchData(value) {
  let readProducts = "";
  if (searchmood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].proTitle.includes(value.toLowerCase())) {
        readProducts += `
                          <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].proTitle}</td>
                            <td>${dataPro[i].proPrice}</td>
                            <td>${dataPro[i].proTaxes}</td>
                            <td>${dataPro[i].proAds}</td>
                            <td>${dataPro[i].proDiccont}</td>
                            <td>${dataPro[i].proTotal}</td>
                            <td>${dataPro[i].proCategory}</td>
                            <td><button id="button" onclick=" updateData(${i})">update</button></td>
                            <td><button id="button" onclick="deleteData (${i})">delete</button></td>
                          </tr>`;
       
      }
    }
  }else{
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].proCategory.includes(value.toLowerCase())) {
        readProducts += `
                          <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].proTitle}</td>
                            <td>${dataPro[i].proPrice}</td>
                            <td>${dataPro[i].proTaxes}</td>
                            <td>${dataPro[i].proAds}</td>
                            <td>${dataPro[i].proDiccont}</td>
                            <td>${dataPro[i].proTotal}</td>
                            <td>${dataPro[i].proCategory}</td>
                            <td><button id="button" onclick=" updateData(${i})">update</button></td>
                            <td><button id="button" onclick="deleteData (${i})">delete</button></td>
                          </tr>`;
      }
    }
  }
  document.getElementById('tbody').innerHTML = readProducts;
 
}
// Start Function ---9--- : Clean Data ;
