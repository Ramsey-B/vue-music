<template>
  <div class="">
    <div class="login" v-if="showLogin">
      <h1>Login</h1>
      <form v-on:submit.prevent="login" class="form">
        <input class="input" type="email" name="email" placeholder=" email" id="email" v-model="user.email">
        <input class="input" type="text" name="email" placeholder=" password" id="name" v-model="user.password">
        <button type="submit">Login</button>
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
        <input class="input" type="text" name="email" placeholder=" password" id="name" v-model="user.password">
        <button type="submit">Register</button>
      </form>
      <p>Already a user?
        <em @click="toggle">Login</em>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Auth',
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
      }
    }
  }

</script>

<style>


</style>
