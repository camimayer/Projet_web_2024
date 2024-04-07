var listeUtilisateurs;

function valideLogin() {
    chargerUtilisateurs();
    basculeErreursEmail();
    basculeErreursMotPasse()
    if(bonEmailBomMotPasse()){
        window.location.href = "cart.html";
    } else {
        alert("Nom d'utilisateur ou mot de passe invalide.");
    }
}

function bonEmailBomMotPasse() {
    const email = form.email().value;
    const motPasse = form.motPasse().value;
    for (i = 0; i < listeUtilisateurs.length; i++) {
        const emailDB = listeUtilisateurs[i].Email;
        const motPasseDB = listeUtilisateurs[i].MotPasse;
        if(email == emailDB && motPasse == motPasseDB) {
            return true;
        }
    }
    return false;
}

function chargerUtilisateurs() {
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
      "https://raw.githubusercontent.com/camimayer/Projet_web_2024/master/json/utilisateurs.json",
      false
    );
    xhr.send();
    if (xhr.readyState == 4) {
      var reponse = xhr.responseText;
      var objJSON = JSON.parse(reponse);
      listeUtilisateurs = objJSON.Utilisateurs;
    }
  }

function basculeErreursEmail() {
    const email = form.email().value;
    if (!email) {
        form.emailInvalide().style.display = "none";
        form.emailRequis().style.display = "block";
        form.br().style.display = "none";
    } else if (!valideEmail(email)) {
        form.emailRequis().style.display = "none";
        form.emailInvalide().style.display = "block";
        form.br().style.display = "none";
    }else {
        form.emailInvalide().style.display = "none";
        form.emailRequis().style.display = "none";
        form.br().style.display = "block";
    }
}

function basculeErreursMotPasse() {
    const motPasse = form.motPasse().value;
    if (!motPasse) {
        form.motPasseRequis().style.display = "block";
        form.br2().style.display = "none";
    } else {
        form.motPasseRequis().style.display = "none";
        form.br2().style.display = "block";
    }
}

function valideEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const form = {
    email: () => document.getElementById("idEmail"),
    emailInvalide: () => document.getElementById("idEmailInvalide"),
    emailRequis: () => document.getElementById("idEmailRequis"),
    motPasse: () => document.getElementById("idMotPasse"),
    motPasseRequis: () => document.getElementById("idMotPasseRequis"),
    br: () => document.getElementById("br"),
    br2: () => document.getElementById("br2")
}
