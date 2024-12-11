<template>
  <div @click="$emit('close')" class="popup-overlay"> <!--send action to its parent component which is moviebox when overlay clicked to close without the button--> 
    <div @click.stop class="popup-content"> <!--stop the propagation of the click event to the overlay-->
      <img :src="movie.poster" alt="Poster" class="popup-image"/> <!--image for poster-->
      <div class="popup-details">
        <h2>{{ movie.title }}</h2> <!--displaying all the movie informations--> 
        <p>{{ movie.longdescription }}</p>
        <p>Rating: {{ movie.rating }}</p>
        <h3>Actors:</h3>
        <p class="nomoviestext" v-if="actors.length === 0">No actors found for this movie.</p><!--if no movies then display no movies message--> 
        <div class="actors-list">
          <!--get all the actors that play in this movie--> 
          <Actor
            v-for="actor in actors"
            :key="actor.id"
            :actor="actor"
          />
        </div>
        <button @click="$emit('close')">Close</button> <!--send action to its parent component which is moviebox--> 
      </div>
    </div>
  </div>
</template>

<script>
import Actor from './Actor.vue';
import axios from 'axios';

export default {
  name: 'MoviePopup',
  components: { Actor },
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      actors: [], // list for all actors corresponding to this film
      star: '☆'
    };
  },
  mounted() {
    this.fetchActors(); // call the function when component is mounted
    console.log("composant mounted")
  },
  methods: {
  async fetchActors() {
    try {
      // get ID from a movie using its title
      const movieTitle = this.movie.title; // get the movie title
      const movieIdResponse = await axios.get(`http://localhost:3000/api/movies/${movieTitle}`); // get API data // format : {"id":1}
      const movieId = movieIdResponse.data.id; // get only movie ID
      
      console.log('title :', movieTitle); // test
      console.log('id of movie : ', movieId);

      // get all the actors of this movies by using the movie ID
      const actorsResponse = await axios.get(`http://localhost:3000/api/movies/${movieId}/actors`); // get API data // format : [{"id":1,"name":"Hayden Christensen","photo":"../assets/actors/hc.png"},{"id":2,"name":"Ewan McGregor","photo":"../assets/actors/ewan.png"}]
      this.actors = actorsResponse.data; // update actors data

      console.log('actors :', this.actors[0].name); // test

    } catch (error) {
      console.error('error in getting API', error); // return error message if something is wrong with the API
    }
  },
  watchMovie(movieName) {
    alert(`Now watching: ${movieName}`);
  }
}
};
</script>

<style scoped>
.popup-overlay { /* the background for the popup (behind the popup) */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* background of the background color */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.popup-content {
  display: flex;
  backdrop-filter: blur(5px); /* apply blurring effect */
  background: rgba(0, 0, 0, 0.5); /* popup's background color */
  width: 80%;
  height: 80%;
  border-radius: 10px;
  overflow: hidden; /* prevent overflow */
  padding: 20px;
}

.popup-image { /* probably useless stuff i don't know why ?? */
  flex: 0;
  max-width: 100%;
  height: auto;
  object-fit: cover; /* cover all the space keeping its scale */
  border-radius: 8px;
  position: sticky; /* keep the popup image fixed */
  top: 20px;
}

.popup-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  padding-left: 30px;
  overflow-y: auto; /* only the right side is scrollable */
  height: 100%;
}

.actors-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 80px; /* horizontal gap between actors bubble */
  grid-row-gap: 40px; /* vertical gap between actors bubble */
  justify-content: center;
  padding-left: 50px;
}

.actor-bubble {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  border-radius: 50%;
  padding: 10px;
  width: 120px;
  height: 150px;
  text-align: center;
  background-color: #f0f0f0;
}

.actor-photo {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.actor-name {
  margin-top: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #333;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
}

</style>
