"use strict";

// Вариант 8: N = 32, ((N - 1) % 8) + 1 = 8.
const totalTasks = 14;
const completedTasks = 4;

let error = "";
if (typeof totalTasks !== "number" || typeof completedTasks !== "number") {
  error = "Ошибка: количество задач должно быть числом.";
} else if (!Number.isInteger(totalTasks) || !Number.isInteger(completedTasks)) {
  error = "Ошибка: количество задач должно быть целым конечным числом.";
} else if (totalTasks < 0 || completedTasks < 0) {
  error = "Ошибка: количество задач не может быть отрицательным.";
} else if (totalTasks > 1000) {
  error = "Ошибка: превышена верхняя граница 1000 задач.";
} else if (completedTasks > totalTasks) {
  error = "Ошибка: выполнено больше задач, чем существует.";
}

if (error) {
  console.log(error);
} else if (totalTasks === 0) {
  console.log("Задач пока нет");
} else {
  const remainingTasks = totalTasks - completedTasks;
  const progress = completedTasks / totalTasks * 100;
  let status = "В работе";
  if (completedTasks === 0) status = "Не начато";
  if (completedTasks === totalTasks) status = "Завершено";
  console.log(`Всего задач: ${totalTasks}`);
  console.log(`Выполнено: ${completedTasks}`);
  console.log(`Осталось: ${remainingTasks}`);
  console.log(`Прогресс: ${progress.toFixed(1)}%`);
  console.log(`Статус: ${status}`);
}
