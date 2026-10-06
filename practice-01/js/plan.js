"use strict";

// Вариант 8. Для проверки общего примера можно временно задать 12, 5, 3.
const totalTasks = 14;
const completedTasks = 4;
const dailyLimit = 4;

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
} else if (typeof dailyLimit !== "number" || !Number.isInteger(dailyLimit) || dailyLimit < 1 || dailyLimit > 1000) {
  error = "Ошибка: дневная норма должна быть целым числом от 1 до 1000.";
}

if (error) {
  console.log(error);
} else {
  let remainingTasks = totalTasks - completedTasks;
  let day = 0;
  console.log(`Осталось задач: ${remainingTasks}`);
  if (remainingTasks === 0) console.log("Все задачи уже выполнены.");
  while (remainingTasks > 0) {
    day += 1;
    const today = Math.min(remainingTasks, dailyLimit);
    remainingTasks -= today;
    console.log(`День ${day}: выполнено ${today}, осталось ${remainingTasks}`);
  }
  console.log(`Потребуется дней: ${day}`);
}
