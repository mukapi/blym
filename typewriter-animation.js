// Attendre que toute la page soit chargée avant de lancer le script
document.addEventListener("DOMContentLoaded", function () {
  function setupTypewriterAnimation() {
    // 1. Chercher l'input qui a l'attribut "data-typewriter" dans le HTML
    const input = document.querySelector("[data-typewriter]");

    // Si on ne trouve pas l'input, on arrête le script (pas d'erreur)
    if (!input) {
      return;
    }

    // 2. Configuration de l'animation
    const text = "Type a keyword to get your optimized article"; // Le texte à afficher
    const cursor = "|"; // Le curseur qui clignote

    // 3. Variables pour suivre l'état de l'animation
    let currentCharIndex = 0; // Quelle lettre on affiche (0 = début)
    let isAnimating = false; // Est-ce que l'animation est en cours ?

    // 4. Variables pour les timers (on doit les stocker pour pouvoir les arrêter)
    let blinkInterval; // Timer pour faire clignoter le curseur
    let typeWriterTimeout; // Timer pour afficher les lettres une par une
    let restartTimeout; // Timer pour redémarrer l'animation après un blur

    // 5. Fonction qui affiche les lettres une par une (effet machine à écrire)
    function typeWriter() {
      // Si l'animation est arrêtée, on ne continue pas
      if (!isAnimating) {
        return;
      }

      // Si on n'a pas encore affiché toutes les lettres
      if (currentCharIndex < text.length) {
        // Prendre les lettres du début jusqu'à currentCharIndex
        // Exemple: si currentCharIndex = 3, on prend "Typ"
        const displayText = text.substring(0, currentCharIndex + 1);

        // Afficher ce texte + le curseur dans le placeholder de l'input
        input.setAttribute("placeholder", displayText + cursor);

        // Passer à la lettre suivante
        currentCharIndex++;

        // Attendre 100ms puis afficher la prochaine lettre (rappeler cette fonction)
        typeWriterTimeout = setTimeout(typeWriter, 100);
      } else {
        // On a fini d'écrire toutes les lettres, on commence à faire clignoter le curseur
        startBlinking();
      }
    }

    // 6. Fonction qui fait clignoter le curseur après que tout le texte soit affiché
    function startBlinking() {
      let showCursor = true; // Variable pour alterner: curseur visible ou invisible

      // Toutes les 500ms (0.5 seconde), on change l'état du curseur
      blinkInterval = setInterval(() => {
        // Si l'animation est arrêtée, on arrête le clignotement
        if (!isAnimating) {
          clearInterval(blinkInterval);
          return;
        }

        // Si showCursor = true, on affiche le curseur, sinon on ne l'affiche pas
        const displayText = text + (showCursor ? cursor : "");

        // Mettre à jour le placeholder
        input.setAttribute("placeholder", displayText);

        // Inverser l'état: true devient false, false devient true
        showCursor = !showCursor;
      }, 500);
    }

    // 7. Fonction qui arrête complètement l'animation (appelée quand l'utilisateur clique sur l'input)
    function stopAnimation() {
      // Marquer que l'animation n'est plus active
      isAnimating = false;

      // Arrêter le timer qui affiche les lettres une par une
      if (typeWriterTimeout) {
        clearTimeout(typeWriterTimeout); // Annuler le timer
        typeWriterTimeout = null; // Réinitialiser la variable
      }

      // Arrêter le timer qui fait clignoter le curseur
      if (blinkInterval) {
        clearInterval(blinkInterval); // Annuler le timer
        blinkInterval = null; // Réinitialiser la variable
      }

      // Arrêter le timer qui redémarre l'animation après blur
      if (restartTimeout) {
        clearTimeout(restartTimeout); // Annuler le timer
        restartTimeout = null; // Réinitialiser la variable
      }

      // Vider le placeholder (enlever tout le texte)
      input.setAttribute("placeholder", "");
    }

    // 8. Fonction qui démarre l'animation depuis le début
    function startAnimation() {
      // Si une animation est déjà en cours, on l'arrête d'abord
      // (évite d'avoir plusieurs animations en même temps)
      if (isAnimating) {
        stopAnimation();
      }

      // Marquer que l'animation est maintenant active
      isAnimating = true;

      // Recommencer depuis la première lettre
      currentCharIndex = 0;

      // Lancer l'animation
      typeWriter();
    }

    // 9. Démarrer l'animation dès que le script est chargé
    startAnimation();

    // 10. Écouter quand l'utilisateur clique dans l'input (focus)
    input.addEventListener("focus", function () {
      stopAnimation(); // Arrêter l'animation pour que l'utilisateur puisse taper
    });

    // 11. Écouter quand l'utilisateur sort de l'input (blur)
    input.addEventListener("blur", function () {
      // Si l'input est vide (l'utilisateur n'a rien tapé)
      if (this.value.trim() === "") {
        // Attendre 1 seconde (1000ms) puis redémarrer l'animation
        restartTimeout = setTimeout(startAnimation, 1000);
      }
      // Sinon, si l'utilisateur a tapé quelque chose, on ne redémarre pas l'animation
    });
  }

  // 12. Lancer la fonction principale
  setupTypewriterAnimation();
});
