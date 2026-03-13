// --- MOBILE MENU TOGGLE ---
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    const toggle = document.querySelector('.menu-toggle');
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
}

// --- ROUTING ---
function router(viewId) {
    ['home', 'sitters', 'foundations', 'auth', 'dashboard'].forEach(id => {
        const el = document.getElementById('view-' + id);
        if (el) el.classList.add('hidden');
    });
    const selected = document.getElementById('view-' + viewId);
    if (selected) {
        selected.classList.remove('hidden');
        window.scrollTo(0, 0);
    }
    // Close mobile menu on navigation
    toggleMenu();
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