function onChangeEmail() {
    basculeBoutonsDesactives();
    basculeErreursEmail();
}

function onChangeMotPasse() {
    basculeBoutonsDesactives();
    basculeErreursMotPasse()
}

function login() {
    window.location.href = "cart.html";
}

function cEstEmailValide() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return valideEmail(email);
}

function basculeErreursEmail() {
    const email = form.email().value;
    form.emailRequis().style.display = email ? "none" : "block";

    form.emailInvalide().style.display = valideEmail(email) ? "none" : "block";
}

function basculeErreursMotPasse() {
    const motPasse = form.motPasse().value;

    form.motPasseRequis().style.display = motPasse ? "none" : "block";
}

function basculeBoutonsDesactives() {
    const emailValide = cEstEmailValide();
    form.motPasseOblie().disabled = !emailValide;

    const motPasseValide = cEstMotPasseValide;
    form.buttonContinue().disabled = !emailValide || !motPasseValide;
}

function cEstMotPasseValide() {
    const motPasse = form.motPasse().value;
    if (!motPasse) {
        return false;
    }
    return true;
}

function valideEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const form = {
    email: () => document.getElementById("idEmail"),
    emailInvalide: () => document.getElementById("idEmailInvalide"),
    emailRequis: () => document.getElementById("idEmailRequis"),
    buttonContinue: () => document.getElementById("idButtonContinue"),
    motPasse: () => document.getElementById("idMotPasse"),
    motPasseRequis: () => document.getElementById("idMotPasseRequis"),
    motPasseOblie: () => document.getElementById("idButtonOblie")
}
