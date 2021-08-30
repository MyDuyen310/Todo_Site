<template>
  <div>
    <section>
      <todo-header></todo-header>
    </section>
    <section>
      <todo-filter
        @change-filter="setFilter"
        :statusFilter="statusFilter"
      ></todo-filter>
    </section>
    <div className="container-2">
      <div className="grocery-container">
        <todo-item
          v-for="(todo, index) in filterByStatus"
          :index="index"
          :key="todo.id"
          :id="todo.id"
          :content="todo.content"
          :status="todo.status"
          :createdAt="todo.createdAt"
        ></todo-item>
      </div>
    </div>
  </div>
</template>
<script>
import TodoItem from "../../components/todos/TodoItem.vue";
import TodoFilter from "../../components/todos/TodoFilter.vue";
import TodoHeader from "../../components/todos/TodoHeader.vue";
export default {
  components: {
    TodoItem,
    TodoFilter,
    TodoHeader,
  },
  data() {
    return {
      error: null,
      statusFilter: "all",
    };
  },
  created() {
    this.loadTodos();
  },
  computed: {
    isTodo() {
      return this.$store.getters["todos/todos"];
    },
    filterByStatus() {
      switch (this.statusFilter) {
        case "active":
          return this.isTodo.filter((todo) => todo.status === "active");
        case "completed":
          return this.isTodo.filter((todo) => todo.status === "completed");
        default:
          return this.isTodo;
      }
    },
  },
  methods: {
    setFilter(updateFilter) {
      this.statusFilter = updateFilter;
    },
    async loadTodos(refresh = false) {
      try {
        await this.$store.dispatch("todos/fetchTodos", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
  },
};
</script>
<style scoped>
.container-2 {
  width: 80%;
  margin: 0 auto;
}
.grocery-container {
  display: flex;
  align-items: center;
  margin: 20px -20px;
  flex-wrap: wrap;
}
</style>