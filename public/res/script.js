


var navElem = document.querySelector("nav"); //NAV elem felkutatása és eltárolása

function navClick()
{
    navElem.classList.toggle("open"); //Az OPEN class hozzáadása/elvétele a NAV elemhez
}
navElem.onclick = navClick;


document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuItems = document.querySelector('.menu-items');
  
 // Kezdetben zárt legyen a menü kis képernyőn
 if (window.innerWidth <= 950) {
    menuItems.style.display = 'none';
} else {
    menuItems.style.display = 'flex'; // Nagy képernyőn alapértelmezetten látható
}



    menuToggle.addEventListener('click', function() {
        if (menuItems.style.display === 'flex' || menuItems.style.display === '') {
            menuItems.style.display = 'none';
        } else {
            menuItems.style.display = 'flex';
        }
    });

    // Figyeljük a képernyő méretének változását
    window.addEventListener('resize', function() {
        if (window.innerWidth > 950) { // Nagy képernyőn
            menuItems.style.display = 'flex'; // Mindig látható legyen
        } else { // Kis képernyőn
            menuItems.style.display = 'none'; // Zárva legyen
        }
    
});


});
document.addEventListener('DOMContentLoaded', function() {
    var items = document.querySelectorAll('.image-left,.description');

    function checkVisibility() {
        items.forEach(function(item) {
            if (isElementInViewport(item)) {
                item.classList.add('visible');
            } 
            else
            {
                item.classList.remove('visible');
            }
        });
    }

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            //rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    checkVisibility();

    window.addEventListener('scroll', function() {
        checkVisibility();
    });
});


