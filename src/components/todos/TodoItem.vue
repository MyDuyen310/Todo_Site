<template>
  <div
    class="todo-card"
    :class="addActiveClass"
    :style="{ borderColor: colors[index % 5].primaryColor }"
  >
    <div
      class="date"
      :style="{ backgroundColor: colors[index % 5].secondaryColor }"
    >
      {{ createdAt }}
    </div>
    <div>
      <label for="{{id}}" class="title">{{ content }} </label>
      <div class="btn-container">
        <input
          class="toggle"
          type="checkbox"
          name="completed"
          :checked="check"
          @change="markComplete"
        />
        <router-link :to="todoEditLink">
          <button
            class="btn edit-btn"
            :style="{ color: colors[index % 5].primaryColor }"
          >
            <i className="far fa-edit"></i></button
        ></router-link>
        <button
          class="btn delete-btn"
          :style="{ color: colors[index % 5].primaryColor }"
          @click="deleteTodo"
        >
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["index", "id", "content", "status", "createdAt"],
  data() {
    return {
      colors: [
        {
          primaryColor: "#5D93E1",
          secondaryColor: "#ECF3FC",
        },
        {
          primaryColor: "#F9D288",
          secondaryColor: "#FEFAF1",
        },
        {
          primaryColor: "#5DC250",
          secondaryColor: "#F2FAF1",
        },
        {
          primaryColor: "#F48687",
          secondaryColor: "#FDF1F1",
        },
        {
          primaryColor: "#B964F7",
          secondaryColor: "#F3F0FD",
        },
      ],
    };
  },
  computed: {
    check() {
      if (this.$props.status === "completed") {
        return true;
      } else {
        return false;
      }
    },
    addActiveClass() {
      return {
        active: this.check,
      };
    },
    todoEditLink() {
      return this.$route.path + "/" + this.id;
    },
  },
  methods: {
    markComplete() {
      let newStatus = "";
      if (this.$props.status === "completed") {
        newStatus = "active";
      } else {
        newStatus = "completed";
      }
      const param = {
        id: this.id,
        status: newStatus,
        content: this.content,
      };
      try {
        this.$store.dispatch("todos/updateTodo", param);
      } catch (err) {
        this.error = "Fail to add! Try again later.";
      }
    },
    deleteTodo() {
      try {
        this.$store.dispatch("todos/removeTodo", this.id);
        // this.$router.replace("/todos");
      } catch (err) {
        this.error = "Fail to add! Try again later.";
      }
    },
  },
};
</script>
<style scoped>
.todo-card {
  width: calc(25% - 40px);
  padding: 20px;
  height: 200px;
  margin: 20px;
  background-color: var(--clr-white);
  border-radius: 5px;
  border-top: 3px solid;
  position: relative;
  box-shadow: var(--dark-shadow);
  transition: 0.3s ease;
}

.todo-card:hover {
  transform: scale(1.1);
}

.todo-card .date {
  padding: 5px 10px;
  display: inline-block;
  border-radius: 5px;
  margin-bottom: 10px;
}

.todo-card label {
  margin-top: 20px;
}
.btn-container {
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-left: 20px;
  position: absolute;
  bottom: 10%;
  right: 10%;
}

.btn-container i {
  font-size: 15px;
}

.edit-btn,
.save-btn {
  margin-right: 10px;
}
.btn {
  border: none;
  outline: none;
  background: transparent;
}
.toggle {
  margin-right: 10px;
}
.todo-card.active {
  opacity: 0.5;
  text-decoration: line-through;
}
@media (min-width: 768px) and (max-width: 1023px) {
  .todo-card {
    width: calc(50% - 40px);
  }
}

@media (max-width: 767px) {
  .todo-card {
    width: 100%;
  }
}
</style>