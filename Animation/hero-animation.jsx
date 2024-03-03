
<body>
    <div class="hero">
      <nav>
        <img class="logo" src="images/logo.png" alt="Logo" />
        <ul>
          <li><a href="#">Fetcher</a></li>
          <li><a href="#">How it works</a></li>
          <li><a href="#">Privacy</a></li>
        </ul>
        <div>
          <a href="#" class="login-btn">Login</a>
          <a href="#" class="btn">Download App</a>
        </div>
      </nav>
      <div class="content">
        <h1 class="anim">Make<br /></h1>
        <p class="anim">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio accusamus nemo eum. Vel ex, consequuntur quae quia accusamus voluptatem harum!</p>
        <a href="#" class="btn anim">Join Now</a>
      </div>
    </div>
    <img src="images/pic.png" alt="model image" class="fetcher-image anim">
  </body>


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

a{
    text-decoration: none;
}

.hero{
    width: 100%;
    min-height: 100vh;
    background-image: url(images/back-image.png);
    background-size: cover;
    background-position: center;
    padding: 10px 10%;
    overflow: hidden;
    position: relative;
}

nav{
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo{
    width: 140px;
}

nav ul li {
    display: inline-block;
    list-style: none;
    margin: 10px 10px;
}

nav ul li a {
    text-decoration: none;
    color: #333;
    font-weight: 400;
}

.login-btn{
    margin-right: 10px;
    color: #333;
    font-weight: 400;
}

.btn{
    display: inline-block;
    padding: 14px 40px;
    color: #fff;
    background-image: linear-gradient(45deg, #df4881, #c430d7);
    font-size: 14px;
    border-radius: 30px;
    border-top-right-radius: 0;
    transition: 0.3s;
}

.content{
    margin-top: 10%;
    max-width: 600px;
}

.content h1{
    font-size: 70px;
    color: #222;
}

.content p{
    margin: 10px 0 30px;
    color: #333;
    /* animate delay 0.25s*/
    animation-delay: 0.25s;
}

.content .btn{
    padding: 15px 80px;
    font-size: 16px;
    /* animate delay 0.5s*/
    animation-delay: 0.5s;
}

.btn:hover{
    border-top-right-radius: 30px;
}

.fetcher-image{
    width: 530px;
    position: absolute;
    bottom: 0;
    right: 10%;
}

/* nospace between this two class */
.fetcher-image.anim { 
    /* animate delay 0.5s*/
    animation-delay: 0.5s;
}

.anim{
    opacity: 0;
    transform: translateY(30px);
    animation: moveup 0.5s linear forwards;
}

@keyframes moveup{
    100%{
        opacity: 1;
        transform: translateY(0px);
    }
}
