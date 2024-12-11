<template>
  <div id="moviepage">
    <div v-if="movies.length === 0"> <!-- if no movies are found, display a message -->
      <p>No movies found</p>
    </div>
    <div v-else id="moviebox" class="movie-grid">
      <MovieBox
        v-for="movie in movies" 
        :key="movie.id"
        :title="movie.title"
        :poster="movie.poster"
        :description="movie.description"
        :rating="movie.rating"
        :longdescription="movie.longdescription"
      /> <!-- display all the movies -->
    </div>
  </div>
</template>

<script>
import MovieBox from './MovieBox.vue';

export default {
  name: 'MoviePage',
  components: {
    MovieBox,
  },
  props: {
    movies: {
      type: Array,
      required: true,
    },
  },
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
