document.addEventListener("DOMContentLoaded", function () {
  function setupTypewriterAnimation() {
    const input = document.querySelector("[data-typewriter]");

    if (!input) {
      return;
    }

    const text = "Type a keyword to get your optimized article";

    const cursor = "|";

    let currentCharIndex = 0;

    let isAnimating = false;

    let blinkInterval;

    let typeWriterTimeout;

    let restartTimeout;

    function typeWriter() {
      // Vérifier si l'animation doit continuer

      if (!isAnimating) {
        return;
      }

      if (currentCharIndex < text.length) {
        const displayText = text.substring(0, currentCharIndex + 1);

        input.setAttribute("placeholder", displayText + cursor);

        currentCharIndex++;

        typeWriterTimeout = setTimeout(typeWriter, 100);
      } else {
        startBlinking();
      }
    }

    function startBlinking() {
      let showCursor = true;

      blinkInterval = setInterval(() => {
        // Vérifier si l'animation doit continuer

        if (!isAnimating) {
          clearInterval(blinkInterval);

          return;
        }

        const displayText = text + (showCursor ? cursor : "");

        input.setAttribute("placeholder", displayText);

        showCursor = !showCursor;
      }, 500);
    }

    function stopAnimation() {
      isAnimating = false;

      // Arrêter le timeout de typeWriter

      if (typeWriterTimeout) {
        clearTimeout(typeWriterTimeout);

        typeWriterTimeout = null;
      }

      // Arrêter l'interval de clignotement

      if (blinkInterval) {
        clearInterval(blinkInterval);

        blinkInterval = null;
      }

      // Arrêter le timeout de redémarrage

      if (restartTimeout) {
        clearTimeout(restartTimeout);

        restartTimeout = null;
      }

      input.setAttribute("placeholder", "");
    }

    function startAnimation() {
      // Arrêter toute animation en cours avant de redémarrer

      if (isAnimating) {
        stopAnimation();
      }

      isAnimating = true;

      currentCharIndex = 0;

      typeWriter();
    }

    startAnimation();

    input.addEventListener("focus", function () {
      stopAnimation();
    });

    input.addEventListener("blur", function () {
      if (this.value.trim() === "") {
        restartTimeout = setTimeout(startAnimation, 1000);
      }
    });
  }

  setupTypewriterAnimation();
});
