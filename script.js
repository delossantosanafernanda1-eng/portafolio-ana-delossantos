document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // 1. Helper para actualizar el icono
    function updateToggleIcon(isDark) {
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-sun', isDark);
        icon.classList.toggle('fa-moon', !isDark);
    }

    // 2. Persistencia y Preferencia del Sistema
    const isLocalStorageDark = localStorage.getItem('darkMode') === 'true';
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Aplicar estado inicial
    const initialDark = (isLocalStorageDark || (!localStorage.getItem('darkMode') && prefersDark));

    if (initialDark) {
        body.classList.add('dark');
    }
    updateToggleIcon(initialDark);

    // 3. Toggle del Modo Oscuro al hacer clic
    darkModeToggle.addEventListener('click', () => {
        const isDark = !body.classList.contains('dark');
        body.classList.toggle('dark', isDark);
        localStorage.setItem('darkMode', isDark);
        updateToggleIcon(isDark);
    });

    // 4. Smooth Scroll para Navbar Links
    document.querySelectorAll('.navbar-nav .nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // Compensación para el navbar fijo
                    window.scrollTo({
                        top: targetElement.offsetTop - 56, 
                        behavior: 'smooth'
                    });
                } else if (targetId === 'page-top') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }
        });
    });

    // 5. Simulación de Formulario de Contacto
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Mensaje enviado! Gracias por tu interés, te responderé pronto. 📧');
        contactForm.reset();
    });
});