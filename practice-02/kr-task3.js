import { demoTasks } from "./src/data.js";

const validId = (id) => Number.isSafeInteger(id) && id > 0;
const failure = (error) => ({ ok: false, error });

function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

function setTaskCompleted(tasks, id, completed) {
  if (!validId(id)) {
    return failure("Некорректный id задачи.");
  }
  if (typeof completed !== "boolean") {
    return failure("Статус должен быть true или false.");
  }
  if (!findTaskById(tasks, id)) {
    return failure(`Задача с id ${id} не найдена.`);
  }

  return {
    ok: true,
    tasks: tasks.map((task) =>
      task.id === id ? { ...task, completed } : task
    )
  };
}

const before = JSON.stringify(demoTasks);

const result = setTaskCompleted(demoTasks, 4, true);
const originalTask = findTaskById(demoTasks, 4);
const updatedTask = findTaskById(result.tasks, 4);

console.log("Успех для id = 4:", result.ok);
console.log("Статус в исходном массиве:", originalTask.completed);
console.log("Статус в новом массиве:", updatedTask.completed);
console.log("Новый массив:", result.tasks !== demoTasks);
console.log("Новый объект:", updatedTask !== originalTask);

const rejected = setTaskCompleted(demoTasks, 777, true);
console.log("Результат для id = 777:", rejected);
console.log(
  "Исходные данные сохранены:",
  JSON.stringify(demoTasks) === before
);