<template>
  <div class="movie">
    <img @click="showPopup()" :src="poster" alt="Movie Poster" class="poster" /> <!--image for poster--> 
    <p :class="['movie-title', isLongTitle ? 'multi-line' : 'single-line']">{{ title }}</p> <!--handleing title, if the title is too long, call class multi line, else call single line class--> 
    <p @click="showPopup()" class="movie-description">{{ description }}</p> <!--descriptionof the movie--> 
  </div>
  <MoviePopup v-if="isPopupVisible" :movie="movieDetails" @close="isPopupVisible = false" /> <!--initializing a moviepopup component, display popup is ispopupvisible, else don't show it, and when @close, set to not visible --> 
</template>

<script>
import MoviePopup from './MoviePopup.vue';

export default {
  name: 'MovieBox',
  components: { MoviePopup },
  props: { // props
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String, // movie name
      default: 'Movie Title'
    },
    poster: {
      type: String, // poster is the path to the image
      default: '../assets/poster.png'
    },
    description: {
      type: String, // simple movie description, like a summary
      default: 'Movie Description'
    },
    rating: {
      type: Number, // rating - not yet implement
      default: 10
    },
    longdescription: {
      type: String, // movie detailled description
      default: 'Movie Long Description'
    }
  },
  data() {
    return {
      isPopupVisible: false, // popup is not visible by default
      movieDetails: {} // movie details variable that will receive the movie details from showpopup method
    };
  },
  computed: {
    isLongTitle() {
      return this.title.length > 20; // a title is considered long if it has more than 20 characters
    }
  },
  methods: {
    showPopup() {
      this.movieDetails = { // initialize movie details for the popup component
        id: this.id,
        title: this.title,
        poster: this.poster,
        description: this.description,
        longdescription: this.longdescription,
        rating: this.rating
      };
      this.isPopupVisible = true; // set popiup to visible when called after initializing movie details
    }
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
  height: auto;
  display: block;
  margin: 0 auto;
  transition: opacity 0.5s ease;
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
}

.multi-line {
  transform: translate(-50%, -35%); /* special case for long movie title */
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
</style>
