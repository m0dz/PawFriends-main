// --- MOBILE MENU TOGGLE ---
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    const toggle = document.querySelector('.menu-toggle');
    
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
    
    // Bloquea el scroll solo si el menú móvil está abierto
    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// --- ROUTING ---
function router(viewId) {
    ['home', 'sitters', 'foundations', 'auth', 'dashboard', 'faq', 'about','servicios'].forEach(id => {
        const el = document.getElementById('view-' + id);
        if (el) el.classList.add('hidden');
    });

    const selected = document.getElementById('view-' + viewId);
    if (selected) {
        selected.classList.remove('hidden');
        window.scrollTo(0, 0);
    }

    // SOLUCIÓN: Solo cerrar el menú si está abierto, no hacer "toggle" siempre
    const menu = document.getElementById('navMenu');
    const toggle = document.querySelector('.menu-toggle');
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
        document.body.style.overflow = ''; // Devuelve el scroll
    }
}

// --- AUTH TABS ---
function switchAuthTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    ['login', 'user-reg', 'sitter-reg'].forEach(f => {
        document.getElementById('form-' + f).classList.add('hidden');
    });
    document.getElementById('form-' + tabName).classList.remove('hidden');
}

// --- MODALS ---
function openBooking(name) {
    document.getElementById('modal-sitter-name').innerText = "Con: " + name;
    document.getElementById('booking-modal').classList.add('active');
}

function closeBooking() {
    document.getElementById('booking-modal').classList.remove('active');
}

function openTermsModal() {
    event.preventDefault();
    document.getElementById('terms-modal').classList.add('active');
}

function closeTermsModal() {
    document.getElementById('terms-modal').classList.remove('active');
}

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.classList.remove('active');
        }
    });
});

// Initialize
router('home');


function toggleFaq(button) {
    const item = button.parentElement;
    item.classList.toggle('active');
}


// Función para cambiar entre pestañas de Tutores/Cuidadores
function switchFaqTab(tab) {
    // Botones
    document.querySelectorAll('.faq-tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Paneles
    document.getElementById('faq-tutores').classList.add('hidden');
    document.getElementById('faq-cuidadores').classList.add('hidden');
    
    document.getElementById('faq-' + tab).classList.remove('hidden');
}

// Función para abrir las preguntas individuales
function toggleFaq(btn) {
    const item = btn.parentElement;
    item.classList.toggle('active');
}
