/* =====================================================
   AGENDA VIVA - FUNCIONES JAVASCRIPT
   ===================================================== */

"use strict";

/* 1. Obtener los elementos que se van a utilizar */
const eventRows = document.querySelectorAll(".event-row");
const filterButtons = document.querySelectorAll(".filter");
const searchInput = document.getElementById("event-search");
const emptyMessage = document.getElementById("empty-message");

const registrationForm = document.getElementById("registration-form");
const eventSelect = document.getElementById("event-choice");
const feedbackMessage = document.getElementById("form-feedback");

let currentCategory = "Todas";

/* 2. Buscar y filtrar las actividades */
function updateEventList() {
  const searchText = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  eventRows.forEach((row) => {
    const categoryMatches =
      currentCategory === "Todas" ||
      row.dataset.category === currentCategory;

    const textMatches =
      row.dataset.search.toLowerCase().includes(searchText);

    const shouldDisplay = categoryMatches && textMatches;

    row.hidden = !shouldDisplay;

    if (shouldDisplay) {
      visibleCount += 1;
    }
  });

  emptyMessage.hidden = visibleCount > 0;
}

/* 3. Escuchar los clics en los filtros */
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    currentCategory = button.dataset.category;
    updateEventList();
  });

  button.setAttribute(
    "aria-pressed",
    button.classList.contains("active") ? "true" : "false"
  );
});

/* 4. Actualizar la lista mientras se escribe */
searchInput.addEventListener("input", updateEventList);

/* 5. Seleccionar automáticamente el evento elegido */
document.querySelectorAll(".register-button").forEach((button) => {
  button.addEventListener("click", () => {
    eventSelect.value = button.dataset.event;

    document.getElementById("registro").scrollIntoView({
      behavior: "smooth"
    });

    eventSelect.focus({ preventScroll: true });
  });
});

/* 6. Validar el formulario y mostrar la confirmación */
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!registrationForm.checkValidity()) {
    feedbackMessage.textContent =
      "Revisa los campos obligatorios y corrige la información.";
    feedbackMessage.style.color = "#b42318";

    registrationForm.reportValidity();
    return;
  }

  const participantName =
    registrationForm.elements.nombre.value.trim();

  const selectedEvent = eventSelect.value;

  feedbackMessage.textContent =
    `¡Gracias, ${participantName}! Tu registro de demostración para "${selectedEvent}" fue validado.`;

  feedbackMessage.style.color = "#28734f";
  registrationForm.reset();
});

/*
  IMPORTANTE:
  Este proyecto es una demostración del lado del cliente.
  Para guardar los registros permanentemente se necesita
  conectar el formulario con un servidor y una base de datos.
*/
