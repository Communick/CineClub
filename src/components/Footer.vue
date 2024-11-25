<template>
    <div id="footerdiv">
      <footer class="footer"> <!--footer section-->
        <div class="footer-links">
          <a href="#" class="footer-link">Home</a>
          <a href="#" class="footer-link">About us</a>
          <a href="#" class="footer-link">Contact</a>
          <a href="#" class="footer-link">what</a>
        </div>
        <p class="footer-credits">&copy; 2024 CineClub. All right reserved.</p>
      </footer>
    </div>
  </template>
  
  <style scoped>
  .footer {
    background-color:#017bff;
    color: white;
    padding: 10px;
    text-align: center;
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 1000; /* no conflict */
  }
  
  .footer-logo {
    max-width: 100px;
    margin-bottom: 10px;
  }
  
  .footer-links {
    margin: 10px 0;
    display: flex;
    justify-content: center;
    gap: 15px;
  }
  
  .footer-link {
    color: white;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s;
  }
  
  .footer-link:hover {
    color: #dcdcdc;
  }
  
  .footer-credits {
    font-size: 12px;
    margin-top: 10px;
  }
  
  body {
    margin-bottom: 60px;
  }
  </style>
  