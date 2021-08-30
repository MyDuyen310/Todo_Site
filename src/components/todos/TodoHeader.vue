<template>
  <div class="grocery-header">
    <div class="grocery-form-inner text-center">
      <div class="grocery-form-header">
        <h3>todo list</h3>
      </div>
      <router-link to="/addtodo"
        ><button class="btnadd">Add Todo</button></router-link
      >
    </div>
  </div>
</template>
<style scoped>
.text-center {
  text-align: center;
}
h3 {
  letter-spacing: 3px;
  text-transform: capitalize;
  font-family: var(--ff-secondary);
  font-size: 28px;
  font-weight: 700;
  color: var(--clr-blue);
  flex: 1;
}

.grocery-header {
  background-color: #e9eef6;
  height: 200px;
  padding-top: 50px;
}
.btnadd {
  text-transform: capitalize;
  padding: 7px 15px;
  background: var(--clr-blue-2);
  border-radius: 5px;
  letter-spacing: 2px;
  font-size: 14px;
  border: none;
  outline: none;
  margin-top: 15px;
}
.btnadd:hover {
  background: var(--clr-blue-3);
  color: var(--clr-white);
}

/* .search {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
}

.search input[type="text"] {
  border: none;
  border-bottom: 1px solid;
  outline: none;
  width: 0px;
  color: var(--clr-pink-2);
  font-family: var(--ff-primary);
  transition: 0.8s ease;
}

.search:hover input,
.search input:focus {
  width: 150px;
}

.search .btn-search {
  background: transparent;
  outline: none;
  border: none;
  color: var(--clr-pink-2);
  margin: auto;
} */
</style>