<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>


<script>
import axios from 'axios'; // all of thoses import are not needed for final, used for checking & debugging
import Header from './components/Header.vue';
import Home from './components/Home.vue';
import MovieBox from './components/MovieBox.vue';
import MoviePage from './components/MoviePage.vue';
import MoviePopup from './components/MoviePopup.vue';
import Actor from './components/Actor.vue';
import Footer from './components/Footer.vue';
import LoginButton from './components/LoginButton.vue';

export default {
  name: 'App',
  components: { // all of our components, same we might delete some
    Header, 
    Home,
    MovieBox,
    MoviePage,
    MoviePopup,
    Actor,
    Footer,
    LoginButton,
  },

  data() {
    return {
      actors: [] // probably not needed for final, used for checking & debugging
    };
  },

  mounted() { // probably not needed for final, used for checking & debugging
    axios.get('http://localhost:3000/api/actors')
      .then(response => {
        this.actors = response.data; // get API data
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des acteurs:', error);
      });
    }
};
</script>

<style>
body {
  overflow: scroll; /* allow scrolling */
}
::-webkit-scrollbar {
  display: none; /* hide the scrolling bar */
}
.home {
  color: black;
}
</style>  