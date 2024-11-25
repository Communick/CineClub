<template>
    <button class="login-button" @click="redirectToLogin">
      Login
    </button>
  </template>
  
  <script>
  export default {
    name: "LoginButton",
    methods: {
      redirectToLogin() {
        this.$router.push('/login'); // redirect to route /login
      },
    },
  };
  </script>
  
  <style scoped>
  .login-button {
    background-color: white;
    color: #017bff;
    border: 2px solid #017bff;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.5s, color 0.5s;
  }
  
  .login-button:hover {
    background-color: #017bff;
    color: white;
  }
  </style>
  