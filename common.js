// ==========================================================================
// App Variables & Configuration
// ==========================================================================
const APP_VERSION = "v1.0.0";
const APP_NAME = "教室検索";

// Firebase Configuration (教室検索用)
const firebaseConfig = {
    apiKey: "AIzaSyCqkgeIwl2zZyubmtz8vuAtx6cRKTbmA_Y",
    authDomain: "qcda-classroom-search.firebaseapp.com",
    projectId: "qcda-classroom-search",
    storageBucket: "qcda-classroom-search.firebasestorage.app",
    messagingSenderId: "419748753086",
    appId: "1:419748753086:web:951d3e9097ff3e20beb8ef"
};

export let db = null;

// ==========================================================================
// App Initialization
// ==========================================================================
async function initApp() {
    initHeaderAndMenu(); // 安定版のリファレンスに基づくメニュー初期化
    initFooter();
    await initDatabase(); // Firebaseの動的インポートと初期化
}

// DOMの読み込み状態を判定して、安全に初期化関数を呼び出す
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// ==========================================================================
// Firebase Initialization (Dynamic Import)
// ==========================================================================
async function initDatabase() {
    try {
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js');
        const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js');
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        console.log("🔥 Firebase Firestore Initialize Success.");
        
        // dbの準備が完了したことを、他のモジュール(admin.htmlやsearch.html)に知らせる
        window.dispatchEvent(new CustomEvent('dbReady'));
    } catch (e) {
        console.error("Firebase initialization failed:", e);
    }
}

// ==========================================================================
// Header & Hamburger Menu Logic (Reference Based - 確実なDOM生成)
// ==========================================================================
function initHeaderAndMenu() {
    // 1. Header作成
    // 既存のヘッダーがあれば削除（多重生成防止）
    const existingHeader = document.querySelector('header');
    if (existingHeader) existingHeader.remove();

    const header = document.createElement('header');
    header.innerHTML = `<div class="header-title">${APP_NAME}</div>`;
    document.body.prepend(header);

    // 2. Hamburger Button
    const btn = document.createElement('button');
    btn.className = 'hamburger-btn';
    btn.setAttribute('aria-label', 'メニュー');
    btn.innerHTML = '<span></span><span></span><span></span>';
    
    const title = header.querySelector('.header-title');
    if (title) {
        title.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    header.appendChild(btn);

    // 3. Menu Overlay
    // 既存のものがあれば削除
    const oldOverlay = document.getElementById('menuOverlay');
    const oldBackdrop = document.getElementById('menuBackdrop');
    if (oldOverlay) oldOverlay.remove();
    if (oldBackdrop) oldBackdrop.remove();

    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    overlay.id = 'menuOverlay'; // 識別用ID
    
    const navUrls = {
        guide: 'guide.html',
        contact: 'https://docs.google.com/forms/d/e/1FAIpQLSdlvIr5ehyy3dInl_XTkA5F64H7yFIigL2dzFW0IoXnl8ajdw/viewform?usp=dialog',
        release: 'release-notes.html',
        about: 'https://qcda-dev.github.io/HP/',
        terms: 'https://qcda-dev.github.io/HP/terms-of-service.html',
        community: 'https://qcda-dev.github.io/HP/community-guidelines.html'
    };

    overlay.innerHTML = `
        <ul class="menu-list">
            <li><a href="${navUrls.guide}" target="_blank">使い方ガイド</a></li>
            <li><a href="${navUrls.contact}" target="_blank">お問い合わせ</a></li>
            <li class="menu-separator"><a href="${navUrls.release}" target="_blank"">リリースノート</a></li>
            
            <li><a href="${navUrls.about}" target="_blank">QcDa Projectとは</a></li>
            <li class="menu-sub-item"><a href="${navUrls.terms}" target="_blank">利用規約</a></li>
            <li class="menu-sub-item"><a href="${navUrls.community}" target="_blank">コミュニティガイドライン</a></li>
        </ul>
        <div class="menu-version">ver ${APP_VERSION}</div>
    `;

    // 4. Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    backdrop.id = 'menuBackdrop';

    document.body.appendChild(overlay);
    document.body.appendChild(backdrop);

    // 5. Toggle Logic
    const toggleMenu = () => {
        btn.classList.toggle('active');
        overlay.classList.toggle('active');
        backdrop.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    };

    btn.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', toggleMenu);
}

// ==========================================================================
// Footer Logic
// ==========================================================================
function initFooter() {
    // 既存のフッターがあれば削除
    const existingFooter = document.querySelector('footer');
    if (existingFooter) existingFooter.remove();

    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="footer-links">
            <a href="https://qcda-dev.github.io/HP/terms-of-service.html" target="_blank">利用規約</a>
            <a href="https://qcda-dev.github.io/HP/community-guidelines.html" target="_blank">コミュニティガイドライン</a>
        </div>
        <p>&copy; 2026 QcDa Project. All Rights Reserved.</p>
    `;
    document.body.appendChild(footer);
}
