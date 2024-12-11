<template>
    <div class="comments-section">
      <h3>Comments</h3>
      <ul class="comments-list">
        <li v-for="comment in comments" :key="comment.id" class="comment">
          <p>{{ comment.text }}</p>
          <small>— {{ comment.author }}</small>
        </li>
      </ul>
      <form @submit.prevent="addComment" class="add-comment-form">
        <textarea 
          v-model="newComment" 
          placeholder="Add your comment here..." 
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>

<script>
import axios from 'axios';

export default {
  name: 'Comments',
  props: {
    movieId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
      newComment: '',
    };
  },
  methods: {
    async fetchComments() {
      try {
        const response = await axios.get(`http://localhost:3000/api/movies/${this.movieId}/comments`);
        this.comments = response.data;
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async addComment() {
      if (this.newComment.trim() === '') return;

      try {
        const response = await axios.post(`http://localhost:3000/api/movies/${this.movieId}/comments`, {
          text: this.newComment,
          author: 'Anonymous',
        });


        this.comments.push(response.data);
        this.newComment = '';
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    },
  },
  mounted() {
    this.fetchComments();
  },
};
</script>

<style scoped>
.comments-section {
  margin-top: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.comments-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.comment {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.add-comment-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

.add-comment-form button {
  background-color: #017bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-comment-form button:hover {
  background-color: #0056b3;
}
</style>
