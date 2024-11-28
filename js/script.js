let currentIndex = 0;
const images = [
    { src: "img/photo_1.jpg", text: "Description de la première photo", textClass: "left" },  // Description à gauche
    { src: "img/photo_2.jpg", text: "Description de la deuxième photo", textClass: "center" },  // Description au centre
    { src: "img/photo_3.jpg", text: "Description de la troisième photo", textClass: "right" }   // Description à droite
];

const photoContainer = document.querySelector("#photo-container");
const photoWrapper = document.querySelector(".photo-wrapper");
const photo = document.querySelector(".photo");
const photoText = document.querySelector(".photo-text");

let zoomFactor = 1; // Initialisation du facteur de zoom
let wheelCount = 0; // Pour compter les événements de molette

// Fonction pour mettre à jour l'image et le texte
function updatePage() {
    // Appliquer un effet de fondu sur l'image et le texte actuel
    photo.classList.add("fade-out");
    photoText.classList.add("fade-out");

    // Changer l'image et le texte après un délai de transition
    setTimeout(() => {
        photo.src = images[currentIndex].src;
        photoText.textContent = images[currentIndex].text;

        // Réinitialiser le zoom à chaque changement d'image
        zoomFactor = 1;
        photo.style.transform = `scale(${zoomFactor})`;

        // Réinitialiser les classes de position de texte
        photoText.classList.remove("left", "center", "right");
        photoText.classList.add(images[currentIndex].textClass);

        // Ajouter l'effet de fondu entrant
        photo.classList.remove("fade-out");
        photoText.classList.remove("fade-out");
        photo.classList.add("fade-in");
        photoText.classList.add("fade-in");
    }, 500); // Délai pour permettre l'effet de fondu
}

// Fonction pour gérer le zoom avec la molette
function handleZoom(event) {
    event.preventDefault();
    const delta = event.deltaY;

    // Si on zoom avant (molette vers le haut)
    if (delta < 0) {
        // Augmenter progressivement le zoom jusqu'à un maximum
        if (zoomFactor < 2) {
            zoomFactor += 0.05;  // Augmenter le zoom
        }
    } 
    // Si on dézoome (molette vers le bas)
    else if (delta > 0) {
        // Réduire progressivement le zoom jusqu'à un minimum
        if (zoomFactor > 0.5) {
            zoomFactor -= 0.05;  // Réduire le zoom
        }
    }

    // Appliquer le zoom uniquement à l'image
    photo.style.transform = `scale(${zoomFactor})`;

    // Si le zoom atteint une certaine taille (par exemple 2x), changer d'image
    if (zoomFactor >= 2) {
        // Changer d'image et appliquer la transition
        if (currentIndex < images.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Revenir à la première image si c'est la dernière
        }
        
        // Appliquer la transition de changement d'image
        updatePage();

        // Réinitialiser le zoom à 1
        zoomFactor = 1;
        photo.style.transform = `scale(${zoomFactor})`;
    }

    // Si le zoom devient trop petit (par exemple 0.5x), changer d'image pour revenir à l'image précédente
    if (zoomFactor <= 0.5) {
        // Changer d'image et appliquer la transition en revenant à l'image précédente
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = images.length - 1; // Revenir à la dernière image si c'est la première
        }

        // Appliquer la transition de changement d'image
        updatePage();

        // Réinitialiser le zoom à 1
        zoomFactor = 1;
        photo.style.transform = `scale(${zoomFactor})`;
    }
}


// Appliquer le gestionnaire d'événement sur la molette
document.querySelector("#photo-container").addEventListener("wheel", handleZoom);

// Initialiser la première image et son texte
updatePage();






