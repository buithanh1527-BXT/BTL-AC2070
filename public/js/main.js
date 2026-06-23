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

async function loadBooks() {
    const books = await apiGet('/books');
    const container = document.getElementById('book-list');
    if (!container) return;
    
    container.innerHTML = '';
    books.forEach(book => {
        container.innerHTML += `
            <div class="book-card">
                <h3>${book.title}</h3>
                <p>Tác giả: ${book.author}</p>
                <p>Lượt xem: ${book.view_count}</p>
                <a href="/book-detail?id=${book.id}" class="btn btn-primary">Xem Chi Tiết</a>
            </div>
        `;
    });
}
