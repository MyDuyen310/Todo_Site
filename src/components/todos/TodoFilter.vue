<template>
  <section>
    <div class="container-2">
      <div class="row">
        <p class="numtodo">
          <strong>{{ numTodosComplete }}</strong>
          <span> todos</span>
          <span> left </span>
        </p>
        <ul class="filter-container">
          <li>
            <button
              class="filter-btn"
              :class="{ selected: statusFilter === 'all' }"
              @click="setFilter('all')"
            >
              all
            </button>
          </li>
          <li>
            <button
              class="filter-btn"
              :class="{ selected: statusFilter === 'active' }"
              @click="setFilter('active')"
            >
              active
            </button>
          </li>
          <li>
            <button
              class="filter-btn"
              :class="{ selected: statusFilter === 'completed' }"
              @click="setFilter('completed')"
            >
              completed
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ["statusFilter"],
  emits: ["change-filter"],
  computed: {
    numTodosComplete() {
      return this.$store.getters["todos/doneTodos"].length;
      // const todos = this.$store.getters["todos/todos"];
      // console.log(todos);
      // const todosCompleted = todos.filter((todo) => todo.status === "active");
      // return todosCompleted.length;
      // return this.$store.state.todos.filter(todo => todo.done).length
    },
  },
  methods: {
    setFilter(status = "") {
      const updateFilter = status;
      this.$emit("change-filter", updateFilter);
    },
  },
};
</script>
<style scoped>
.row {
  display: flex;
  align-items: center;
  margin-top: 15px;
  flex-wrap: wrap;
}
.container-2 {
  width: 80%;
  margin: 0 auto;
}
input[type="checkbox"] {
  display: none;
}
.filter-container {
  flex: 1;
  text-align: center;
}

section {
  font-size: 20px;
  color: var(--clr-pink-1);
}

section ul li {
  display: inline-block;
}

.filter-btn {
  background-color: transparent;
  padding: 2px 5px;
  border: none;
  font-size: 15px;
  font-family: var(--ff-primary);
  text-transform: capitalize;
  margin: 0 5px;
  color: var(--clr-pink-1);
}

.filter-btn.selected {
  border: 1px solid var(--clr-pink-1);
  border-radius: 3px;
}
</style>
