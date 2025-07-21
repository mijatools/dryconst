
document.addEventListener('DOMContentLoaded', function() {
  // Corrige los dropdowns en móviles
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        e.stopPropagation();
        
        // Cierra otros dropdowns
        dropdownToggles.forEach(otherToggle => {
          if (otherToggle !== toggle && otherToggle.parentElement.classList.contains('show')) {
            otherToggle.parentElement.classList.remove('show');
            const otherMenu = otherToggle.nextElementSibling;
            if (otherMenu) otherMenu.classList.remove('show');
          }
        });
        
        // Toggle el dropdown actual
        const parent = this.parentElement;
        const menu = this.nextElementSibling;
        
        parent.classList.toggle('show');
        if (menu) menu.classList.toggle('show');
      }
    });
  });
  
  // Cierra el menú al hacer clic en un item del dropdown
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth < 992) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          document.querySelector('.navbar-toggler').click();
        }
      }
    });
  });
});






//AHORA ABIRMOS EL SCRIPT DEL CAROUSEL

document.addEventListener('DOMContentLoaded', function() {
    // Obtener el carrusel
    var carousel = document.getElementById('carouselExample');
    
    // Variables para detectar el dispositivo
    var isMobile = window.matchMedia("(max-width: 767px)").matches;
    var touchDevice = ('ontouchstart' in document.documentElement);
    
    // Inicializar carrusel de manera segura
    function initCarousel() {
        try {
            // Precarga de imágenes para rendimiento
            let images = carousel.querySelectorAll('img');
            images.forEach(img => {
                if (img.complete) {
                    img.classList.add('loaded');
                } else {
                    img.addEventListener('load', function() {
                        this.classList.add('loaded');
                    });
                }
            });
            
            // Obtener instancia del carrusel
            var carouselInstance = mdb.Carousel.getInstance(carousel);
            if (!carouselInstance) {
                // Si no existe, inicializar con opciones
                carouselInstance = new mdb.Carousel(carousel, {
                    interval: 10000, // Cambiado a 10 segundos (10000ms)
                    pause: 'hover',
                    touch: true
                });
            }
            return carouselInstance;
        } catch (e) {
            console.warn('Error al inicializar carrusel:', e);
            return null;
        }
    }
    
    // Inicializar
    var carouselInstance = initCarousel();
    
    // Manejo de hover en escritorio
    if (!touchDevice) {
        carousel.addEventListener('mouseenter', function() {
            var carouselInstance = mdb.Carousel.getInstance(carousel);
            if (carouselInstance) {
                carouselInstance.pause();
            }
        });
        
        carousel.addEventListener('mouseleave', function() {
            var carouselInstance = mdb.Carousel.getInstance(carousel);
            if (carouselInstance) {
                carouselInstance.cycle();
            }
        });
    }
    
    // Manejo mejorado para dispositivos táctiles
    if (touchDevice) {
        // Variables para detectar el toque
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        let touchThreshold = 50; // Umbral para detectar deslizamiento
        let touchTimeStart = 0;
        let touchTimeEnd = 0;
        
        carousel.addEventListener('touchstart', function(e) {
            // Pausar el carrusel al tocar
            var carouselInstance = mdb.Carousel.getInstance(carousel);
            if (carouselInstance) {
                carouselInstance.pause();
            }
            
            // Guardar posición inicial y tiempo
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            touchTimeStart = new Date().getTime();
            
            // Efecto visual de toque
            let currentSlide = carousel.querySelector('.carousel-item.active');
            if (currentSlide) {
                currentSlide.classList.add('touch-active');
            }
        }, { passive: true });
        
        carousel.addEventListener('touchend', function(e) {
            // Obtener posición final y tiempo
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            touchTimeEnd = new Date().getTime();
            
            // Quitar efecto visual
            let currentSlide = carousel.querySelector('.carousel-item.active');
            if (currentSlide) {
                currentSlide.classList.remove('touch-active');
            }
            
            // Calcular distancia y tiempo
            let xDiff = touchEndX - touchStartX;
            let yDiff = touchEndY - touchStartY;
            let timeDiff = touchTimeEnd - touchTimeStart;
            
            // Si solo fue un toque simple (no deslizamiento)
            if (Math.abs(xDiff) < touchThreshold && Math.abs(yDiff) < touchThreshold && timeDiff < 300) {
                // Mantener pausado brevemente para ver la imagen
                setTimeout(function() {
                    var carouselInstance = mdb.Carousel.getInstance(carousel);
                    if (carouselInstance) {
                        carouselInstance.cycle();
                    }
                }, 3000); // Pausar 3 segundos tras un toque
            } else {
                // Si fue un deslizamiento, reanudar pronto
                setTimeout(function() {
                    var carouselInstance = mdb.Carousel.getInstance(carousel);
                    if (carouselInstance) {
                        carouselInstance.cycle();
                    }
                }, 1000);
            }
        }, { passive: true });
    }
    
    // Función para ajustar el carrusel en cambios de orientación
    function handleOrientationChange() {
        // Recalcular si es móvil
        isMobile = window.matchMedia("(max-width: 767px)").matches;
        
        // Reiniciar carousel para aplicar nuevos estilos
        var carouselInstance = mdb.Carousel.getInstance(carousel);
        if (carouselInstance) {
            carouselInstance.dispose();
        }
        
        // Pequeña pausa para permitir cambios de CSS
        setTimeout(function() {
            initCarousel();
        }, 200);
    }
    
    // Detectar cambios de orientación
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', function() {
        // Usar debounce para evitar llamadas excesivas
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(handleOrientationChange, 250);
    });
});




    // Inicializar el carousel con 10 segundos de intervalo
    document.addEventListener('DOMContentLoaded', function() {
        const myCarousel = document.getElementById('carouselExample');
        const carousel = new mdb.Carousel(myCarousel, {
            interval: 10000, // 10 segundos
            touch: true
        });
    });
