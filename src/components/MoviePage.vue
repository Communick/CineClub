<template>
  <div id="moviepage">
    <div id="moviebox" class="movie-grid">
      <!--show all movies in variable "movies" using a for loop--> 
      <MovieBox
        v-for="movie in movies" 
        :key="movie.id"
        :title="movie.title"
        :poster="movie.poster"
        :description="movie.description"
        :rating="movie.rating"
        :longdescription="movie.longdescription"
      /> <!--getting movies from when component is mounted--> 
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // axios is a promise-based HTTP client for the browser and node.js
import MovieBox from './MovieBox.vue';

export default {
  name: 'MoviePage',
  components: {
    MovieBox
  },
  data() {
    return {
      title: 'Movies from Database',
      movies: [] // variable that will store movies that will be fetched from the API
    };
  },
  mounted() {
    // get movies from API
    axios.get('http://localhost:3000/api/movies')
      .then(response => {
        this.movies = response.data; // prop movies is updated with the data from the API
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des films:', error); // catches eventual errors
      });
  }
};
</script>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 movies per row */
  gap: 100px; /* gap between movies */
  padding: 20px;
}
</style>
