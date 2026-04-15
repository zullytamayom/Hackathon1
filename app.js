// --- 1. CONFIGURACIÓN INICIAL DEL CARRITO ---
let count = localStorage.getItem('carritoEspacial') || 0;
const cartCount = document.getElementById('cart-count'); // Asegúrate de tener este ID en tu HTML
if(cartCount) cartCount.innerText = count;

// --- 2. FUNCIONALIDAD DEL CARRUSEL ---
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

next.addEventListener('click', function() {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide-list').appendChild(items[0]);
});

prev.addEventListener('click', function() {
    let items = document.querySelectorAll('.item');
    document.querySelector('.slide-list').prepend(items[items.length - 1]);
});

// --- 3. TRANSICIÓN DE COHETE (MENU) ---
const linkCatalogo = document.querySelector('a[href="#seccion-catalogo"]');
if (linkCatalogo) {
    linkCatalogo.addEventListener('click', function(e) {
        e.preventDefault();
        const transition = document.getElementById('rocket-transition');
        const rocket = transition.querySelector('.rocket');
        const target = document.querySelector('#seccion-catalogo');

        transition.style.display = 'flex';
        
        setTimeout(() => {
            rocket.classList.add('launching');
            target.scrollIntoView({ behavior: 'auto' }); 

            setTimeout(() => {
                transition.style.opacity = '0';
                transition.style.transition = 'opacity 0.5s';
                
                setTimeout(() => {
                    transition.style.display = 'none';
                    transition.style.opacity = '1';
                    rocket.classList.remove('launching');
                }, 500);
            }, 600);
        }, 400);
    });
}

// --- 4. AGREGAR AL CARRITO (TODOS LOS BOTONES) ---
const botonesCarrito = document.querySelectorAll('.btn-cart');

botonesCarrito.forEach(boton => {
    boton.addEventListener('click', (e) => {
        // Actualizar contador y LocalStorage
        count++;
        localStorage.setItem('carritoEspacial', count);
        if(cartCount) cartCount.innerText = count;

        // Partículas
        crearParticulas(e.clientX, e.clientY);

        // Feedback en el botón específico que se clickeó
        const textoOriginal = boton.innerText;
        boton.innerText = "¡En órbita! 🚀";
        
        setTimeout(() => {
            boton.innerText = textoOriginal;
        }, 1500);
    });
});

// --- 5. FUNCIÓN DE PARTÍCULAS ---
function crearParticulas(x, y) {
    for (let i = 0; i < 10; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula-espacial';
        document.body.appendChild(particula);

        particula.style.left = `${x}px`;
        particula.style.top = `${y}px`;

        const destX = (Math.random() - 0.5) * 100;
        const destY = -Math.random() * 150;

        particula.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${destX}px, ${destY}px)`, opacity: 0 }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => particula.remove();
    }
}



// Consumo API de la NASA
const apiKey = '3f38bc39ylKXHyVWWRZLFRg6efC5HUFsnmXYW1Jd';

async function obtenerFotoNasa() {
  try {
    const respuesta = await fetch(url);
    
    // Validar si la respuesta es correcta (status 200)
    if (!respuesta.ok) {
      throw new Error(`Error en la petición: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    // Insertar los datos en el HTML
    document.getElementById('titulo').innerText = datos.title;
    document.getElementById('explicacion').innerText = datos.explanation;
    
    const imgElement = document.getElementById('imagen-nasa');
    
    // Manejar si el contenido es un video.
    if (datos.media_type === 'image') {
      imgElement.src = datos.url;
    } else {
      imgElement.alt = "El contenido de hoy es un video: " + datos.url;
    }

  } catch (error) {
    console.error("Hubo un error al consultar la API:", error);
  }
}

// Ejecutar la función
obtenerFotoNasa();


//footer 
function cargarNASA() {
    const url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
 
    fetch(url)
        .then(res => res.json())
        .then(data => {
 
            const img = document.getElementById("nasa-img");
            const title = document.getElementById("nasa-title");
 
            if (data.media_type === "video") {
                img.src = "https://via.placeholder.com/200x150?text=NASA+Video";
                title.textContent = data.title + " (Video)";
                return;
            }
 
            img.src = data.url;
            title.textContent = data.title;
 
            document.body.style.backgroundImage = `url(${data.url})`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
 
            const image = new Image();
            image.crossOrigin = "Anonymous";
            image.src = data.url;
 
            image.onload = function () {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
 
                canvas.width = image.width;
                canvas.height = image.height;
 
                ctx.drawImage(image, 0, 0);
 
                const pixel = ctx.getImageData(50, 50, 1, 1).data;
                const pixel2 = ctx.getImageData(200, 200, 1, 1).data;
 
                const color1 = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, 0.8)`;
                const color2 = `rgba(${pixel2[0]}, ${pixel2[1]}, ${pixel2[2]}, 0.8)`;
 
                document.querySelector(".footer").style.setProperty("--color1", color1);
                document.querySelector(".footer").style.setProperty("--color2", color2);
            };
 
            document.body.style.filter = "brightness(0.75)";
 
        })
        .catch(err => console.log("Error NASA:", err));
}
 
cargarNASA();
 
function animarFooter() {
    const footer = document.querySelector(".footer");
    const trigger = window.innerHeight * 0.85;
 
    const top = footer.getBoundingClientRect().top;
 
    if (top < trigger) {
        footer.classList.add("visible");
    }
}
 
window.addEventListener("scroll", animarFooter);
window.addEventListener("load", animarFooter);
