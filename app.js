const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

next.addEventListener('click', function() {
    let items = document.querySelectorAll('.item');
    // Mueve el primer elemento al final del contenedor
    document.querySelector('.slide-list').appendChild(items[0]);
});

prev.addEventListener('click', function() {
    let items = document.querySelectorAll('.item');
    // Mueve el último elemento al principio del contenedor
    document.querySelector('.slide-list').prepend(items[items.length - 1]);
});