// Чистые операции над моделью задачи. Входные массивы и объекты не меняются.
const priorities = new Set(["low", "medium", "high"]);
const validId = (id) => Number.isSafeInteger(id) && id > 0;
const validTitle = (title) => typeof title === "string" && title.trim().length >= 1 && title.trim().length <= 100;
const failure = (error) => ({ ok: false, error });

export function createTask(id, title, priority = "medium") {
  if (!validId(id)) return failure("id должен быть положительным безопасным целым числом.");
  if (!validTitle(title)) return failure("Название должно содержать от 1 до 100 символов.");
  if (!priorities.has(priority)) return failure("Приоритет должен быть low, medium или high.");
  return { ok: true, task: { id, title: title.trim(), completed: false, priority } };
}

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed === true).length;
  return { total, completed, pending: total - completed, progress: total === 0 ? 0 : completed / total * 100 };
}

export function addTask(tasks, id, title, priority = "medium") {
  const created = createTask(id, title, priority);
  if (!created.ok) return created;
  if (findTaskById(tasks, id)) return failure(`Задача с id ${id} уже существует.`);
  return { ok: true, tasks: [...tasks, created.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!validId(id)) return failure("Некорректный id задачи.");
  if (typeof completed !== "boolean") return failure("Статус должен быть true или false.");
  if (!findTaskById(tasks, id)) return failure(`Задача с id ${id} не найдена.`);
  return { ok: true, tasks: tasks.map((task) => task.id === id ? { ...task, completed } : task) };
}

export function renameTask(tasks, id, title) {
  if (!validId(id)) return failure("Некорректный id задачи.");
  if (!validTitle(title)) return failure("Название должно содержать от 1 до 100 символов.");
  if (!findTaskById(tasks, id)) return failure(`Задача с id ${id} не найдена.`);
  return { ok: true, tasks: tasks.map((task) => task.id === id ? { ...task, title: title.trim() } : task) };
}

export function removeTask(tasks, id) {
  if (!validId(id)) return failure("Некорректный id задачи.");
  if (!findTaskById(tasks, id)) return failure(`Задача с id ${id} не найдена.`);
  return { ok: true, tasks: tasks.filter((task) => task.id !== id) };
}

export function updateTask(tasks, id, title, priority) {
  if (!validId(id)) return failure("Некорректный id задачи.");
  if (!findTaskById(tasks, id)) return failure(`Задача с id ${id} не найдена.`);
  if (!validTitle(title)) return failure("Название должно содержать от 1 до 100 символов.");
  if (!priorities.has(priority)) return failure("Приоритет должен быть low, medium или high.");
  return {
    ok: true,
    tasks: tasks.map((task) => task.id === id
      ? { ...task, title: title.trim(), priority }
      : task),
  };
}
