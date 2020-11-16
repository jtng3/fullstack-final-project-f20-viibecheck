function switchToForm() {
    let text = document.getElementById("leftPage");
    let form = document.getElementById("rightPage");

    text.style.display = "none";
    form.style.display = "block";
}

function switchToText() {
    let text = document.getElementById("leftPage");
    let form = document.getElementById("rightPage");

    text.style.display = "block";
    form.style.display = "none";
}