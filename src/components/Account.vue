<template>
    <div class="account-page">
      <h2 class="title-account">Your CineClub Account</h2>
      <div class="account-info">
        <p><strong>Username:</strong> {{ user.username }}</p>
        <p><strong>Number of stars:</strong> {{ user.starredMovies }}</p>
        <p><strong>Member Since:</strong> {{ user.memberSince }}</p>
      </div>
  
      <div class="account-actions">
        <button @click="logout" class="logout-button">Logout</button>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "UserAccount",
  data() {
    return {
      user: {
        username: "",
        memberSince: "",
        starredMovies: "",
      },
    };
  },
    methods: {
        editAccount() {
        this.$router.push("/edit-account");
        },
        logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        this.$router.push("/login");
        },
    },
  created() {
    // get user data from local storage
    const username = JSON.parse(localStorage.getItem("user"));
    const userId = JSON.parse(localStorage.getItem("userId"));
    if (username) {
      axios
        .post('http://localhost:3000/api/users', { username }) // send PoST request
        .then(response => {
          const userData = response.data; // get response
          if (userData) {
            this.user.username = userData.username; // username from response
            this.user.memberSince = new Date(userData.account_created_date).toLocaleDateString(); // account created date
          } else {
            console.error("User not found");
          }
        })
        .catch(error => {
          console.error("Error fetching user data:", error);
        });
    }
    if(username){   
    axios.get(`http://localhost:3000/api/user_favorites`, { params: { userId } }) // pass userId in parameters
    .then(response => {
      const userStarred = response.data;
      if (userStarred) {
        this.user.starredMovies = userStarred.count; // get from API response
      } else {
        console.error("No favorites found for user");
      }
    })
    .catch(error => {
      console.error("Error fetching user data:", error);
    });


    }
  },
};
</script>


<style scoped>
.account-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  font-family: Arial, sans-serif;
}

.title-account {
  margin: 10px;
  color: #d0afff;
  font-size: 1.5rem;
}

.account-info {
  background: linear-gradient(45deg, #7e1de5, #2575fc);
  padding: 20px;
  border-radius: 15px;
  color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  text-align: center;
  margin-bottom: 20px;
}

.account-info p {
  margin: 10px 0;
}

.account-button {
  background-color: #017bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.account-button:hover {
  background-color: #0056b3;
}

.logout-button {
  background-color: #ff4d4d;
}

.logout-button:hover {
  background-color: #cc0000;
}
</style>

  