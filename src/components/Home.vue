<template>
  <div id="welcome">
    <h1 id="title">{{ title }}</h1> <!--simple home text-->
    <LoginButton></LoginButton>
    <MoviePage></MoviePage>
  </div>
</template>

<script>

import LoginButton from './LoginButton.vue'; // import LoginButton component
import MoviePage from './MoviePage.vue'; // import MoviePage component

export default {
  name: 'Home',
  props: {
    title: {
      type: String,
      default: 'Welcome to CineClub !' // default home text
    }
  },
  components: {
    LoginButton,
    MoviePage,
  },
};
</script>

<style scoped>
#title {
  color: black;
  size: 20px;
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
</style>