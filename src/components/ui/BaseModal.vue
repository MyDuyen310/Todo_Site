<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="modal-overlay">
      <transition name="dialog">
        <dialog open v-if="show">
          <header>
            <slot name="header">
              <h2>{{ title }}</h2>
            </slot>
          </header>
          <section>
            <slot></slot>
          </section>
          <menu v-if="!fixed">
            <slot name="actions">
              <button @click="tryClose" type="button">Close</button>
            </slot>
          </menu>
        </dialog>
      </transition>
    </div>
  </teleport>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(73, 166, 233, 0.5);
  display: grid;
  place-items: center;
  transition: var(--transition);
  z-index: 10;
}
dialog {
  z-index: 100;
  background: var(--clr-white);
  border-radius: 15px;
  width: 30%;
  text-align: center;
  display: grid;
  place-items: center;
  position: relative;
  min-height: 200px;
  box-shadow: var(--dark-shadow);
  padding: 15px;
  min-width: 280px;
  border: none;
}
header {
  width: 100%;
  padding: 10px;
}
header h2 {
  margin: 0;
  font-size: 30px;
  letter-spacing: 2px;
  color: var(--clr-blue);
}
section {
  padding: 15px;
}
menu {
  padding: 10px;
  display: flex;
  justify-items: flex-end;
  margin: 0;
}
button {
  background: #ae00ff;
  margin-top: 10px;
  border: 2px solid #ae00ff;
  font-family: var(--ff-secondary);
  font-weight: 700;
  letter-spacing: 3px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 25px;
  padding: 8px 15px;
  color: #fff;
}

button:hover {
  background: #fff;
  color: #ae00ff;
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.dialog-enter-active {
  transition: all 0.3s ease-out;
}
.dialog-leave-active {
  transition: all 0.3s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>