/**
 * IT SOLUTION & CREATIVE HUB - SCRIPT JS
 * Features:
 * - Dynamic product rendering (ATK & Makanan/Minuman)
 * - Service category tab filtering (All, Jasa Online, Menyediakan Jasa)
 * - Live search & filter for ATK and F&B
 * - Cart drawer & calculation with direct WhatsApp checkout
 * - Universal order modal with auto-prefill
 * - Documentation gallery with interactive lightbox
 * - Copy address button to clipboard
 * - IntersectionObserver active nav link highlight
 * - Mobile responsive drawer menu
 * - Toast notification system
 */

/* ==========================================================================
   1. MASTER DATASETS (Declared at top to avoid Temporal Dead Zone)
   ========================================================================== */

// Data Katalog ATK
const atkCatalog = [
    {
        id: 'atk-1',
        title: 'Kertas HVS A4 75gsm (Rim)',
        category: 'kertas',
        categoryLabel: 'Kertas & Buku',
        price: 48000,
        desc: 'Kertas putih bersih PaperOne/Sinar Dunia 500 lembar. Ideal untuk print tugas & skripsi.',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'atk-2',
        title: 'Kertas Folio F4 70gsm (Rim)',
        category: 'kertas',
        categoryLabel: 'Kertas & Buku',
        price: 52000,
        desc: 'Ukuran F4 cocok untuk dokumen legalitas, surat resmi perkantoran, dan instansi.',
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'atk-3',
        title: 'Buku Tulis Spiral Aesthetic B5',
        category: 'kertas',
        categoryLabel: 'Kertas & Buku',
        price: 15000,
        desc: 'Kertas tebal tidak tembus tinta, jilid ring spiral fleksibel untuk catatan kuliah/kantor.',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'atk-4',
        title: 'Gel Pen Smooth 0.5mm (Pack)',
        category: 'alat-tulis',
        categoryLabel: 'Alat Tulis',
        price: 18000,
        desc: '1 pack isi 6 pcs tinta hitam pekat, ujung needle tip anti macet dan cepat kering.',
        image: 'https://images.unsplash.com/photo-1585336261026-7f884d5d36e7?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'atk-5',
        title: 'Spidol Whiteboard Snowman',
        category: 'alat-tulis',
        categoryLabel: 'Alat Tulis',
        price: 9000,
        desc: 'Spidol papan tulis mudah dihapus, warna hitam pekat dan bisa diisi ulang.',
        image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'atk-6',
        title: 'Binder Kulit B5 Multi-ring',
        category: 'arsip',
        categoryLabel: 'Arsip & Organisasi',
        price: 35000,
        desc: 'Cover kulit sintetis tahan air dengan 26 ring besi kuat, termasuk pembatas index warna.',
        image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'atk-7',
        title: 'Expanding File Folder 12 Pocket',
        category: 'arsip',
        categoryLabel: 'Arsip & Organisasi',
        price: 25000,
        desc: 'Map organizer dokumen banyak sekat untuk menyimpan berkas penting, rapi dan anti tercecer.',
        image: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'atk-8',
        title: 'Flashdisk 32GB High Speed USB 3.0',
        category: 'aksesoris',
        categoryLabel: 'Aksesoris Komputer',
        price: 65000,
        desc: 'Original SanDisk / Kingston garansi resmi. Transfer data tugas, video, dan software super cepat.',
        image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'atk-9',
        title: 'Mouse Wireless Silent Click',
        category: 'aksesoris',
        categoryLabel: 'Aksesoris Komputer',
        price: 55000,
        desc: 'Klik sunyi tanpa berisik di perpustakaan/ruang kerja. Ergonomis dan baterai tahan lama.',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'atk-10',
        title: 'Correction Tape Joyko (Tipe-X)',
        category: 'alat-tulis',
        categoryLabel: 'Alat Tulis',
        price: 7000,
        desc: 'Pita koreksi kertas panjang 12 meter, langsung kering dan bisa ditulis seketika.',
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80'
    }
];

// Data Menu Makanan & Minuman
const fnbCatalog = [
    {
        id: 'fnb-1',
        title: 'Kopi Susu Gula Aren Spesial',
        category: 'kopi',
        price: 15000,
        badge: 'Best Seller',
        desc: 'Espresso robusta & arabika lokal dipadu susu segar creamy dan gula aren murni khas Kalsel.',
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'fnb-2',
        title: 'Cold Brew Coffee Americano',
        category: 'kopi',
        price: 14000,
        badge: 'Segar & Strong',
        desc: 'Ekstraksi dingin 12 jam menghasilkan kopi hitam kaya rasa, lembut dan minim rasa asam.',
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'fnb-3',
        title: 'Signature Matcha Latte Ice',
        category: 'non-kopi',
        price: 18000,
        badge: 'Favorit',
        desc: 'Bubuk green tea matcha premium berpadu susu segar dingin, nikmat dan menenangkan pikiran.',
        image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'fnb-4',
        title: 'Ice Lemon Tea Segar',
        category: 'non-kopi',
        price: 10000,
        badge: 'Pelepas Dahaga',
        desc: 'Teh melati wangi dengan perasan buah lemon asli dan daun mint segar. Sangat cocok saat siang hari.',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'fnb-5',
        title: 'Roti Bakar Coklat Keju Lumer',
        category: 'makanan',
        price: 14000,
        badge: 'Cemilan Hangat',
        desc: 'Roti gandum tebal panggang renyah isi selai coklat melimpah dan taburan keju cheddar parut gurih.',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'fnb-6',
        title: 'Mie Instan Spesial (Telur + Sawi)',
        category: 'makanan',
        price: 15000,
        badge: 'Mengenyangkan',
        desc: 'Indomie goreng / rebus komplit dengan topping telur setengah matang/matang, sawi hijau, dan cabai rawit.',
        image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'fnb-7',
        title: 'Kentang Goreng Crispy Shake',
        category: 'makanan',
        price: 12000,
        badge: 'Camilan Favorit',
        desc: 'French fries renyah keemasan dengan taburan bumbu barbeque/balado/jagung manis gurih.',
        image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'fnb-8',
        title: 'Cireng Salju Bumbu Rujak Pedas',
        category: 'makanan',
        price: 12000,
        badge: 'Crispy & Chewy',
        desc: 'Cireng renyah di luar dan kenyal di dalam, disajikan dengan saus cocolan gula merah pedas manis.',
        image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80'
    }
];

// Data Dokumentasi & Portofolio
const docGallery = [
    {
        id: 'doc-1',
        title: 'Pengembangan Web Portfolio & UMKM',
        category: 'it',
        categoryLabel: 'Proyek IT & Desain',
        desc: 'Proses coding dan uji responsif halaman web modern di berbagai resolusi layar perangkat.',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 'doc-2',
        title: 'Desain Grafis Poster & Konten Kreatif',
        category: 'it',
        categoryLabel: 'Proyek IT & Desain',
        desc: 'Pembuatan visual kreatif untuk materi promosi bisnis dan event perguruan tinggi di Banjarmasin.',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 'doc-3',
        title: 'Troubleshooting & Servis Laptop Pelanggan',
        category: 'servis',
        categoryLabel: 'Servis & Hardware',
        desc: 'Diagnosa mendalam hardware, pembersihan debu motherboard, dan penggantian thermal paste kualitas tinggi.',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 'doc-4',
        title: 'Instalasi Bersih OS Windows & Driver',
        category: 'servis',
        categoryLabel: 'Servis & Hardware',
        desc: 'Pemasangan OS Windows orisinil bebas virus lengkap dengan paket aplikasi Microsoft Office aktif.',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 'doc-5',
        title: 'Pencetakan Dokumen Skripsi & Jilid Spiral',
        category: 'outlet',
        categoryLabel: 'Suasana Toko & Print',
        desc: 'Layanan print laser warna tajam dan penjilidan rapi presisi untuk mahasiswa tingkat akhir.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 'doc-6',
        title: 'Area Santai Sembari Menunggu Layanan Selesai',
        category: 'outlet',
        categoryLabel: 'Suasana Toko & Print',
        desc: 'Ruang tunggu adem dengan colokan listrik, koneksi WiFi kencang, dan aneka kopi serta cemilan lezat.',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80'
    }
];

// Keranjang belanja
let cart = [];

/* ==========================================================================
   2. APP INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initServiceFilters();
    renderATKProducts(atkCatalog);
    renderFnBItems('all');
    renderDocumentation('all');
    initCartSystem();
    initSearchAndPills();
});

/* ==========================================================================
   3. NAVIGATION & SCROLL BEHAVIOR
   ========================================================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links .nav-item');

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Active state on scroll using IntersectionObserver
    const sections = document.querySelectorAll('section[id]');
    if ('IntersectionObserver' in window && sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(link => {
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => sectionObserver.observe(section));
    }
}

/* ==========================================================================
   4. IT SOLUTION SERVICE FILTERING
   ========================================================================== */
function initServiceFilters() {
    const tabButtons = document.querySelectorAll('.service-tabs .tab-btn');
    const serviceCards = document.querySelectorAll('.services-grid .service-card');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetCategory = btn.getAttribute('data-service-target');

            serviceCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (targetCategory === 'all' || cardCat === targetCategory) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function filterServices(category) {
    const targetBtn = document.querySelector(`.service-tabs .tab-btn[data-service-target="${category}"]`);
    if (targetBtn) {
        targetBtn.click();
    }
}

/* ==========================================================================
   5. ATK DATA & DYNAMIC RENDERING
   ========================================================================== */
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
}

function renderATKProducts(items) {
    const productList = items || atkCatalog;
    const grid = document.getElementById('atkProductsGrid');
    if (!grid) return;

    if (productList.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
                <i class="fa-solid fa-box-open" style="font-size: 2.5rem; margin-bottom: 0.8rem; color: var(--bright-blue);"></i>
                <p>Tidak ada barang ATK yang cocok dengan pencarian Anda.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = productList.map(item => `
        <div class="product-card">
            <div class="product-thumb">
                <span class="product-badge-cat">${item.categoryLabel}</span>
                <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80'">
            </div>
            <div class="product-info">
                <h4 class="product-title">${item.title}</h4>
                <p class="product-desc">${item.desc}</p>
                <div class="product-bottom">
                    <span class="product-price">${formatRupiah(item.price)}</span>
                    <button class="btn-add-cart" onclick="addToCart('${item.id}', '${item.title.replace(/'/g, "\\'")}', ${item.price}, 'ATK')">
                        <i class="fa-solid fa-cart-plus"></i> + Keranjang
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   6. MAKANAN & MINUMAN DATA & DYNAMIC RENDERING
   ========================================================================== */
function renderFnBItems(category = 'all') {
    const grid = document.getElementById('fnbGrid');
    if (!grid) return;

    const filtered = (category === 'all') ? fnbCatalog : fnbCatalog.filter(item => item.category === category);

    grid.innerHTML = filtered.map(item => `
        <div class="fnb-card">
            <div class="fnb-thumb">
                <span class="fnb-tag">${item.badge}</span>
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="fnb-info">
                <h4 class="fnb-title">${item.title}</h4>
                <p class="fnb-desc">${item.desc}</p>
                <div class="fnb-bottom">
                    <span class="fnb-price">${formatRupiah(item.price)}</span>
                    <button class="btn-add-cart" onclick="addToCart('${item.id}', '${item.title.replace(/'/g, "\\'")}', ${item.price}, 'Kuliner')">
                        <i class="fa-solid fa-plus"></i> Pesan
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   7. DOKUMENTASI & LIGHTBOX
   ========================================================================== */
function renderDocumentation(filter = 'all') {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    const filtered = (filter === 'all') ? docGallery : docGallery.filter(item => item.category === filter);

    grid.innerHTML = filtered.map(item => `
        <div class="gallery-item" onclick="openLightbox('${item.image}', '${item.title.replace(/'/g, "\\'")}', '${item.desc.replace(/'/g, "\\'")}')">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-overlay">
                <span class="gallery-tag">${item.categoryLabel}</span>
                <h4 class="gallery-title">${item.title}</h4>
                <span class="gallery-view-btn"><i class="fa-solid fa-expand"></i> Perbesar Foto</span>
            </div>
        </div>
    `).join('');
}

function openLightbox(imgSrc, title, desc) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    if (modal && img && caption) {
        img.src = imgSrc;
        caption.innerHTML = `<h4>${title}</h4><p>${desc}</p>`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox(event) {
    if (event && event.target && event.target.tagName === 'IMG') {
        return;
    }
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
        closeOrderModal();
        closeCart();
    }
});

/* ==========================================================================
   8. SEARCH & FILTER PILLS LOGIC
   ========================================================================== */
function initSearchAndPills() {
    // ATK Filter Pills
    const atkPills = document.querySelectorAll('#atkFilterPills .pill-btn');
    atkPills.forEach(pill => {
        pill.addEventListener('click', () => {
            atkPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            applyATKFilters();
        });
    });

    // ATK Search input
    const atkSearchInput = document.getElementById('atkSearchInput');
    if (atkSearchInput) {
        atkSearchInput.addEventListener('input', () => {
            applyATKFilters();
        });
    }

    // F&B Category Tabs
    const fnbPills = document.querySelectorAll('.fnb-tabs .pill-btn');
    fnbPills.forEach(pill => {
        pill.addEventListener('click', () => {
            fnbPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const category = pill.getAttribute('data-fnb-category');
            renderFnBItems(category);
        });
    });

    // Documentation Category Tabs
    const docPills = document.querySelectorAll('.doc-filter .pill-btn');
    docPills.forEach(pill => {
        pill.addEventListener('click', () => {
            docPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const category = pill.getAttribute('data-doc-filter');
            renderDocumentation(category);
        });
    });
}

function applyATKFilters() {
    const activePill = document.querySelector('#atkFilterPills .pill-btn.active');
    const selectedCategory = activePill ? activePill.getAttribute('data-atk-category') : 'all';
    const searchInput = document.getElementById('atkSearchInput');
    const searchQuery = (searchInput?.value || '').toLowerCase().trim();

    let filtered = atkCatalog;

    if (selectedCategory !== 'all') {
        filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchQuery !== '') {
        filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(searchQuery) || 
            item.desc.toLowerCase().includes(searchQuery)
        );
    }

    renderATKProducts(filtered);
}

/* ==========================================================================
   9. SHOPPING CART SYSTEM
   ========================================================================== */
function initCartSystem() {
    const openCartBtn = document.getElementById('openCartBtn');
    const cartOverlay = document.getElementById('cartOverlay');

    if (openCartBtn) {
        openCartBtn.addEventListener('click', openCart);
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    updateCartUI();
}

function openCart() {
    document.getElementById('cartDrawer')?.classList.add('active');
    document.getElementById('cartOverlay')?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartDrawer')?.classList.remove('active');
    document.getElementById('cartOverlay')?.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function addToCart(id, title, price, group) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id, title, price, group, qty: 1 });
    }
    updateCartUI();
    showToast(`"${title}" berhasil dimasukkan ke keranjang!`);
}

function updateCartQty(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += change;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
}

function clearCart() {
    if (cart.length === 0) return;
    if (confirm('Apakah Anda yakin ingin mengosongkan keranjang belanja?')) {
        cart = [];
        updateCartUI();
        showToast('Keranjang telah dikosongkan.');
    }
}

function updateCartUI() {
    const countBadge = document.getElementById('cartCount');
    const itemsList = document.getElementById('cartItemsList');
    const totalEl = document.getElementById('cartTotalPrice');

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (countBadge) countBadge.textContent = totalQty;
    if (totalEl) totalEl.textContent = formatRupiah(totalPrice);

    if (!itemsList) return;

    if (cart.length === 0) {
        itemsList.innerHTML = `
            <div class="empty-cart-state">
                <i class="fa-solid fa-cart-arrow-down"></i>
                <p>Keranjang masih kosong.</p>
                <small>Silakan pilih barang ATK atau Makanan & Minuman di atas.</small>
            </div>
        `;
        return;
    }

    itemsList.innerHTML = cart.map(item => `
        <div class="cart-item-row">
            <div class="cart-item-details">
                <strong>${item.title}</strong>
                <span>${formatRupiah(item.price)} x ${item.qty} = ${formatRupiah(item.price * item.qty)}</span>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)" title="Kurangi">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)" title="Tambah">+</button>
            </div>
        </div>
    `).join('');
}

function checkoutCartWhatsApp() {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda masih kosong!');
        return;
    }

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    let itemsText = cart.map((item, idx) => `${idx + 1}. ${item.title} (${item.qty}x) - ${formatRupiah(item.price * item.qty)}`).join('%0A');

    const message = `Halo IT Solution Banjarmasin,%0A%0ASaya ingin memesan barang dari keranjang belanja website:%0A%0A${itemsText}%0A%0A*Total Estimasi:* ${formatRupiah(totalPrice)}%0A%0AMohon info ketersediaan stok & proses pengambilannya di outlet Jl. Adhyaksa No.02. Terima kasih!`;

    const phone = '6285194148533';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

/* ==========================================================================
   10. ORDER / INQUIRY MODAL (SERVICES & CUSTOM ORDER)
   ========================================================================== */
function openOrderModal(serviceName = 'Konsultasi Layanan', category = 'IT Solution') {
    const modal = document.getElementById('orderModal');
    const titleEl = document.getElementById('modalServiceTitle');
    const nameInput = document.getElementById('orderItemName');
    const catInput = document.getElementById('orderItemCategory');

    if (modal) {
        titleEl.textContent = `Pesan: ${serviceName}`;
        nameInput.value = serviceName;
        catInput.value = category;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function handleOrderSubmit(event) {
    event.preventDefault();

    const serviceName = document.getElementById('orderItemName').value;
    const category = document.getElementById('orderItemCategory').value;
    const custName = document.getElementById('custName').value.trim();
    const custPhone = document.getElementById('custPhone').value.trim();
    const qty = document.getElementById('orderQty').value;
    const delivery = document.getElementById('orderDelivery').value;
    const notes = document.getElementById('custNotes').value.trim();

    if (!custName || !custPhone) {
        alert('Mohon lengkapi nama dan nomor WhatsApp Anda.');
        return;
    }

    const message = `Halo Tim IT Solution Banjarmasin,%0A%0ASaya ingin memesan layanan/produk:%0A- *Layanan/Produk:* ${serviceName} (${category})%0A- *Nama Pemesan:* ${custName}%0A- *Nomor WhatsApp:* ${custPhone}%0A- *Jumlah/Kuantitas:* ${qty}%0A- *Opsi Layanan:* ${delivery}%0A- *Detail/Catatan:* ${notes ? notes : '-' } %0A%0AMohon konfirmasi dan info langkah selanjutnya. Terima kasih!`;

    const phone = '6285194148533';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');

    closeOrderModal();
    showToast('Membuka WhatsApp untuk mengirim pesanan...');
}

/* ==========================================================================
   11. QUICK CONTACT FORM (LOKASI SECTION)
   ========================================================================== */
function handleQuickFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('qName').value.trim();
    const category = document.getElementById('qCategory').value;
    const messageText = document.getElementById('qMessage').value.trim();

    if (!name || !messageText) {
        alert('Silakan isi nama dan pesan Anda.');
        return;
    }

    const text = `Halo IT Solution Banjarmasin,%0A%0APesan Cepat dari Website:%0A- *Nama:* ${name}%0A- *Keperluan:* ${category}%0A- *Pesan:* ${messageText}%0A%0ATerima kasih!`;

    const phone = '6285194148533';
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');

    document.getElementById('quickContactForm').reset();
    showToast('Meneruskan pesan ke WhatsApp staf...');
}

/* ==========================================================================
   12. COPY ADDRESS TO CLIPBOARD
   ========================================================================== */
function copyAddress() {
    const address = "Banjarmasin, Jalan. Adhyaksa No.02, Sungai Miai, Kec. Banjarmasin Utara, Kalimantan Selatan k.pos 70123";
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(address).then(() => {
            handleCopySuccess();
        }).catch(() => {
            fallbackCopy(address);
        });
    } else {
        fallbackCopy(address);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        handleCopySuccess();
    } catch (err) {
        alert('Gagal menyalin alamat secara otomatis. Silakan salin manual.');
    }
    document.body.removeChild(textArea);
}

function handleCopySuccess() {
    const copyBtn = document.getElementById('copyAddressBtn');
    if (copyBtn) {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = `<i class="fa-solid fa-check"></i> Tersalin!`;
        copyBtn.style.borderColor = 'var(--accent-green)';
        copyBtn.style.color = 'var(--accent-green)';
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.borderColor = '';
            copyBtn.style.color = '';
        }, 2200);
    }
    showToast('Alamat berhasil disalin ke clipboard!');
}

/* ==========================================================================
   13. TOAST NOTIFICATION
   ========================================================================== */
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const msgEl = document.getElementById('toastMessage');

    if (toast && msgEl) {
        msgEl.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }
}
