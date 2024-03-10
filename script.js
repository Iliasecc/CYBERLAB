document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const links = document.querySelectorAll(".nav-links li");

    hamburger.addEventListener('click', () => {
        // Toggle the 'open' class on navLinks
        navLinks.classList.toggle("open");

        // Toggle the 'fade' class on each link
        links.forEach(link => {
            link.classList.toggle("fade");
        });

        // Toggle the 'toggle' class on hamburger
        hamburger.classList.toggle("toggle");
    });
});

function goToDashboard() {
    window.location.href = "index1.html";
}

function viewProfile() {
    window.location.href = "profile.html";
}

function submitReportBtn() {
    window.location.href = "submit.html"
}

document.addEventListener("DOMContentLoaded", function () {
    const pdfInput = document.getElementById("pdfInput");
    const pdfContainer = document.getElementById("pdfContainer");

    // Chargez le PDF précédemment enregistré depuis le stockage local
    const savedPdf8 = localStorage.getItem("savedPdf8");

    if (savedPdf8) {
        displayPdf(savedPdf8);
    } else {
        showSubmitPdfBtn();
    }

    function displayPdf(pdfUrl) {
        const pdfEmbed = document.createElement("embed");
        pdfEmbed.src = pdfUrl;
        pdfEmbed.type = "application/pdf";
        pdfEmbed.width = "100%";
        pdfEmbed.height = "500px";

        pdfContainer.innerHTML = "";
        pdfContainer.appendChild(pdfEmbed);

        // Ajoutez un bouton de suppression au-dessus du PDF
        const deletePdfIcon = document.createElement("button");
        deletePdfIcon.textContent = "Delete PDF";
        deletePdfIcon.addEventListener("click", deletePdf);

        pdfContainer.appendChild(deletePdfIcon);
    }

    function showSubmitPdfBtn() {
        // Vérifiez si le bouton Soumettre PDF existe et affichez-le
        const submitPdfBtn = document.getElementById("submitPdfBtn");
        if (submitPdfBtn) {
            submitPdfBtn.style.display = "block";
        } else {
            // Si le bouton Soumettre PDF n'existe pas, créez-le et ajoutez un gestionnaire d'événements
            const submitPdfBtn = document.createElement("button");
            submitPdfBtn.id = "submitPdfBtn";
            submitPdfBtn.textContent = "Submit PDF";
            submitPdfBtn.addEventListener("click", submitPdf);

            pdfContainer.appendChild(submitPdfBtn);
        }
    }

    function submitPdf() {
        const file = pdfInput.files[0];

        if (file && file.type === "application/pdf") {
            const reader = new FileReader();

            reader.onload = function (e) {
                const pdfUrl = e.target.result;

                // Enregistrez l'URL du PDF dans le stockage local
                localStorage.setItem("savedPdf8", pdfUrl);

                // Affichez le PDF sur la page
                displayPdf(pdfUrl);
            };

            reader.readAsDataURL(file);
        } else {
            alert("Veuillez sélectionner un fichier PDF valide.");
        }
    }
 
    function deletePdf() {
        // Supprimez le PDF enregistré du stockage local
        localStorage.removeItem("savedPdf8");
    
        // Réaffichez le bouton Soumettre PDF
        window.location.href = "submit.html"
    
        // Supprimez le PDF de la page
        pdfContainer.innerHTML = "";
    }
    
    

    // Ajoutez un gestionnaire d'événements pour le bouton Soumettre PDF
    document.getElementById("submitPdfBtn").addEventListener("click", submitPdf);
});
function startLiveVideo() {
    // TODO: Implémenter la logique pour démarrer la vidéo en direct.
}

function toggleFullScreen(sectionId) {
    var section = document.querySelector('.' + sectionId);
    var video = section.querySelector('video');

    if (!document.fullscreenElement) {
        if (section.requestFullscreen) {
            section.requestFullscreen().catch(err => {
                console.error(`Erreur lors du passage en mode plein écran pour la section : ${err.message}`);
            });
        }
        if (video.requestFullscreen) {
            video.requestFullscreen().catch(err => {
                console.error(`Erreur lors du passage en mode plein écran pour la vidéo : ${err.message}`);
            });
        }
    } else {
        document.exitFullscreen();
    }
}

function changeExperience() {
    // Obtenez la valeur sélectionnée
    var selectedValue = document.getElementById("experiences").value;

    // Effectuez la redirection en fonction de la valeur sélectionnée
    if (selectedValue === "exp1") {
        window.location.href = "indexx.html";
    } else if (selectedValue === "exp2") {
        window.location.href = "index2.html";
    }
}
function changeExperience2() {
    var selectedValue = document.getElementById("experiences2").value;

    if (selectedValue === "exp1") {
        window.location.href = "indexx.html";
    } else if (selectedValue === "exp2") {
        window.location.href = "index2.html";
    }
}


// Assurez-vous que le script est exécuté après le chargement du document
document.addEventListener("DOMContentLoaded", function() {
    // Vous pouvez ajouter d'autres initialisations ici si nécessaire
});

function openImageModal(imageSrc) {
    var modalImage = document.getElementById('modal-image');
    modalImage.src = imageSrc;

    var overlay = document.getElementById('image-overlay');
    overlay.style.display = 'flex';
}

function closeImageModal() {
    var overlay = document.getElementById('image-overlay');
    overlay.style.display = 'none';
}
// Ajoutez ce script pour gérer l'affichage/masquage de la zone de code

// Modifier la taille initiale de CodeMirror dans votre script.js
// Utiliser CodeMirror pour la nouvelle zone de texte
function toggleCodeSection() {
    var codeSection = document.getElementById("codeSection");

    // Toggle la visibilité de la zone de code
    codeSection.style.display = (codeSection.style.display === "none" || codeSection.style.display === "") ? "block" : "none";

    // Rafraîchir l'éditeur CodeMirror lorsqu'il devient visible
    if (codeSection.style.display === "block") {
        pythonEditor.refresh();
    }
}
var pythonEditor = CodeMirror.fromTextArea(document.getElementById("pythonEditor"), {
    mode: "text/x-python",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
});

var widthPython = window.innerWidth;
var outputPython = document.getElementById("outputPython");
var runPython = document.getElementById("runPython");

pythonEditor.setSize(0.7 * widthPython, "150");

runPython.addEventListener("click", async function () {
    try {
        var codePython = {
            code: pythonEditor.getValue(),
            lang: "Python"
        };

        console.log(codePython);

        var oDataPython = await fetch("http://localhost:8000/compile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(codePython)
        });

        var dPython = await oDataPython.json();
        
        // Afficher la sortie ou l'erreur dans la zone de sortie
        if (dPython.output) {
            outputPython.value = dPython.output;
        } else if (dPython.error) {
            outputPython.value = "Erreur : " + dPython.error;
        }
    } catch (error) {
        console.error("Erreur lors de l'exécution du code :", error);
        outputPython.value = "Erreur inattendue lors de l'exécution.";
    }
});
// Ajoutez cette fonction à votre fichier script.js

// Modifiez cette fonction dans votre fichier script.js

function toggleOutputScroll() {
    var outputTextarea = document.getElementById("outputPython");
    var button = document.querySelector(".scroll-btn");

    // Alterne la visibilité de la zone d'output
    if (outputTextarea.style.display === "none" || outputTextarea.style.display === "") {
        outputTextarea.style.display = "block";
        button.textContent = "▼"; // Change la flèche vers le bas
    } else {
        outputTextarea.style.display = "none";
        button.textContent = "▲"; // Change la flèche vers le haut
    }
}
window.watsonAssistantChatOptions = {
    integrationID: "d9ab082d-21f9-4d83-bdd0-26d45c408f7c", // The ID of this integration.
    region: "eu-de", // The region your integration is hosted in.
    serviceInstanceID: "c8ac51bc-6630-4efb-ab1a-88f60f4b2d60", // The ID of your service instance.
    onLoad: async (instance) => { await instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });
function logout() {
    window.location.href = "index.html";
}

















