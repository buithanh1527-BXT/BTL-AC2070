const API_URL = '/api';

function getHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
}

async function apiGet(endpoint) {
    const res = await fetch(`${API_URL}${endpoint}`, { headers: getHeaders() });
    return res.json();
}

async function apiPost(endpoint, data) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    return res;
}

async function apiPut(endpoint, data) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    return res;
}

async function apiDelete(endpoint) {
    const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    return res;
}

function checkAuth() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        document.getElementById('auth-links').innerHTML = `
            <span>Xin chào, ${user.username}</span> | 
            <a href="/profile">Hồ sơ cá nhân</a> | 
            ${user.role === 'admin' ? '<a href="/admin">Trang Quản trị</a> | ' : ''}
            <a href="#" onclick="logout()">Đăng xuất</a>
        `;
    } else {
        document.getElementById('auth-links').innerHTML = `
            <a href="/login">Đăng nhập</a> |
            <a href="/register">Tạo tài khoản</a>
        `;
    }
}

async function logout() {
    await apiPost('/auth/logout', {});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
}
