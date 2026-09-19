const errorMessages = {
  name: {
    valueMissing: "Пожалуйста, укажите имя.",
  },
  email: {
    valueMissing: "Пожалуйста, укажите e-mail.",
    typeMismatch: "Введите корректный e-mail, например pupa@lupa.za.",
  },
  message: {
    valueMissing: "Пожалуйста, напишите сообщение.",
    tooShort: "Сообщение должно содержать не менее 20 символов.",
  },
};

function getErrorMessage(field) {
  const validity = field.validity;
  const messages = errorMessages[field.name] ?? {};

  if (validity.valueMissing) return messages.valueMissing ?? "";
  if (validity.typeMismatch) return messages.typeMismatch ?? "";
  if (validity.tooShort) return messages.tooShort ?? "";
  return "";
}

function validateField(field) {
  const errorElement = document.getElementById(`${field.id}-error`);
  const isValid = field.validity.valid;

  field.setAttribute("aria-invalid", String(!isValid));
  if (errorElement)
    errorElement.textContent = isValid ? "" : getErrorMessage(field);

  return isValid;
}

export function initReviewForm(formSelector) {
  const form = document.querySelector(formSelector);
  if (!form) return;

  const fields = Array.from(
    form.querySelectorAll("input[required], textarea[required]"),
  );
  const submitButton = form.querySelector('button[type="submit"]');
  const result = form.querySelector(".form-result");

  function updateSubmitState() {
    submitButton.disabled = !fields.every((field) => field.validity.valid);
  }

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      validateField(field);
      updateSubmitState();
    });
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const allValid = fields.map(validateField).every(Boolean);
    updateSubmitState();

    if (!allValid) {
      fields.find((field) => !field.validity.valid)?.focus();
      return;
    }

    result.textContent = "Спасибо! Ваш отзыв отправлен.";
    form.reset();
    fields.forEach((field) => {
      field.setAttribute("aria-invalid", "false");
      const errorElement = document.getElementById(`${field.id}-error`);
      if (errorElement) errorElement.textContent = "";
    });
    updateSubmitState();
  });

  updateSubmitState();
}
