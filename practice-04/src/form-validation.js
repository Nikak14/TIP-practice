import { findTaskById } from "./task-service.js";

const ALLOWED_PRIORITIES = new Set(["low", "medium", "high"]);

// Чистая проверка данных формы. DOM и показ сообщений выполняются в main.js.
// draft: { id, title, priority }; editingId: null либо id редактируемой задачи.
export function validateTaskDraft(draft, tasks, editingId = null) {
  const errors = {};
  let id;
  if (editingId === null) {
    id = typeof draft.id === "string" && draft.id.trim() === "" ? NaN : Number(draft.id);
    if (!Number.isSafeInteger(id) || id <= 0) errors.id = "Введите положительный целый id.";
    else if (findTaskById(tasks, id)) errors.id = `Задача с id ${id} уже существует.`;
  } else {
    id = editingId;
    if (!Number.isSafeInteger(id) || id <= 0 || !findTaskById(tasks, id)) {
      errors.id = "Редактируемая задача не найдена.";
    }
  }
  if (typeof draft.title !== "string" || draft.title.trim().length < 1 || draft.title.trim().length > 100) {
    errors.title = "Название должно содержать от 1 до 100 символов.";
  }
  if (!ALLOWED_PRIORITIES.has(draft.priority)) errors.priority = "Выберите допустимый приоритет.";
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, value: { id, title: draft.title.trim(), priority: draft.priority } };
}
