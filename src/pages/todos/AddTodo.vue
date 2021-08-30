<template>
  <div class="container">
    <div class="todo-form">
      <h1>Add Todo</h1>
      <p class="error" v-if="error">{{ error }}</p>
      <form @submit.prevent="submitForm">
        <div class="control" :class="{ invalid: !content.isValid }">
          <label for="username" class="label"> Content: </label>
          <textarea
            v-model="content.val"
            name="username"
            placeholder="Content....."
            autofocus
          ></textarea>
          <p class="error" v-if="!content.isValid">Please enter content!</p>
        </div>
        <div class="action">
          <button type="submit" class="btn btnsubmit">Add</button>
          <router-link to="/todos"
            ><button class="btn btncancel">Cancel</button></router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: {
        val: "",
        isValid: true,
      },
      isLoading: false,
      isFormValid: true,
      error: null,
    };
  },
  methods: {
    validationForm() {
      if (this.content.val === "") {
        this.content.isValid = false;
        this.isFormValid = false;
      }
    },
    submitForm() {
      this.validationForm();
      if (!this.isFormValid) {
        return;
      }
      console.log("gg");
      this.isLoading = true;
      try {
        this.$store.dispatch("todos/addTodo", this.content.val);
        this.$router.replace("/todos");
      } catch (err) {
        this.error = "Fail to add! Try again later.";
      }
      this.isLoading = false;
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 400px;
  min-width: 300px;
  margin: 50px auto;
}

.todo-form {
  background: #fff;
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 5px 8px rgb(0, 0, 0, 0.08);
}

.todo-form h1 {
  text-align: center;
  position: relative;
  font-size: 30px;
  margin-bottom: 40px;
  letter-spacing: 3px;
  text-transform: capitalize;
  font-family: var(--ff-secondary);
  font-weight: 700;
  color: var(--clr-blue);
}

.todo-form h1::after {
  position: absolute;
  content: "";
  height: 5px;
  bottom: -15px;
  margin: 0 auto;
  left: 0;
  right: 0;
  width: 40px;
  background: #7f00ff;
  transition: 0.25s;
}

.control label {
  display: block;
  padding: 10px 0;
  font-weight: 700;
  letter-spacing: 3px;
}

/* .control input {
  width: 100%;
  padding: 15px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  outline: none;
  margin-bottom: 10px;
  font-weight: 300;
} */
.control textarea {
  width: 100%;
  padding: 15px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  outline: none;
  margin-bottom: 10px;
  font-weight: 300;
}
.action {
  text-align: right;
}

button.btnsubmit {
  background: #ae00ff;
  color: #fff;
}
.btn {
  margin-top: 20px;
  border: 2px solid #ae00ff;
  font-family: var(--ff-secondary);
  font-weight: 700;
  letter-spacing: 3px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 25px;
  padding: 8px 15px;
}
button.btnsubmit:hover {
  background: #fff;
  color: #ae00ff;
}

.error {
  color: red;
  font-size: 14px;
  padding-left: 10px;
}

.control textarea:focus {
  border: 2px solid #ae00ff;
}

button.btncancel {
  background: transparent;
  color: #ae00ff;
  margin-left: 15px;
}
button.btncancel:hover {
  background: #ae00ff;
  color: var(--clr-white);
}
.invalid textarea {
  border: 2px solid red;
}
</style>