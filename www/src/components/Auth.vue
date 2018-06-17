<template>
  <div class="auth">
    <div class="login" v-if="showLogin">
      <h1>Login</h1>
      <form v-on:submit.prevent="login" class="form">
        <input class="input" type="email" name="email" placeholder=" email" id="email" v-model="user.email">
        <input class="input" type="password" name="password" placeholder=" password" id="name" v-model="user.password">
        <button class="btn btn-primary" type="submit">Login</button>
      </form>
      <p class="user">Not a user ?
        <em @click="toggle">Register</em>
      </p>
    </div>
    <div class="register" v-if="!showLogin">
      <h1>Register</h1>
      <form v-on:submit.prevent="register">
        <input class="input" type="email" name="email" placeholder=" email" id="email" v-model="user.email">
        <input class="input" type="text" name="name" placeholder=" Name" id="name" v-model="user.displayName">
        <input class="input" type="password" name="password" placeholder=" password" id="name" v-model="user.password">
        <button class="btn btn-primary" type="submit">Register</button>
      </form>
      <p>Already a user?
        <em @click="toggle">Login</em>
      </p>
    </div>
    <p>Or start a <button class="btn btn-success" @click="demo">Demo</button></p>
  </div>
</template>

<script>
  export default {
    name: 'Auth',
    mounted() {
      this.$store.dispatch('authenticate')
    },
    data() {
      return {
        user: {
          email: '',
          displayName: '',
          password: ''
        },
        showLogin: true
      }
    },
    computed: {},
    methods: {
      login() {
        this.$store.dispatch('login', this.user)
      },
      register() {
        this.$store.dispatch('register', this.user)
      },
      toggle() {
        this.showLogin = !this.showLogin
      },
      demo() {
        this.$store.dispatch('startDemo')
      }
    }
  }

</script>

<style>
  .auth {
    background-color: black;
    opacity: 0.8;
    display: inline-block;
    padding: 1vh 10vh;
    margin-top: 5vh;
    color: white;
  }
</style>