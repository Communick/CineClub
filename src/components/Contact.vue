<template>
    <div class="contact-page">
      <h1>Contact Us</h1>
      <p>Have any questions or feedback? Feel free to reach out to us using the form below.</p>
  
      <form @submit.prevent="submitForm"> <!-- prevent default form submission -->
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name" 
            :class="{ 'error': errors.name }" 
            placeholder="Enter your name" 
          />
          <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
        </div>
  
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            :class="{ 'error': errors.email }" 
            placeholder="Enter your email" 
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
  
        <div class="form-group">
          <label for="message">Message</label>
          <textarea 
            id="message" 
            v-model="form.message" 
            :class="{ 'error': errors.message }" 
            placeholder="Write your message" 
            rows="5">
          </textarea>
          <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
        </div>
  
        <button type="submit" class="submit-button">Send Message</button>
      </form>
  
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ContactPage',
    data() {
      return {
        form: {
          name: '',
          email: '',
          message: '',
        },
        errors: {},
        successMessage: '',
      };
    },
    methods: {
      validateForm() {
        this.errors = {};
        if (!this.form.name) {
          this.errors.name = 'Name is required.'; // check name field
        }

        if (!this.form.email) {
          this.errors.email = 'Email is required.'; // check emial field
        }

        if (!this.form.message) {
          this.errors.message = 'Message is required.'; // check message field
        }
        
        return Object.keys(this.errors).length === 0;
      },
      submitForm() {
        if (this.validateForm()) {
          // simulate data sending
          console.log('Form submitted:', this.form);
  
          // display successful message
          this.successMessage = 'Your message has been sent successfully!';
          
          // reinitialize form
          this.form = {
            name: '',
            email: '',
            message: '',
          };
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .contact-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
    color: black;
    padding-top: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
  }
  
  input, textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  input.error, textarea.error {
    border-color: red;
  }
  
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  
  .submit-button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #0056b3;
  }
  
  .success-message {
    text-align: center;
    color: green;
    margin-top: 20px;
  }
  </style>
  