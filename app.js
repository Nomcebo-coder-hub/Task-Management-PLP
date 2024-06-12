firebase.initializeApp({
  apiKey: "AIzaSyD7xkhaAKCNq2gz_0_aO-plPHa3Yv7SXgQ",
  authDomain: "plp-firebase-project.firebaseapp.com",
  projectId: "plp-firebase-project",
  storageBucket: "plp-firebase-project.appspot.com",
  messagingSenderId: "706358347205",
  appId: "1:706358347205:web:ef815464ce707e96a277ac",
});

const db = firebase.firestore();

function addTask() {
  const taskInput = document.getElementById("task-input");
  const task = taskInput.value.trim();
  if (task !== "") {
    db.collection("tasks").add({
      task: task,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    taskInput.value = "";
  }
}

function renderTasks(doc) {
  const taskList = document.getElementById("task-list");
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
  taskList.appendChild(taskItem);
}

db.collection("tasks")
  .orderBy("timestamp", "desc")
  .onSnapshot((snapshot) => {
    const changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type === "added") {
        renderTasks(change.doc);
      }
    });
  });

function deleteTask(id) {
  db.collection("tasks").doc(id).delete();
}
