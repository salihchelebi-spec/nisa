import { login, isAuthenticated, logout } from '../utils/adminAuth.js';

const loginContainer = document.getElementById('login-container');
const adminContainer = document.getElementById('admin-container');
const loginForm = document.getElementById('login-form');
const errorEl = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const table = document.getElementById('mapping-table');

init();

function init() {
  if (isAuthenticated()) {
    showAdmin();
  } else {
    showLogin();
  }
}

function showLogin() {
  loginContainer.hidden = false;
  adminContainer.hidden = true;
}

function showAdmin() {
  loginContainer.hidden = true;
  adminContainer.hidden = false;
  loadMapping();
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const ok = await login(username, password);
  if (ok) {
    showAdmin();
  } else {
    errorEl.textContent = 'Invalid credentials';
  }
});

logoutBtn.addEventListener('click', () => {
  logout();
  showLogin();
});

async function loadMapping() {
  table.innerHTML = '';
  try {
    const res = await fetch('mapping.json');
    const mapping = await res.json();
    Object.entries(mapping).forEach(([num, info]) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>🟢${num}</td><td>${info.name}</td>`;
      const iconCell = document.createElement('td');
      const img = document.createElement('img');
      img.src = info.file;
      img.alt = info.name;
      img.width = 24;
      iconCell.appendChild(img);
      row.appendChild(iconCell);
      const uploadCell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.svg';
      uploadCell.appendChild(input);
      row.appendChild(uploadCell);
      table.appendChild(row);
    });
  } catch (err) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="4">Error loading mapping</td>`;
    table.appendChild(row);
  }
}
