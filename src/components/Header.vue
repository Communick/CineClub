<template>
  <div id="headerdiv">
    <header class="header"> <!--set the header--> 
      <img src="../assets/logo.png" alt="Logo" class="logo" /> <!--logo of the website-->
    </header>
  </div>
</template>

<style scoped>
.h1 {
  color: white;
  font-size: 2em;
}

.header {
  background-color: #007bff; /* color of the header */
  padding: 20px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.logo {
  max-width: 150px; 
}

h1 {
  color: white;
  font-size: 2em;
  margin-top: 10px;
}

body {
  margin: 0;
}
</style>