// Tasks
let tasks = [];

// manejo de formulario
const addInput = document.getElementById("add-input");
const todoList = document.getElementById("todo-list");

// acciones a realizar
const addTask = async () => {
  try {
    const data = {
      title: addInput.value,
      completed: false,
    };

    const res = await fetch(
      "https://axha.pockethost.io/api/collections/tasks/records",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const result = await res.json();
    console.log("Tarea creada:", result);

    render();
    return result;
  } catch (err) {
    console.error("Error al crear tarea:", err.message);
  }
};

const completedTask = async (id, value) => {
  try {
    const data = {
      completed: value,
    };
    const res = await fetch(
      `https://axha.pockethost.io/api/collections/tasks/records/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const result = await res.json();
    console.log(`Tarea ${id} actualizada:`, result);
    return result;
  } catch (err) {
    console.error("Error al actualizar tarea:", err.message);
  }
};

const deleteTask = async (id) => {
  try {
    const res = await fetch(
      `https://axha.pockethost.io/api/collections/tasks/records/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    render();
  } catch (err) {
    console.error("Error al eliminar tarea:", err.message);
  }
};

const getTasks = async () => {
  try {
    const res = await fetch(
      "https://axha.pockethost.io/api/collections/tasks/records"
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    console.error("Error:", e);
    alert("Error al obtener las tareas");
    return [];
  }
};

// Listar tareas

const render = () => {
  todoList.innerHTML = "";

  getTasks().then((res) => {
    const items = res.items;

    items.forEach((x) => {
      todoList.innerHTML += `
        <li class="todo-item">
          <label class="check">
            <input type="checkbox" ${x.completed ? "checked" : ""} />
            <span class="box" aria-hidden="true"></span>
            <span class="text">${x.title}</span>
          </label>
          <button class="delete" onclick="deleteTask('${
            x.id
          }')" type="button" aria-label="Delete task">
            ×
          </button>
        </li>
    `;
    });
  });
};

render();
