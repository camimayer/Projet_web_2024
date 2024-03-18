var listeAsyncCours;
var listeSyncCours;
var left = 0;
var right = 3;

function chargerAsyncCours(isDetails) {
  var xhr;
  try {
    xhr = new ActiveXObject("Msxm12.XMLHTTP");
  } catch (e) {
    try {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e1) {
      try {
        xhr = new XMLHttpRequest();
      } catch (e2) {}
    }
  }
  xhr.open(
    "GET",
    "https://raw.githubusercontent.com/camimayer/Projet_web_2024/master/json/coursAsynchrone.json",
    false
  );
  xhr.send();
  if (xhr.readyState == 4) {
    var reponse = xhr.responseText;
    var objJSON = JSON.parse(reponse);
    listeAsyncCours = objJSON.Cours;

    if (isDetails != true) {
      afficherCoursAsync();
    }
  }
}

function chargerSyncCours(isDetails) {
  var xhr;
  try {
    xhr = new ActiveXObject("Msxm12.XMLHTTP");
  } catch (e) {
    try {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e1) {
      try {
        xhr = new XMLHttpRequest();
      } catch (e2) {}
    }
  }
  xhr.open(
    "GET",
    "https://raw.githubusercontent.com/camimayer/Projet_web_2024/master/json/coursSynchrone.json",
    false
  );
  // xhr.open("GET", "/json/coursSynchrone.json", false);
  xhr.send();
  //alert("23:00" - "18:00");
  if (xhr.readyState == 4) {
    var reponseSyn = xhr.responseText;
    var objJSONSyn = JSON.parse(reponseSyn);
    listeSyncCours = objJSONSyn.Cours;

    if (isDetails != true) {
      afficherCoursSync();
    }
  }
}

function afficherCoursAsync() {
  var mainContent = document.getElementById("main-content-async");

  listeAsyncCours.forEach((element) => {
    var div = document.createElement("div");
    div.className = "card";
    div.style.width = "18rem";
    var image = document.createElement("img");
    image.src = element.image;
    image.className = "card-img-top";
    var div2 = document.createElement("div");
    div2.className = "card-body";
    var a = document.createElement("a");
    a.className = "card-title-custom";
    a.innerText = element.titreCours;
    a.href = "details.html?id=" + element.id;
    var p = document.createElement("p");
    p.className = "card-text";
    p.innerText = element.formateur;
    var divStar = document.createElement("div");
    divStar.className = "container-star";

    for (var i = 0; i < element.nombreEtoiles; i++) {
      var star = document.createElement("img");
      star.className = "img-star";
      star.src = "./imgs/star.jpeg";
      divStar.appendChild(star);
    }

    var h6price = document.createElement("h6");
    h6price.innerText = element.prix + " CA$";

    var btnAjouter = document.createElement("a");
    btnAjouter.className = "btn btn-primary w-100 mt-2";
    btnAjouter.innerText = "Ajouter au Panier";
    btnAjouter.addEventListener('click', function() {
      ajouterPanier(element);
    });

    div2.appendChild(a);
    div2.appendChild(p);
    div2.appendChild(divStar);
    div2.appendChild(h6price);
    div2.appendChild(btnAjouter);
    div.appendChild(image);
    div.appendChild(div2);

    mainContent.appendChild(div);
  });
  
}

function afficherCoursSync() {
  var mainContentSync = document.getElementById("main-content-sync");

  listeSyncCours.forEach((element) => {
    var div = document.createElement("div");
    div.className = "card";
    div.style.width = "18rem";
    var image = document.createElement("img");
    image.src = element.image;
    image.className = "card-img-top";
    var div2 = document.createElement("div");
    div2.className = "card-body";
    var a = document.createElement("a");
    a.className = "card-title-custom";
    a.innerText = element.titreCours;
    a.href = "details.html?id=" + element.id;
    var p = document.createElement("p");
    p.className = "card-text";
    p.innerText = element.formateur;
    var divStar = document.createElement("div");
    divStar.className = "container-star";

    for (var i = 0; i < element.nombreEtoiles; i++) {
      var star = document.createElement("img");
      star.className = "img-star";
      star.src = "./imgs/star.jpeg";
      divStar.appendChild(star);
    }

    var h6price = document.createElement("h6");
    h6price.innerText = element.prix + " CA$";

    var btnAjouter = document.createElement("a");
    btnAjouter.className = "btn btn-primary w-100 mt-2";
    btnAjouter.innerText = "Ajouter au Panier";
    btnAjouter.addEventListener('click', function() {
      ajouterPanier(element);
    });

    div2.appendChild(a);
    div2.appendChild(p);
    div2.appendChild(divStar);
    div2.appendChild(h6price);
    div2.appendChild(btnAjouter);
    div.appendChild(image);
    div.appendChild(div2);

    mainContentSync.appendChild(div);
  });
}

function chargerDetails() {
  var id = window.location.href.split("=")[1];
  var currentCourse;

  if (id.includes("async")) {
    chargerAsyncCours(true);
    listeAsyncCours.forEach((element) => {
      if (element.id == id) {
        currentCourse = element;
      }
    });
    console.log(currentCourse);
  } else {
    chargerSyncCours(true);
    listeSyncCours.forEach((element) => {
      if (element.id == id) {
        currentCourse = element;
      }
    });
    console.log(currentCourse);
  }
}
function afficherPromo() {
  chargerAsyncCours(true);
  chargerSyncCours(true);
  var allCourses = listeAsyncCours.concat(listeSyncCours);
  var coursPromoCarous = document.getElementById("cours-promo-carous");
  coursPromoCarous.innerHTML = "";
  var promoCours = [];
  allCourses.forEach((element) => {
    if(element.isPromotion == true){
        promoCours.push(element);
    }
  })
  promoCours = promoCours.slice(left, right);

  promoCours.forEach((element) => {
    var div = document.createElement("div");
    div.className = "card";
    div.style.width = "18rem";
    var image = document.createElement("img");
    image.src = element.image;
    image.className = "card-img-top";
    var div2 = document.createElement("div");
    div2.className = "card-body";
    var a = document.createElement("a");
    a.className = "card-title-custom";
    a.innerText = element.titreCours;
    a.href = "details.html?id=" + element.id;

    var h6newPrice = document.createElement("h6");
    h6newPrice.innerText = element.newPrix + " CA$";
    h6newPrice.className = "old-price";

    var h7price = document.createElement("h7");
    h7price.innerText = element.prix + " CA$";
    h7price.className = "new-price";

    var btnAjouter = document.createElement("a");
    btnAjouter.className = "btn btn-primary w-100 mt-2";
    btnAjouter.innerText = "Ajouter au Panier";
    btnAjouter.addEventListener('click', function() {
      ajouterPanier(element);
    });

    div2.appendChild(a);
    div2.appendChild(h7price);
    div2.appendChild(h6newPrice);
    div2.appendChild(btnAjouter);
    div.appendChild(image);
    div.appendChild(div2);

    coursPromoCarous.appendChild(div);
    AfficherPopulaire();
  });
}
function carouselRight(){
    right = right + 1;
    left = left + 1;
    afficherPromo();
}
function carouselLeft(){
    right = right - 1;
    left = left - 1;
    afficherPromo();
}

function AfficherPopulaire(){
  var allCourses = listeAsyncCours.concat(listeSyncCours);
  var coursPopulaire = document.getElementById("populaire-cours");
  coursPopulaire.innerHTML = "";
  var populaireCours = [];
  allCourses.forEach((element) => {
    if(element.nombreEtoiles == 5){
      populaireCours.push(element);
    }
  })
     console.log(populaireCours);

    populaireCours.forEach((element) => {

    var div = document.createElement("div");
    div.className = "card";
    div.style.width = "18rem";
    var image = document.createElement("img");
    image.src = element.image;
    image.className = "card-img-top";
    var div2 = document.createElement("div");
    div2.className = "card-body";
    var a = document.createElement("a");
    a.className = "card-title-custom";
    a.innerText = element.titreCours;
    a.href = "details.html?id=" + element.id;
    var p = document.createElement("p");
    p.className = "card-text";
    p.innerText = element.formateur;
    var divStar = document.createElement("div");
    divStar.className = "container-star";

    for (var i = 0; i < element.nombreEtoiles; i++) {
      var star = document.createElement("img");
      star.className = "img-star";
      star.src = "./imgs/star.jpeg";
      divStar.appendChild(star);
    }

    var h6price = document.createElement("h6");
    h6price.innerText = element.prix + " CA$";

    var btnAjouter = document.createElement("a");
    btnAjouter.className = "btn btn-primary w-100 mt-2";
    btnAjouter.innerText = "Ajouter au Panier";
    btnAjouter.addEventListener('click', function() {
      ajouterPanier(element);
    });

    div2.appendChild(a);
    div2.appendChild(p);
    div2.appendChild(divStar);
    div2.appendChild(h6price);
    div2.appendChild(btnAjouter);
    div.appendChild(image);
    div.appendChild(div2);

    coursPopulaire.appendChild(div);
  });

}

function ajouterPanier(element) {
  var dejaAjoute = false;

  var panier = getCookie("panier") || "";
  panier.split(",").forEach((el)=>{
    if(el === element.id){
      dejaAjoute = true;  
    }
  })
  if(dejaAjoute){
    alert("Vous avez deja adc cette cours!");
    return;
  }
  alert("Cours ajoute!");
  panier = panier + "," + element.id;
  document.cookie = "panier=" + panier + "; path=/";

  console.log(document.cookie);

}
function afficherPanier() {
  chargerAsyncCours(true);
  chargerSyncCours(true);
  var cookie = getCookie("panier");
  var allCourses = listeAsyncCours.concat(listeSyncCours);
  var splitCookie = [];
  if(cookie != null){
    splitCookie = cookie.split(",");
  }
  else{
    alert("Votre panier est vide!");
  }

  
  var panierCours = [];
  allCourses.forEach((element) => {
    if(splitCookie.includes(element.id)){
      panierCours.push(element);
    }
  });
   
  console.log(panierCours);
  panierCours.forEach((element) => {
    var table = document.getElementById("table-panier");
    var tr = document.createElement("tr");
    tr.className = "tr-cart2";
    var tdImg = document.createElement("td");
    var imagepanier = document.createElement("img");
    imagepanier.src = element.image;
    imagepanier.className = "img-panier";
    var tdproduct = document.createElement("td");
    tdproduct.innerText = element.titreCours;
    tdproduct.className = "product-cart";
    var tdprice = document.createElement("td");
    tdprice.innerText = element.prix + "$CAD";
    tdprice.className = "price-cart";
    var tdBtnDelete = document.createElement("td");
    var btnDelete = document.createElement("button");
    btnDelete.className = "btn-delete-cart";
    var i =  document.createElement("i");
    i.className = "bi bi-trash";
    btnDelete.appendChild(i);

    tdImg.appendChild(imagepanier);
    tdBtnDelete.appendChild(btnDelete);
    tr.appendChild(tdImg);
    tr.appendChild(tdproduct);
    tr.appendChild(tdprice);
    tr.appendChild(tdBtnDelete);
    table.appendChild(tr);
  
  });



}
function getCookie(name) {
  var cookieArr = document.cookie.split(";");
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  return null;
}

function deleteAllCookies() {
  document.cookie = "panier=" + "; path=/";
}

function calculerPrixTotal(){
  chargerAsyncCours(true);
  chargerSyncCours(true);
  var cookie = getCookie("panier");
  var allCourses = listeAsyncCours.concat(listeSyncCours);
  var splitCookie = [];
  if(cookie != null){
    splitCookie = cookie.split(",");
  }
  else{
    alert("Votre panier est vide!");
  }

  var prixTotal = 0;

}