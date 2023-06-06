let vm = Vue.createApp({
  data() {
    return {
      addTaskInputValue: "", 
      todos:
        localStorage.data !== undefined ? JSON.parse(localStorage.data) : [],
    };
  },
  methods: {
    checkData(task) {
      if (this.todos.length == 0) {
        return false;
      } else {
        let isDataExist = this.todos.some((obj) => obj.task === task);
        //If task exist already, return true
        if (isDataExist) {
          alert("Task has been added already!");
          return true;
        }
      }
      //    console.log(task)
    },
    addTask() {
      if (this.addTaskInputValue !== "") {
        if (!this.checkData(this.addTaskInputValue)) {
          let newTaskObj = {
            task: this.addTaskInputValue,
            checked: false,
          };
          this.todos.push(newTaskObj);
          this.updateData;
        }
        this.addTaskInputValue = "";
      } else {
        alert("You should add task!");
        return;
      }
    },
    editTask(event) {
      const targetElement = document.getElementById(event.target.className);
      targetElement.hasAttribute("readonly")
        ? targetElement.removeAttribute("readonly")
        : targetElement.setAttribute("readonly", "true");
      console.log(targetElement);
      this.updateData;
    },
    removeTask(event) {
      let targetObject = this.todos.find(
        (obj) => obj.task === event.target.className
      );
      console.log(targetObject);
      this.todos = this.todos.filter((obj) => obj !== targetObject);
      this.updateData;
    },
  },
  computed: {
    updateData() {
      return (localStorage.data = JSON.stringify(this.todos));
    },
  },
}).mount("#app");
