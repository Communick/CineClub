<template>
    <div id="about-us">
      <h1>About Us</h1>
      <p>We are CineClub, a platform where movie lovers can find all the informations about the film industry and save their best movies !</p>
      
      <h2>Meet Our Team</h2>
      
      <div class="team-container">
        <Actor
          v-for="actor in team"
          :key="actor.id"
          :actor="actor"
        />
      </div>
      <p>We are 3 students in computer science !</p>
    </div>
  </template>
  
  <script>
  import Actor from './Actor.vue';
  
  export default {
    name: 'AboutUs',
    components: {
      Actor
    },
    data() {
      return {
        team: [
          {
            id: 1,
            name: 'Kevin',
            photo: '/assets/person.png'
          },
          {
            id: 2,
            name: 'Jaafar',
            photo: '/assets/person.png'
          },
          {
            id: 3,
            name: 'Tiphanie',
            photo: '/assets/person.png'
          }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  #about-us {
    text-align: center;
    padding: 20px;
  }
  
  h1 {
    padding-top: 30px;
    color: black;
    font-size: 2rem;
  }
  
  h2 {
    color: black;
    font-size: 1.5rem;
    margin-top: 20px;
  }
  
  .team-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 30px;
  }
  </style>
  