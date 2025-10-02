document.addEventListener('DOMContentLoaded', () => {
    const can = document.getElementById('product-can');
    const tachoImg = document.getElementById('tacho-img'); 
    const productDisplay = document.getElementById('product-display');
    
    // NOTA: section2 es la de 'Sostenibilidad', section3 es 'Tu Recarga Diaria/Galería', section4 es 'Da Vida a Tu Lata/Pasos'
    const section2 = document.getElementById('section-2'); 
    const section3 = document.getElementById('section-3'); 
    const section4 = document.getElementById('section-4'); 
    
    // Elementos del botón desplegable (Sección 1)
    const toggleButton = document.getElementById('toggle-button');
    const gearIcon = document.querySelector('.gear-icon');
    const collapsibleContent = document.querySelector('.collapsible-content');

    // Elementos de los nuevos botones desplegables (Sección 2)
    const toggleInfoLeft = document.getElementById('toggle-info-left');
    const contentInfoLeft = document.querySelector('.info-content-left');
    const gearInfoLeft = toggleInfoLeft.querySelector('.info-gear');
    
    const toggleInfoRight = document.getElementById('toggle-info-right');
    const contentInfoRight = document.querySelector('.info-content-right');
    const gearInfoRight = toggleInfoRight.querySelector('.info-gear');


    // Función de ayuda para obtener la posición de un elemento en el viewport
    const getViewportTop = (element) => element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // --- Lógica del Botón Desplegable GENERAL (Secciones 1 y 2) ---
    const setupCollapsible = (button, content, gear) => {
        button.addEventListener('click', () => {
            content.classList.toggle('show');
            if (gear) {
                gear.classList.toggle('gear-rotated');
            }
        });
    };
    
    // Inicializar botones de S1 y S2
    setupCollapsible(toggleButton, collapsibleContent, gearIcon);
    setupCollapsible(toggleInfoLeft, contentInfoLeft, gearInfoLeft);
    setupCollapsible(toggleInfoRight, contentInfoRight, gearInfoRight);


    // --- Lógica del Botón Desplegable con forma de LATA (Sección 4) ---
    const canButtons = document.querySelectorAll('#section-4 .can-button');

    canButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSelector = button.getAttribute('data-target');
            const content = document.querySelector(targetSelector);
            
            const parentCard = button.closest('.recycling-card');

            // Cierra todos los contenidos DE ESE CARD en S4, EXCEPTO el que se va a abrir/cerrar
            parentCard.querySelectorAll('.can-collapsible-content').forEach(c => {
                if (c !== content) {
                    c.classList.remove('show');
                }
            });

            // Abre/Cierra el contenido objetivo
            content.classList.toggle('show');
        });
    });

    // --- FUNCIÓN: Mostrar detalles de reciclaje (S3 -> S4) ---
    window.showRecyclingDetails = (productName) => {
        // 1. Ocultar todos los detalles de reciclaje (cards)
        document.querySelectorAll('#section-4 .recycling-card').forEach(card => {
            card.style.display = 'none';
        });

        // 2. Mostrar solo el card del producto seleccionado
        const targetCard = document.getElementById(`details-${productName}`);
        if (targetCard) {
            targetCard.style.display = 'block';
        }
        
        // 3. Cerrar CUALQUIER contenido desplegable abierto en S4
        document.querySelectorAll('#section-4 .can-collapsible-content.show').forEach(content => {
            content.classList.remove('show');
        });

        // 4. Muestra automáticamente los pasos al hacer clic en la imagen
        const defaultContent = document.getElementById(`pasos-${productName}`);
        if (defaultContent) {
            defaultContent.classList.add('show');
        }

        // 5. Desplazarse a la sección 4
        section4.scrollIntoView({ behavior: 'smooth' });
    };

    // --- Lógica del Scroll (Animación de la lata - SOLO ESCRITORIO) ---
    function handleScroll() {
        
        // Si es móvil, salir de la función (el CSS la oculta)
        if (window.matchMedia("(max-width: 768px)").matches) {
            return; 
        }

        const sec2_top = getViewportTop(section2);
        const sec3_top = getViewportTop(section3);
        
        // Aseguramos que el tacho esté oculto por defecto
        tachoImg.classList.remove('show-tacho'); 

        // --- Estado 1: Sección 1 (Concentrado Perfecto) ---
        if (sec2_top > windowHeight * 0.5) { 
            can.style.opacity = '1'; // Mostrar suavemente
            can.style.top = '55vh'; 
            can.style.left = '70vw'; 
            can.style.transform = 'scale(1) rotateY(10deg)';
        } 
        
        // --- Estado 2: Sección 2 (Sostenibilidad / Tacho) ---
        else if (sec3_top > windowHeight * 0.5) { 
            can.style.opacity = '1'; // Asegurar que esté visible
            // Posición de la lata sobre el tacho 
            can.style.top = '28vh'; 
            can.style.left = '46%'; 
            can.style.transform = 'translate(-50%, 0) scale(1) rotate(0deg)'; 
            
            tachoImg.classList.add('show-tacho');
        } 
        
        // --- Estado 3/4: Sección 3 (Galería) y Sección 4 (Da Vida a Tu Lata / Pasos) ---
        else {
            // ¡AJUSTE CLAVE! Ocultar la lata suavemente usando opacidad
            can.style.opacity = '0'; 
            tachoImg.classList.remove('show-tacho');
        }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); 
    handleScroll(); // Ejecutar al inicio para establecer la posición
});