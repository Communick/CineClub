<template>
  <title>CineClub</title>
  <div id="welcome">
    <LoginButton class="login-button" v-if="!!!isUserLoggedIn" buttonText="Login"/> <!-- if user is not logged in, display login in button -->
    <LoginButton class="login-button" v-else buttonText="My account"/> <!-- if he is logged in, display my account in button -->
    <h1 id="title">{{ title }}</h1>
    <ResearchBar @search="handleSearch" /> <!-- get search event -->
    <button v-if="isUserLoggedIn" @click="toggleFavorites">
    {{ showFavorites ? 'Show all movies' : 'Show favorites' }}
    </button>
    <MoviePage :movies="filteredMovies" /><!-- pass only the filtered movies from the user query -->
  </div>
</template>

<script>
import axios from 'axios';
import LoginButton from './LoginButton.vue';
import MoviePage from './MoviePage.vue';
import ResearchBar from './ResearchBar.vue';

export default {
  name: 'Home',
  components: {
    LoginButton,
    MoviePage,
    ResearchBar,
  },
  data() {
      return {
        title: '', // welcome message
        allMovies: [], // all movies from DB
        filteredMovies: [], // filtered movies from user query
        favoritesMovies: [], // favorites movies from user
        showFavorites: false,
      };
  },

  computed: {
    isUserLoggedIn() {
      // check if user is logged in by getting user data from local storage
      return localStorage.getItem('user');
    }
  },

  methods: {
    handleSearch(query) {
      let moviesToFilter; // not using const because it will be reassigned
      if (this.showFavorites) {
        moviesToFilter = this.favoritesMovies;
      } else {
        moviesToFilter = this.allMovies;
      } // if user is displaying favorites filter favorites else filter all movies
      this.filteredMovies = moviesToFilter.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    },


    getUsername() {
      return JSON.parse(localStorage.getItem("user"));
    },

    toggleFavorites() {
      const userId = JSON.parse(localStorage.getItem("userId"));

      if (!this.showFavorites) {
        // display favorites
        axios.get(`http://localhost:3000/api/user-favorites/${userId}`)
          .then(response => {
            console.log("API response:", response.data);
            this.favoritesMovies = response.data.movies;
            this.filteredMovies = this.favoritesMovies; // display only favorites by passing in filtered, that will be passed to moviepage
            this.showFavorites = true;
          })
          .catch(error => {
            console.error("error fetching favorites:", error);
          });
      } else {
        // else display all movies
        this.filteredMovies = this.allMovies;
        this.showFavorites = false;
      }
    },
  },

  mounted() {
    if (this.isUserLoggedIn) {
      const user = localStorage.getItem('user');
      this.title = `Welcome to CineClub, ${JSON.parse(localStorage.getItem("user"))} !`;
    } else {
      this.title = 'Welcome to CineClub!';
    }
    // load all movies @ initialisation
    axios.get('http://localhost:3000/api/movies')
      .then(response => {
        this.allMovies = response.data;
        this.filteredMovies = this.allMovies; // display all movies at the start  
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des films:', error);
      });
  },
};
</script>


<style scoped>
#title {
  color: black;
  size: 20px;
  margin-top: 70px;
}

#headerdiv {
  margin-bottom: 30px;
}

#welcome {
  text-align: center;
  margin-top: 30px;
}

#navigationbar {
  margin-top: 20px;
  text-align: center;
}

.login-button {
  position: fixed;
  right: 60px;
  top: 20px;
  z-index: 1001;
}
</style>