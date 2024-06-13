firebase.initializeApp({
  apiKey: "AIzaSyCOFosZurPPTYqBsVHBvRBNlkSGNgpLKL8",
  authDomain: "task-app-plp.firebaseapp.com",
  projectId: "task-app-plp",
  storageBucket: "task-app-plp.appspot.com",
  messagingSenderId: "1026676832542",
  appId: "1:1026676832542:web:1cfa48a6f7c626c54af10f",
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
  taskItem.className = "tast-item";
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
