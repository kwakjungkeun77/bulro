// 간단한 스크립트: 네비게이션 링크에 스무스 스크롤 추가
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const galleryImages = [
    'images/main.jpg'
];

const galleryContainer = document.getElementById('gallery-container');
if (galleryContainer) {
    galleryImages.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = '메인 갤러리 사진';
        img.className = 'gallery-item';
        galleryContainer.appendChild(img);
    });
}

const boardKey = 'bulro-board-posts';
const boardForm = document.getElementById('board-form');
const boardList = document.getElementById('board-list');
let boardPosts = [];

function loadBoardPosts() {
    const stored = localStorage.getItem(boardKey);
    boardPosts = stored ? JSON.parse(stored) : [];
}

function saveBoardPosts() {
    localStorage.setItem(boardKey, JSON.stringify(boardPosts));
}

function renderBoardPosts() {
    if (!boardList) return;
    boardList.innerHTML = '';
    if (boardPosts.length === 0) {
        boardList.innerHTML = '<p class="board-empty">아직 등록된 공지사항이 없습니다.</p>';
        return;
    }
    boardPosts.slice().reverse().forEach(post => {
        const card = document.createElement('article');
        card.className = 'board-post';
        card.innerHTML = `
            <h3>${post.title}</h3>
            <p class="board-meta">${post.date}</p>
            <p>${post.content}</p>
        `;
        boardList.appendChild(card);
    });
}

if (boardForm) {
    boardForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(boardForm);
        const title = formData.get('title').toString().trim();
        const content = formData.get('content').toString().trim();
        if (!title || !content) return;

        const post = {
            title,
            content,
            date: new Date().toLocaleString('ko-KR', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit'
            })
        };
        boardPosts.push(post);
        saveBoardPosts();
        renderBoardPosts();
        boardForm.reset();
    });
}

loadBoardPosts();
renderBoardPosts();
