<template>
    <div class="login-page">
      <h1>Login Page</h1>
      <p>Please login to continue.</p>
  
      <form @submit.prevent="handleSubmit" class="login-form">
        <!--username field-->
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>
  
        <!--password field-->
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
  
        <!-- Bouton de soumission -->
        <div class="form-group">
          <button type="submit" class="login-button">Login</button>
        </div>
  
        <p class="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
</template>
  
<script>

import axios from 'axios';

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
       axios.post('http://localhost:3000/api/login', {
        username: this.username,
        password: this.password
      })
      .then(response => {
        if (response.data.success) {
          this.$router.push("/home"); // push to home page (with user being logged in)
        } else {
          alert("Login failed: " + response.data.message);
        }
      })
      .catch(error => {
        console.error("error in database:", error);
        alert("wrong username or password");
      });
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  margin: 0;
  font-family: Arial, sans-serif;
}

h1 {
  color: #017bff;
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}


.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-size: 1rem;
  color: #333;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
}

input:focus {
  border-color: #017bff;
  outline: none;
}

.login-button {
  background-color: #017bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

.register-link {
  margin-top: 15px;
  font-size: 0.9rem;
}

.register-link a {
  color: #017bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
  