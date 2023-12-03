// Імпорт Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js';


// Конфігурація Firebase (отримайте це з вашого облікового запису Firebase)
const firebaseConfig = {

    apiKey: "AIzaSyA8v2IplyqJmGsL7EloQKwcbmDsZwWw5-s",
  
    authDomain: "to-do-list-app-1121a.firebaseapp.com",
  
    projectId: "to-do-list-app-1121a",
  
    storageBucket: "to-do-list-app-1121a.appspot.com",
  
    messagingSenderId: "637214921403",
  
    appId: "1:637214921403:web:2499756720098619b94f9e",

    databaseURL: 'https://to-do-list-app-1121a-default-rtdb.europe-west1.firebasedatabase.app'
  
  };
  

// Ініціалізація Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');

function updateTaskList(snapshot) {
  taskList.innerHTML = '';
  snapshot.forEach((childSnapshot) => {
    const task = childSnapshot.val();
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <button onclick="removeTask('${childSnapshot.key}')">Remove</button>
    `;
    taskList.appendChild(taskItem);
  });
}

onValue(ref(database, 'tasks'), updateTaskList);

addTaskBtn.addEventListener('click', () => {
  const newTaskText = taskInput.value.trim();
  if (newTaskText !== '') {
    push(ref(database, 'tasks'), { text: newTaskText });
    taskInput.value = '';
  }
});

window.removeTask = function (taskId) {
  remove(ref(database, `tasks/${taskId}`));
};