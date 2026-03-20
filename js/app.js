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
    ['home', 'sitters', 'foundations', 'auth', 'dashboard', 'faq', 'about', 'servicios', 'contact'].forEach(id => {
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

// Datos de cuidadores (permite filtro por comuna)
const sitters = [
    { name: 'Ana G.', service: 'Cuidado en casa', size: 'Pequeño', comuna: 'Ñuñoa', price: 18, description: 'Amante de los gatos y expertos en medicación.' },
    { name: 'Carlos M.', service: 'Paseo', size: 'Mediano', comuna: 'Providencia', price: 20, description: 'Paseos largos y entrenamiento básico.' },
    { name: 'María P.', service: 'Veterinario', size: 'Grande', comuna: 'Las Condes', price: 22, description: 'Asistencia en visitas veterinarias y cuidados especiales.' },
    { name: 'Javier R.', service: 'Paseo', size: 'Grande', comuna: 'Santiago', price: 17, description: 'Rutinas de ejercicio y socialización.' },
    { name: 'Claudia V.', service: 'Cuidado en casa', size: 'Pequeño', comuna: 'La Florida', price: 19, description: 'Con experiencia en cachorros y gatitos.' },
    { name: 'Felipe T.', service: 'Veterinario', size: 'Mediano', comuna: 'Maipú', price: 21, description: 'Soporte técnico y seguimiento médico diario.' }
];

function renderSitters() {
    const grid = document.getElementById('sitters-grid');
    if (!grid) return;

    const service = document.getElementById('filter-service')?.value || 'all';
    const size = document.getElementById('filter-size')?.value || 'all';
    const comuna = document.getElementById('filter-comuna')?.value || 'all';

    const filtered = sitters.filter(sitter => {
        const serviceMatch = service === 'all' || sitter.service === service;
        const sizeMatch = size === 'all' || sitter.size === size;
        const comunaMatch = comuna === 'all' || sitter.comuna === comuna;
        return serviceMatch && sizeMatch && comunaMatch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="font-size: 1rem; color: #555;">No se encontraron cuidadores con esos filtros.</p>';
        return;
    }

    grid.innerHTML = filtered.map((sitter, i) => `
        <div class="plush-card" style="animation-delay:${i * 0.05}s;">
            <img src="https://image.qwenlm.ai/public_source/95de1b57-21f3-454f-82dc-cae74063b684/1a6ec3814-bed0-43ae-9222-9a378243ab02.png" class="card-img" style="filter: hue-rotate(${(i + 1) * 40}deg);" alt="${sitter.name}">
            <div class="card-meta">
                <h3>${sitter.name}</h3>
                <span class="price-tag">$${sitter.price}/h</span>
            </div>
            <p style="opacity: 0.7; font-size: 0.9rem;">${sitter.description}</p>
            <p style="font-size: 0.85rem; margin-top: 0.4rem;">Servicio: ${sitter.service} • Tamaño: ${sitter.size} • Comuna: ${sitter.comuna}</p>
            <button class="btn-plump btn-secondary" style="width: 100%; margin-top: auto;" onclick="openBooking('${sitter.name}')">Reservar</button>
        </div>
    `).join('');
}

const filterButton = document.getElementById('btn-filter-sitters');
if (filterButton) {
    filterButton.addEventListener('click', renderSitters);
}

// Asegurar renderizado cuando se navega a la vista de cuidadores
const originalRouter = router;
router = function(viewId) {
    originalRouter(viewId);
    if (viewId === 'sitters') {
        renderSitters();
    }
};

// Initialize
router('home');

function submitContactForm() {
    const reason = document.getElementById('contact-reason').value;
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!reason) {
        alert('Por favor, selecciona el motivo de contacto.');
        return;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        alert('Por favor, ingresa un correo válido.');
        return;
    }
    if (!message) {
        alert('Por favor, ingresa tu mensaje o información.');
        return;
    }

    // Simulación de envío.
    alert('¡Mensaje enviado! Nos comunicaremos contigo pronto.');

    document.getElementById('contact-reason').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-message').value = '';
}

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
