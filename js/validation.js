const MIN_CHARS = 2;
const MAX_CHARS = 30;
const allowedRegex = /^[A-Za-zА-Яа-яЁё0-9\s!$&*\-=\^`|~#%'+\/?_{}]+$/;

export function validateInput(input) {
  const trimmed = input.trim();
  if (trimmed.length < MIN_CHARS) {
    return { valid: false, message: `Минимальное количество символов: ${MIN_CHARS}` };
  }
  if (trimmed.length > MAX_CHARS) {
    return { valid: false, message: `Максимальное количество символов: ${MAX_CHARS}` };
  }
  if (!allowedRegex.test(trimmed)) {
    return { valid: false, message: "Введены недопустимые символы. Разрешены спецсимволы: ! $ & * - = ^ ` | ~ # % ' + / ? _ { }" };
  }
  return { valid: true };
}
