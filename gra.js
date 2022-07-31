const pola = document.querySelectorAll('.pole');
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
console.log(pola);

pola.forEach((pole) => {
    pole.style.backgroundColor = `${getRandomHexColor()}`;
}) 