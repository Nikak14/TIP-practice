const demoTasks = [
  {
    id: 1, title: "Изучить функции",
    completed: true, priority: "medium"
  },
  {
    id: 4, title: "Подготовить модель задач",
    completed: false, priority: "high"
  },
  {
    id: 7, title: "Проверить методы массивов",
    completed: false, priority: "low"
  },
  {
    id: 10, title: "Оформить README",
    completed: true, priority: "medium"
  }
];

function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

const before = JSON.stringify(demoTasks);
const pending = getPendingTasks(demoTasks);
const empty = getPendingTasks([]);

console.log("Невыполненные ID:", pending.map((task) => task.id));
console.log("Пустой список:", empty);
console.log("Новый массив:", pending !== demoTasks);
console.log(
  "Исходные данные сохранены:",
  JSON.stringify(demoTasks) === before
);
