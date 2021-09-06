<template>
  <div>
    <base-modal :show="!!error" title="Ooops!" @close="handleError">
      <p class="error">{{ error }}</p>
    </base-modal>
    <div class="container">
      <div class="auth">
        <h1>{{ mode === "login" ? "Login" : "Sign Up" }}</h1>
        <form @submit.prevent="submitForm()">
          <div class="control" :class="{ invalid: !username.isValid }">
            <label for="username" class="label"> Username: </label>
            <input
              type="text"
              name="username"
              v-model.trim="username.val"
              @blur="clearValidity('username')"
            />
            <p class="error" v-if="!username.isValid">
              Username must not be empty!
            </p>
          </div>
          <div class="control" :class="{ invalid: !password.isValid }">
            <label for="password" class="label"> Password: </label>
            <input
              type="password"
              name="password"
              v-model.trim="password.val"
              @blur="clearValidity('password')"
            />
            <p class="error" v-if="!password.isValid">
              Password must have more than 8 character!
            </p>
          </div>
          <div class="action">
            <button type="submit" class="btnsubmit">
              {{ submitButtonCaption }}
            </button>
            <button class="btntoggle" @click.prevent="switchAuthMode">
              {{ switchModeBtnCaption }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
// function isValidPass(password) {
//   const regexPass = "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$";
//   return regexPass.test(password);
// }
import BaseModal from "../../components/ui/BaseModal.vue";
import { mapState } from "vuex";
import { mapActions } from "vuex";
export default {
  components: { BaseModal },
  data() {
    return {
      username: {
        val: "",
        isValid: true,
      },
      password: {
        val: "",
        isValid: true,
      },
      isFormValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.auth.token,
    }),
    submitButtonCaption() {
      if (this.mode === "login") {
        return "Login";
      } else {
        return "Create Account";
      }
    },
    switchModeBtnCaption() {
      if (this.mode === "login") {
        return "Create new account";
      } else {
        return "Login with existing account";
      }
    },
  },
  methods: {
    ...mapActions({
      login: "auth/login",
      signup: "auth/signup",
    }),
    clearValidity(input) {
      this[input].isValid = true;
    },
    validationForm() {
      if (this.username.val === "") {
        this.username.isValid = false;
        this.isFormValid = false;
      }
      if (!this.validPassword(this.password.val)) {
        this.password.isValid = false;
        this.isFormValid = false;
      }
    },
    async submitForm() {
      this.validationForm();
      if (!this.isFormValid) {
        return;
      }
      this.isLoading = true;
      const actionPayload = {
        username: this.username.val,
        password: this.password.val,
      };
      console.log(actionPayload);
      try {
        if (this.mode === "login") {
          await this.login(actionPayload);
        } else {
          await this.signup(actionPayload);
          this.mode = "login";
        }
        console.log("123", this.token);
        this.$router.push("/todos");
      } catch (err) {
        this.error = "Something went wrong! Try again later.";
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "sigin";
      } else {
        this.mode = "login";
      }
    },
    handleError() {
      this.error = null;
    },
    validPassword: function (password) {
      const regexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return regexPass.test(password);
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 400px;
  min-width: 300px;
  margin: 50px auto;
  padding: 20px;
}

.auth {
  background: #fff;
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0 5px 8px rgb(0, 0, 0, 0.08);
}

.auth h1 {
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

.auth h1::after {
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

.control input {
  width: 100%;
  padding: 15px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  outline: none;
  margin-bottom: 10px;
  font-weight: 300;
}

.action {
  text-align: center;
}

button.btnsubmit {
  background: #ae00ff;
  margin-top: 20px;
  border: 2px solid #ae00ff;
  font-family: var(--ff-secondary);
  font-weight: 700;
  letter-spacing: 3px;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  border-radius: 25px;
  padding: 15px;
  color: #fff;
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

.control input:focus {
  border: 2px solid #ae00ff;
}

button.btntoggle {
  background: transparent;
  border: none;
  margin-top: 20px;
  color: #ae00ff;
  letter-spacing: 3px;
}

.invalid input {
  border: 2px solid red;
}

.btntoggle:hover {
  color: #8204bd;
}
</style>