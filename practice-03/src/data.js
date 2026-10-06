// Общий контрольный набор. Для своего варианта ниже предусмотрен отдельный массив.
// Идентификатор задачи не совпадает с её индексом в массиве.
export const demoTasks = [
  { id: 1, title: "Изучить функции", completed: true, priority: "medium" },
  { id: 4, title: "Подготовить модель задач", completed: false, priority: "high" },
  { id: 7, title: "Проверить методы массивов", completed: false, priority: "low" },
  { id: 10, title: "Оформить README", completed: true, priority: "medium" },
];

// N = 32 в журнале: ((32 - 1) % 8) + 1 = 8.
export const variantNumber = 8;
export const variantTasks = [
  { id: 11, title: "Составить план технической документации", completed: true, priority: "low" },
  { id: 23, title: "Подготовить структуру руководства", completed: true, priority: "medium" },
  { id: 37, title: "Описать установку приложения", completed: true, priority: "high" },
  { id: 41, title: "Проверить примеры команд", completed: false, priority: "medium" },
  { id: 58, title: "Исправить замечания редактора", completed: false, priority: "low" },
  { id: 64, title: "Оформить итоговую версию", completed: false, priority: "high" },
];
