function toggleMenu() {
    const dropdown = document.getElementById("menuDropdown");
    dropdown.classList.toggle("mostrar-menu");
}

// Fechar o menu se o usuário clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('.menu-hamburguer') && !event.target.matches('.traco')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('mostrar-menu')) {
                    openDropdown.classList.remove('mostrar-menu');
            }
        }
    }
}

let musica_muskito = new Audio("/jogo/audio/musica.muskito.mp3");
function musicaMuskito(){
    musica_muskito.play();
}