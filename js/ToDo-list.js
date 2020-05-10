// Setting Up Variables
let theInput = document.querySelector(".add-task input"),
  theAddButton = document.querySelector(".add-task .plus"),
  tasksContainer = document.querySelector(".tasks-content"),
  tasksCount = document.querySelector(".tasks-count span"),
  tasksCompleted = document.querySelector(".tasks-completed span"),
  deletAll = document.querySelector(".delete-all"),
  dnoeAll = document.querySelector(".done-all");

// Focus On Input Field
window.onload = function () {
  theInput.focus();
};

// Adding The Task
theAddButton.onclick = function () {
  // If Input is Empty
  if (theInput.value === "") {
    Swal.fire("There Is No Task To Add");
    theInput.focus();
  } else {
    let noTasksMsg = document.querySelector(".no-tasks-message");

    // Check If Span With No Tasks Message Is Exist
    if (document.body.contains(document.querySelector(".no-tasks-message"))) {
      // Remove No Tasks Message
      noTasksMsg.remove();
    }

    // Create Main Span Element
    let mainSpan = document.createElement("span");

    // Create Delete Button
    let deleteElement = document.createElement("span");

    // Create The Main Span Text
    let text = document.createTextNode(theInput.value);

    // Create The Delete Button Text
    let deleteText = document.createTextNode("Delete");

    // Add Text To Main Span
    mainSpan.appendChild(text);

    // Add Class To Main Span
    mainSpan.className = "task-box";

    // Add Text To Delete Button
    deleteElement.appendChild(deleteText);

    // Add Class To Delete Button
    deleteElement.className = "delete";

    // Add Delete Button To Main Span
    mainSpan.appendChild(deleteElement);

    // Add The Task To The Container
    tasksContainer.appendChild(mainSpan);

    // Empty The Input
    theInput.value = "";

    // Focus On Field
    theInput.focus();

    // Calculate Tasks
    calculateTasks();

    // deleteAll button
    document.addEventListener("click", function (e) {
      if (e.target.className == "delete-all") {
        mainSpan.remove();
        // Calculate Tasks
        calculateTasks();
        if (tasksContainer.childElementCount == 0) {
          createNoTasks();
        }
        deletAll.style.display = "none";
        theInput.focus();
        dnoeAll.style.display = "none";
      }
      // doneAll button
      if (e.target.className == "done-all") {
        // add Class 'finished'
        mainSpan.classList.add("finished");
        theInput.focus();
        calculateTasks();
      }
    });
  }

  if (tasksContainer.childElementCount == 2) {
    deletAll.style.display = "inline";
    dnoeAll.style.display = "inline";
  }
};

document.addEventListener("click", function (e) {
  // Delete Task
  if (e.target.className == "delete") {
    // Remove Current Task
    e.target.parentNode.remove();
    theInput.focus();

    // Check Number Of Tasks Inside The Container
    if (tasksContainer.childElementCount == 0) {
      createNoTasks();
    }

    if (tasksContainer.childElementCount == 1) {
      deletAll.style.display = "none";
      dnoeAll.style.display = "none";
    }
  }

  // Finish Task
  if (e.target.classList.contains("task-box")) {
    // Toggle Class 'finished'
    e.target.classList.toggle("finished");
  }

  // Calculate Tasks
  calculateTasks();
});

// Function To Create No Tasks Message
function createNoTasks() {
  // Create Message Span Element
  let msgSpan = document.createElement("span");

  // Create The Text Message
  let msgText = document.createTextNode("No Tasks To Show");

  // Add Text To Message Span Element
  msgSpan.appendChild(msgText);

  // Add Class To Message Span
  msgSpan.className = "no-tasks-message";

  // Append The Message Span Element To The Task Container
  tasksContainer.appendChild(msgSpan);
}

// Function To Calculate Tasks
function calculateTasks() {
  // Calculate All Tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  // Calculate Completed Tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}
