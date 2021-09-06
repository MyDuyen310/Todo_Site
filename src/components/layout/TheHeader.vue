<template>
  <header>
    <div class="logo">
      <router-link to="/">Todo<span>Site</span></router-link>
    </div>
    <nav>
      <ul>
        <li v-if="!isLoggedIn">
          <router-link to="/auth"
            ><i class="fas fa-sign-in-alt"></i> Login</router-link
          >
        </li>
        <li v-else>
          <button @click="handleLogout" class="btnlogout">
            <i class="fas fa-sign-out-alt"></i> Logout
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      isAuthenticated: (state) => state.auth.token,
    }),
    isLoggedIn() {
      return !!this.isAuthenticated;
    },
  },
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
    handleLogout() {
      this.logout();
      this.$router.replace("/auth");
    },
  },
};
</script>
<style scoped>
header {
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  color: #ae00ff;
  font-family: "Roboto", "sans-serif";
  font-weight: 700;
  align-items: center;
  font-size: 20px;
}

a {
  text-decoration: none;
  color: #ae00ff;
}

ul {
  list-style: none;
}

header ul li {
  display: inline-block;
  margin-left: 20px;
  padding: 5px 10px;
}

.logo {
  font-size: 25px;
  letter-spacing: 3px;
}

.logo span {
  font-weight: 400;
}

.btnlogout {
  background: transparent;
  padding: 5px 15px;
  font-size: 20px;
  color: #ae00ff;
  /* border: 2px solid #AE00FF; */
  border: none;
  border-radius: 5px;
  font-weight: 700;
}

.btnlogout:hover {
  color: #fff;
  background: #ae00ff;
}
</style>