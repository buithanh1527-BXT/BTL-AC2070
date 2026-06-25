document.addEventListener("DOMContentLoaded", () => {
    checkAuth();

    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        loadBooks();
        
        const hasClosedPopup = getCookie("ad_popup_closed");
        if (!hasClosedPopup) {
            setTimeout(() => {
                const popup = document.getElementById('ad-popup');
                if (popup) popup.style.display = 'flex';
            }, 60000); 
        }
    }
});

function closePopup() {
    document.getElementById('ad-popup').style.display = 'none';
    setCookie("ad_popup_closed", "true", 1); 
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

let currentPage = 1;
let currentSearch = '';

async function loadBooks() {
    const response = await apiGet(`/books?page=${currentPage}&q=${currentSearch}`);
    const books = response.data || [];
    const container = document.getElementById('book-list');
    if (!container) return;
    
    container.innerHTML = '';
    if (books.length === 0) {
        container.innerHTML = '<p style="text-align:center; width:100%;">Không tìm thấy sách nào.</p>';
    } else {
        books.forEach(book => {
            const coverUrl = book.cover_image || 'https://via.placeholder.com/150x200?text=No+Cover';
            container.innerHTML += `
                <div class="book-card">
                    <img src="${coverUrl}" alt="Cover" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 10px;">
                    <h3>${book.title}</h3>
                    <p>Tác giả: ${book.author}</p>
                    <p>Lượt xem: ${book.view_count}</p>
                    <a href="/book-detail?id=${book.id}" class="btn btn-primary">Xem Chi Tiết</a>
                </div>
            `;
        });
    }

    renderPagination(response.pagination);
}

function renderPagination(pagination) {
    const pageContainer = document.getElementById('pagination');
    if (!pageContainer) return;
    
    pageContainer.innerHTML = '';
    if (!pagination || pagination.totalPages <= 1) return;

    for (let i = 1; i <= pagination.totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = i === pagination.page ? 'btn btn-primary' : 'btn';
        btn.style.padding = '5px 10px';
        btn.innerText = i;
        btn.onclick = () => {
            currentPage = i;
            loadBooks();
        };
        pageContainer.appendChild(btn);
    }
}

function searchBooks() {
    const query = document.getElementById('search-input').value;
    currentSearch = encodeURIComponent(query);
    currentPage = 1;
    loadBooks();
}
