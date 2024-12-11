<template>
  <div class="movie">
    <img @click="showPopup()" :src="poster" alt="Movie Poster" class="poster" :class="{ 'active-border': isFavorite }" /> <!-- poster of the movie -->
    <div class="popup-star" :class="{ 'active-star': star === '⭐' }" @click="toggleStar()">{{ star }}</div> <!-- star to add to favorites -->
    <p @click="showPopup()" :class="['movie-title', isLongTitle ? 'multi-line' : 'single-line']">{{ title }}</p> <!-- title of the movie, proceed through checking if it's a long title or not -->
    <p @click="showPopup()" class="movie-description">{{ description }}</p> <!-- description of the movie, short one -->
  </div>
  <MoviePopup v-if="isPopupVisible" :movie="movieDetails" @close="isPopupVisible = false" /> <!-- popup to show more details about the movie, the display is disabled by default and can be enabled on click of a movie -->
</template>

<script>
import MoviePopup from './MoviePopup.vue';
import axios from 'axios';

export default {
  name: 'MovieBox',
  components: { MoviePopup },
  props: { 
    id: { type: Number, required: true },
    title: { type: String, default: 'Movie Title' },
    poster: { type: String, default: '../assets/poster.png' },
    description: { type: String, default: 'Movie Description' },
    rating: { type: Number, default: 10 },
    longdescription: { type: String, default: 'Movie Long Description' }
  },
  data() {
    return {
      isPopupVisible: false,
      movieDetails: {},
      star: '☆', // star is defined off by default
      userFavorites: [],  // list of user favorites movies
      isFavorite: false,  // to check if a movie is a favorite or not
    };
  },
  computed: {
    isLongTitle() {
      return this.title.length > 25; // check lenght of a title and determine if it's long or not
    }
  },
  methods: {
    showPopup() {
      this.movieDetails = { // set all the movie details
        id: this.id,
        title: this.title,
        poster: this.poster,
        description: this.description,
        longdescription: this.longdescription,
        rating: this.rating
      };
      this.isPopupVisible = true; // set the visibility of the popup as true
    },
    toggleStar() {
      const userId = localStorage.getItem('userId'); // get user id from local storage
      if (!userId) {
        alert("You must be logged in to add a movie to your favorites!"); // if not logged, display a message
        return;
      }

      axios.get(`http://localhost:3000/api/get-movie-id?title=${this.title}`) // request to get the movie id from the movie title
        .then(response => {
          const movieId = response.data.id;

          if (this.star === '☆') { // if the star is off, turn it on
            this.star = '⭐';
            this.addFavorite(userId, movieId); // add the movie to favorites
          } else {
            this.star = '☆'; // if the star was on, turn it off
            this.removeFavorite(userId, movieId); // and then remove the movie from the favorites
          }
        })
        .catch(error => {
          console.error('Error when trying to get movie', error);
        });
    },

    addFavorite(userId, movieId) {
      axios.post('http://localhost:3000/api/add-favorite', { // call API to add a favorite
        user_id: userId,
        movie_id: movieId
      })
      .then(response => {
        console.log('Movie added to favorites');
        this.fetchUserFavorites(); // update the list of favorites
      })
      .catch(error => {
        console.error('Error when adding movie to favorites:', error);
      });
    },

    removeFavorite(userId, movieId) {
      axios.post('http://localhost:3000/api/remove-favorite', { // call API to remove a favorite
        user_id: userId,
        movie_id: movieId
      })
      .then(response => {
        console.log('Movie removed from favorites');
        this.fetchUserFavorites(); // update the list of favorites
      })
      .catch(error => {
        console.error('Error when removing movie from favorites:', error);
      });
    },

    fetchUserFavorites() {
      const userId = localStorage.getItem('userId'); // get user id from local storage
      if (userId) { 
        axios.get(`http://localhost:3000/api/user-favorites/${userId}`) // get user favorites from API
          .then(response => {
            this.userFavorites = response.data.movies.map(movie => movie.title); // create a new list with only the title of the movie with anything else
            this.checkIfFavorite();
          })
          .catch(error => {
            console.error('Error fetching user favorites:', error);
          });
      }
    },

    checkIfFavorite() {
      this.isFavorite = this.userFavorites.includes(this.title);
      this.star = this.isFavorite ? '⭐' : '☆';  // update star based on favorite status
    }
  },

  watch: { // watch for changes in the title
    title(newTitle) {
      this.checkIfFavorite(); // if so, check if the movie is a favorite
    }
  },

  mounted() {
    this.fetchUserFavorites();  // get favorites when component is mounted
  }
};
</script>

<style scoped>
#moviebox {
  text-align: center;
  margin: 20px;
}

.movie {
  position: relative;
  display: inline-block;
  text-align: left;
}

.poster {
  width: 200px; /* set image width and height to 200x300 */
  height: 300px;
  max-width: 100%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
  transition: opacity 0.5s ease;
  border-radius: 10px;
  border: 3px solid black;
}

.rating {
  position: absolute;
  top: 80%;
  right: 50%;
  color: white;
  padding: 5px;
  z-index: 1;
  opacity: 0;
}

.movie-title {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%); 
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  width: 90%;
  text-align: center;
  z-index: 1;
  transition: opacity 0.5s ease;
}

.single-line {
  transform: translate(-50%); /* special case for short movie title */
  border-radius: 10px;
}

.multi-line {
  transform: translate(-50%, -35%); /* special case for long movie title */
  border-radius: 10px;
}

.movie-description {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  width: 80%;
  text-align: center;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.movie:hover .poster {
  opacity: 0.3;
}

.movie:hover .movie-title {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.movie:hover .movie-description {
  opacity: 1;
  transition: opacity 0.5s ease;
}

.movie:hover .rating {
  opacity: 1;
  transition: opacity 0.5s ease;
}

.popup-star{
  display: none;
  transition: 0.5s ease;
}

.movie:hover .popup-star {
  display: block;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 36px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  cursor: pointer;
  z-index: 2;
  user-select: none;
  transition: transform 0.5s ease, color 0.5s ease;
}

.movie:hover .popup-star:hover {
  color: gold;
  transform: scale(1.5);
}

.movie:hover .popup-star:active {
  transform: scale(1);
}

.movie .poster.active-border {
  border: 3px solid gold;
}


</style>
