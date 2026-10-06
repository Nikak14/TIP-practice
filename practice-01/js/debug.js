"use strict";

const plannedText = "8";
const completedText = "3";
const additionalText = "2";

// До исправления: "3" + "2" = "32", 8 - "32" = -24.
// Отладка: остановитесь на следующей строке и проверьте типы исходных строк.
const completedTotal = Number(completedText) + Number(additionalText);
const remainingTasks = Number(plannedText) - completedTotal;

console.log("Выполнено:", completedTotal);
console.log("Осталось:", remainingTasks);

let controlSum = 0;
// До исправления было taskNumber < 4, поэтому сумма равнялась 6.
for (let taskNumber = 1; taskNumber <= 4; taskNumber += 1) {
  controlSum += taskNumber;
}
console.log("Контрольная сумма:", controlSum);
