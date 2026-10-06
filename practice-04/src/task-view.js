import { getTaskStats } from "./task-service.js";

// Здесь создаётся DOM, но не изменяется состояние приложения.
// Контракт карточки, селекторы и тексты описаны в методичке.
export function createTaskElement(task) {
  const item = document.createElement("li");
  item.className = `task-card${task.completed ? " is-completed" : ""}`;
  item.dataset.taskId = String(task.id);

  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.title;

  const meta = document.createElement("div");
  meta.className = "task-meta";
  const status = document.createElement("span");
  status.className = "task-status";
  status.textContent = task.completed ? "Выполнена" : "В работе";
  const priority = document.createElement("span");
  priority.className = "task-priority";
  priority.textContent = { low: "Низкий", medium: "Средний", high: "Высокий" }[task.priority];
  meta.append(status, priority);

  const actions = document.createElement("div");
  actions.className = "task-actions";
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.dataset.action = "toggle";
  toggle.setAttribute("aria-pressed", String(task.completed));
  const toggleLabel = document.createElement("span");
  toggleLabel.className = "action-label";
  toggleLabel.textContent = "Выполнена";
  toggle.append(toggleLabel);
  const edit = document.createElement("button");
  edit.type = "button";
  edit.dataset.action = "edit";
  const editLabel = document.createElement("span");
  editLabel.className = "action-label";
  editLabel.textContent = "Изменить";
  edit.append(editLabel);
  const remove = document.createElement("button");
  remove.type = "button";
  remove.dataset.action = "delete";
  const removeLabel = document.createElement("span");
  removeLabel.className = "action-label";
  removeLabel.textContent = "Удалить";
  remove.append(removeLabel);
  actions.append(toggle, edit, remove);
  item.append(title, meta, actions);
  return item;
}

export function renderTaskList(listElement, tasks) {
  listElement.replaceChildren(...tasks.map(createTaskElement));
}

export function renderSummary(summaryElement, tasks, visibleCount) {
  const stats = getTaskStats(tasks);
  const values = { ...stats, progress: `${stats.progress.toFixed(1)}%`, visible: visibleCount };
  for (const [key, value] of Object.entries(values)) {
    summaryElement.querySelector(`[data-stat="${key}"]`).textContent = String(value);
  }
}

export function renderEmptyState(messageElement, total, visibleCount) {
  messageElement.hidden = visibleCount > 0;
  messageElement.textContent = visibleCount > 0 ? "" : total === 0
    ? "Список задач пуст."
    : "Нет задач по выбранному фильтру.";
}
