<template>
    <div class="register-page">
  
      <form @submit.prevent="handleSubmit" class="register-form">
        <!--username field-->
        <h2 class="title-register">CineAccount Register</h2>
        <div class="form-group">
          <input
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>
  
        <!--password field-->
        <div class="form-group">
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
          <button type="submit" class="register-button">Register</button>
        </div>
  
        <p class="register-link">
          Already have an account? <a href="/login" @click="redirectToLogin()">Login here</a>
        </p>
      </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleSubmit() {
      axios.post('http://localhost:3000/api/register', {
        username: this.username,
        password: this.password,
      })
      .then(response => {
        if (response.data.success) {
          alert(response.data.message);
          this.$router.push("/login"); // redirect to login page
        } else {
          alert("failed login : " + response.data.message); // display the message send by the server
        }
      })
      .catch(error => {
        console.error("failed login :", error);
        alert(error.response.data.message);
      });
    },
    redirectToLogin() {
      this.$router.push('/login'); // redirect to route /login
    },
  },
};
</script>


<style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  margin: 0;
  font-family: Arial, sans-serif;
}

.title-register{
  margin: 10px;
  color: #d0afff
} 

h1 {
  color: #017bff;
  font-size: 2rem;
  margin-bottom: 10px;
}

p {
  font-size: 1rem;
  color: #000000;
  margin-bottom: 20px;
}

.register-form {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 15px;
  background: linear-gradient(45deg, #7e1de5, #2575fc); /* Default gradient */
  background-size: 200% 200%; /* Expand gradient for animation */
  animation: gradientMove 5s infinite alternate; /* Animation */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  /*transition: background-color 1s ease-in-out;*/
}
/*
.register-form:hover {
  background: linear-gradient(90deg, #7e1de5, #2575fc);
  transition: background-color 1s ease-in-out;
}
*/

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-size: 1rem;
  color: #000000;
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

.register-button {
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

.register-button:hover {
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
  