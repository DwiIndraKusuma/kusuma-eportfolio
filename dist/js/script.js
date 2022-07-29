// Stiky Bar
window.onscroll = function() {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;

    if(window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
    }else{
        header.classList.remove('navbar-remove');
    }
}

// Humberger Menu
const humberger = document.querySelector('#humberger');
const navMenu = document.querySelector('#navMenu');

humberger.addEventListener('click', function(){
    humberger.classList.toggle('humberger-active')
    navMenu.classList.toggle('hidden')
})

// Send Mail Alert
// const alert = document.querySelector('#alert-success');

// btnSendMail.addEventListener('click', function(){
//     alert.classList.toggle('hidden')    
// })

// closeAlert.addEventListener('click', function(){
//     alert.classList.toggle('hidden')    
// })