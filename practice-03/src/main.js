import { demoTasks, variantTasks, variantNumber } from "./data.js";
import { findTaskById, setTaskCompleted, removeTask } from "./task-service.js";
import { getVisibleTasks } from "./task-selectors.js";
import { renderTaskList, renderSummary, renderEmptyState } from "./task-view.js";

const elements = {
  list: document.querySelector("#task-list"),
  filters: document.querySelector("#task-filters"),
  summary: document.querySelector("#task-summary"),
  empty: document.querySelector("#empty-message"),
  message: document.querySelector("#operation-message"),
  datasetLabel: document.querySelector("#dataset-label"),
};

// Готовая служебная часть: ?dataset=variant включает данные своего варианта.
// Наборы не смешиваются, редактировать код для переключения не требуется.
const isVariant = new URLSearchParams(window.location.search).get("dataset") === "variant";
const initialTasks = isVariant ? variantTasks : demoTasks;
let currentTasks = initialTasks.map((task) => ({ ...task }));
let currentFilter = "all";

elements.datasetLabel.textContent = isVariant
  ? `Индивидуальный вариант: ${variantNumber ?? "не указан"}`
  : "Общий контрольный набор";

function renderApp() {
  const visibleTasks = getVisibleTasks(currentTasks, currentFilter);
  renderTaskList(elements.list, visibleTasks);
  renderSummary(elements.summary, currentTasks, visibleTasks.length);
  renderEmptyState(elements.empty, currentTasks.length, visibleTasks.length);
  for (const button of elements.filters.querySelectorAll("button[data-filter]")) {
    const active = button.dataset.filter === currentFilter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }
}

function handleTaskListClick(event) {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("button[data-action]");
  if (!button || !elements.list.contains(button)) return;
  const action = button.dataset.action;
  if (action !== "toggle" && action !== "delete") return;

  const rawId = button.closest("li[data-task-id]")?.dataset.taskId;
  const id = Number(rawId);
  if (!rawId || !Number.isSafeInteger(id) || id <= 0) {
    elements.message.textContent = "Некорректный id задачи в карточке.";
    return;
  }

  const task = findTaskById(currentTasks, id);
  const result = action === "toggle"
    ? task ? setTaskCompleted(currentTasks, id, !task.completed) : { ok: false, error: `Задача ${id} не найдена.` }
    : removeTask(currentTasks, id);
  if (!result.ok) {
    elements.message.textContent = result.error;
    return;
  }
  currentTasks = result.tasks;
  elements.message.textContent = "";
  renderApp();
  restoreTaskFocus(id, action);
}

function handleFilterClick(event) {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("button[data-filter]");
  if (!button || !elements.filters.contains(button)) return;
  if (!["all", "pending", "completed"].includes(button.dataset.filter)) return;
  currentFilter = button.dataset.filter;
  elements.message.textContent = "";
  renderApp();
}

// Готовая вспомогательная функция. Сохраняет понятную позицию клавиатурного фокуса
// после замены карточек. Если карточки больше нет, фокус получает активный фильтр.
function restoreTaskFocus(id, action) {
  const actionButton = elements.list.querySelector(
    `[data-task-id="${id}"] button[data-action="${action}"]`,
  );
  const filterButton = elements.filters.querySelector(`[data-filter="${currentFilter}"]`);
  (actionButton ?? filterButton)?.focus();
}

// Подписки выполняются один раз. Эти контейнеры не заменяются при перерисовке.
elements.list.addEventListener("click", handleTaskListClick);
elements.filters.addEventListener("click", handleFilterClick);

// Ошибки запуска выводятся в интерфейс и консоль для диагностики.
try {
  renderApp();
} catch (error) {
  elements.message.textContent = `Ошибка запуска: ${error.message}`;
  console.error(error);
}
