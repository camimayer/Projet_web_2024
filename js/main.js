var listeAsyncCours;

function chargerAsyncCours() {
    var xhr;
    try {
        xhr = new ActiveXObject("Msxm12.XMLHTTP");
    }
    catch (e) {
        try {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e1) {
            try {
                xhr = new XMLHttpRequest();
            }
            catch (e2) {
            }
        }
    }
    xhr.open("GET", "https://raw.githubusercontent.com/camimayer/Projet_web_2024/master/json/coursAsynchrone.json", false);
    xhr.send();
    if (xhr.readyState == 4) {
        var reponse = xhr.responseText;
        var objJSON = JSON.parse(reponse);
        listeAsyncCours = objJSON.Cours;
        afficherCoursAsync();
    }
}

function afficherCoursAsync(){
    var mainContent = document.getElementById("main-content-async");

    listeAsyncCours.forEach(element => {
        var div = document.createElement("div");
        div.className = "card";
        div.style.width = "18rem";
        var image = document.createElement("img");
        image.src = element.image;
        image.className = "card-img-top";
        var div2 = document.createElement("div");
        div2.className = "card-body";
        var h5 = document.createElement("h5");
        h5.className = "card-title";
        h5.innerText = element.titreCours;
        
        div2.appendChild(h5);
        div.appendChild(image);
        div.appendChild(div2);

        mainContent.appendChild(div);

    });
}