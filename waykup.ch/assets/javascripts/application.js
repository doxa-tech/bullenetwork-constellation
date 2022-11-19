function stickyNav() {
    window.onscroll = function() {myFunction()};
      
    var navbar = document.querySelector('.navbar');
    var sticky = navbar.offsetTop;
    
    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    }
}
document.addEventListener('DOMContentLoaded', nav);
function nav(){
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.navbar');
    burger.addEventListener('click', ()=>{
        nav.classList.toggle('show')
    })
}