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
