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
    btnAjouter.className = "btn btn-primary";
    btnAjouter.innerText = "Ajouter au Panier";

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

    var h7price = document.createElement("h7");
    h7price.innerText = element.prix + " CA$";

    var btnAjouter = document.createElement("a");
    btnAjouter.className = "btn btn-primary";
    btnAjouter.innerText = "Ajouter au Panier";

    div2.appendChild(a);
    div2.appendChild(h7price);
    div2.appendChild(h6newPrice);
    div2.appendChild(btnAjouter);
    div.appendChild(image);
    div.appendChild(div2);

    coursPromoCarous.appendChild(div);
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