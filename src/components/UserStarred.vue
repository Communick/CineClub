<template>
    <div class="favorites">
      <h2>{{ username }}, Your Favorite Movies</h2>
      <div v-if="favorites.length===0">
        <p>You don't have any starred movies !</p>
      </div>
      <div v-else class="movie-list">
        <MoviePage :movies="favorites" /> <!-- pass only the favorites movies -->
        </div>
      </div>
  </template>
  
  <script>

  import axios from 'axios';
  import MoviePage from './MoviePage.vue';

  export default {
    name: 'UserStarred',
    components: {
      MoviePage,
    },
    data() {
      return {
        favorites: [],  // favirites movies list
        username: JSON.parse(localStorage.getItem('user')), // get username from local storage
      };
    },
    mounted() {
      this.getUserFavorites();  // get favorites movie @ initialisation
    },
    methods: {
      getUserFavorites() {
        // API request to get user favorites
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = JSON.parse(localStorage.getItem('userId'));
        console.log('userID:', userId);
        if (user) {
          axios.get(`http://localhost:3000/api/user/${userId}/favorites`) // call API to get user favorites from userID
            .then(response => {
              this.favorites = response.data;
            })
            .catch(error => {
              console.error('Erreur lors de la récupération des films favoris:', error);
            });
        }
      }
    }
  };
  </script>
  
  <style>
  .movie-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .movie-card {
    width: 200px;
    text-align: center;
  }
  </style>
  