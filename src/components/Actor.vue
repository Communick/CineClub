<template>
  <div class="actor-bubble">
    <img :src="actor.photo" alt="Actor Photo" class="actor-photo" /> <!--photo of the actor-->
    <p class="actor-name">{{ actor.name }}</p> <!--name of the actor--> 
  </div>
</template>

<script>
export default {
  name: 'Actor',
  props: {
    actor: {
      type: Object,
      required: true,
    }
  }
};
</script>

<style scoped>
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
</style>

<!--           <Actor
            :actor="{
              id: 1,
              name: 'Test Actor',
              photo: 'https://via.placeholder.com/150'
            }"
          /> -->