import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  findTaskById, getPendingTasks, getTaskTitles, getTaskStats,
  addTask, setTaskCompleted, renameTask, removeTask,
} from "./task-service.js";

function showState(label, tasks) {
  const { total, completed, pending, progress } = getTaskStats(tasks);
  console.log(`\n${label}`);
  console.log("ID:", tasks.map((task) => task.id));
  console.log("Названия:", getTaskTitles(tasks));
  console.log("Невыполненные ID:", getPendingTasks(tasks).map((task) => task.id));
  console.log(`Всего: ${total}; выполнено: ${completed}; осталось: ${pending}`);
  console.log(total === 0 ? "Задач пока нет" : `Прогресс: ${progress.toFixed(1)}%`);
}

function applyStep(tasks, label, operation) {
  const result = operation(tasks);
  if (!result.ok) {
    console.log(`\n${label}: Ошибка: ${result.error}`);
    return tasks;
  }
  showState(label, result.tasks);
  return result.tasks;
}

console.log("ПР2. Общий контрольный набор");
showState("Исходное состояние", demoTasks);
console.log("Задача id 4:", findTaskById(demoTasks, 4));
let currentTasks = demoTasks;
currentTasks = applyStep(currentTasks, "Добавление id 20", (tasks) => addTask(tasks, 20, "Добавить проверку", "high"));
currentTasks = applyStep(currentTasks, "Выполнение id 4", (tasks) => setTaskCompleted(tasks, 4, true));
currentTasks = applyStep(currentTasks, "Переименование id 10", (tasks) => renameTask(tasks, 10, "Подготовить инструкцию запуска"));
currentTasks = applyStep(currentTasks, "Удаление id 7", (tasks) => removeTask(tasks, 7));
currentTasks = applyStep(currentTasks, "Повторный id 20", (tasks) => addTask(tasks, 20, "Дубликат"));
console.log("Исходный demoTasks сохранился:", getTaskTitles(demoTasks), getTaskStats(demoTasks));

console.log(`\nПР2. Индивидуальный вариант ${variantNumber}`);
showState("Исходное состояние варианта", variantTasks);
let variantCurrent = variantTasks;
variantCurrent = applyStep(variantCurrent, "Добавление id 80", (tasks) => addTask(tasks, 80, "Подготовить защиту документации", "low"));
variantCurrent = applyStep(variantCurrent, "Выполнение id 11", (tasks) => setTaskCompleted(tasks, 11, true));
variantCurrent = applyStep(variantCurrent, "Переименование id 23", (tasks) => renameTask(tasks, 23, "Подготовить руководство пользователя"));
variantCurrent = applyStep(variantCurrent, "Удаление id 37", (tasks) => removeTask(tasks, 37));
variantCurrent = applyStep(variantCurrent, "Повторный id 80", (tasks) => addTask(tasks, 80, "Дубликат"));
console.log("Исходный variantTasks сохранился:", getTaskTitles(variantTasks), getTaskStats(variantTasks));
