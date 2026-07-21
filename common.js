// ==========================================================================
// QcDa Project 共通スクリプト (ハンバーガーメニュー・Firebase初期化等)
// ==========================================================================

// --- Firebase Configuration (Modular SDK v9+) ---
// Firebase本体と必要なモジュールをインポート
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// ユーザー提供の構成情報
const firebaseConfig = {
  apiKey: "AIzaSyCqkgeIwl2zZyubmtz8vuAtx6cRKTbmA_Y",
  authDomain: "qcda-classroom-search.firebaseapp.com",
  projectId: "qcda-classroom-search",
  storageBucket: "qcda-classroom-search.firebasestorage.app",
  messagingSenderId: "419748753086",
  appId: "1:419748753086:web:951d3e9097ff3e20beb8ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// --- グローバル変数・設定 ---
const APP_VERSION = "v2.0.0 (Beta)"; // 開発中なのでBetaとします
const APP_NAME = "教室検索";
const URL_ABOUT = "https://qcda-dev.github.io/HP/";
const URL_TERMS = "https://qcda-dev.github.io/HP/terms-of-service.html";
const URL_COMMUNITY = "https://qcda-dev.github.io/HP/community-guidelines.html";
const URL_CONTACT = "https://docs.google.com/forms/d/e/1FAIpQLSdlvIr5ehyy3dInl_XTkA5F64H7yFIigL2dzFW0IoXnl8ajdw/viewform?usp=dialog";

// --- DOM操作 (ページ読み込み完了時) ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. ヘッダーとハンバーガーメニューのDOM構築
    buildHeaderAndMenu();

    // 2. フッターのDOM構築
    buildFooter();

    // 3. イベントリスナーの設定
    setupEventListeners();
});

function buildHeaderAndMenu() {
    // ヘッダー作成
    const header = document.createElement('header');
    header.innerHTML = `
        <h1 class="app-title" id="headerAppTitle">${APP_NAME}</h1>
        <button class="hamburger-btn" id="hamburgerBtn" aria-label="メニュー">
            <span></span><span></span><span></span>
        </button>
    `;
    document.body.prepend(header); // bodyの先頭に挿入

    // メニュー本体作成
    const menu = document.createElement('nav');
    menu.id = 'hamburgerMenu';
    menu.className = 'hamburger-menu';
    menu.innerHTML = `
        <ul class="menu-list">
            <li><a href="guide.html" class="menu-item" target="_blank">使い方ガイド</a></li>
            <li><a href="${URL_CONTACT}" class="menu-item" target="_blank">お問い合わせ</a></li>
            <li><a href="release-notes.html" class="menu-item" style="border-bottom: 2px solid var(--qcda-border);" target="_blank">リリースノート</a></li>
            <li><a href="${URL_ABOUT}" class="menu-item" style="margin-top: 15px;" target="_blank">QcDa Projectとは</a></li>
            <li><a href="${URL_TERMS}" class="menu-item small-light" target="_blank">利用規約</a></li>
            <li><a href="${URL_COMMUNITY}" class="menu-item small-light" target="_blank">コミュニティガイドライン</a></li>
            <li class="menu-item version-text">ver ${APP_VERSION}</li>
        </ul>
    `;
    document.body.appendChild(menu);

    // オーバーレイ作成
    const overlay = document.createElement('div');
    overlay.id = 'menuOverlay';
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
}

function buildFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="footer-links">
            <a href="${URL_TERMS}" target="_blank">利用規約</a> | 
            <a href="${URL_COMMUNITY}" target="_blank">コミュニティガイドライン</a>
        </div>
        <p>&copy; 2026 QcDa Project. All Rights Reserved.</p>
    `;
    document.body.appendChild(footer); // bodyの最後に挿入
}

function setupEventListeners() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const headerAppTitle = document.getElementById('headerAppTitle');

    // ハンバーガーメニューの開閉
    const toggleMenu = () => {
        hamburgerMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    };

    hamburgerBtn.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // アプリタイトルクリックでトップ画面(index.html)へ遷移
    headerAppTitle.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}