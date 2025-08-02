import { get, set } from './storage.js';

export async function applyTheme(root = document.body) {
  const { theme = 'light' } = await get(['theme']);
  root.classList.toggle('dark', theme === 'dark');
  return theme;
}

export async function setTheme(next, root = document.body) {
  await set({ theme: next });
  root.classList.toggle('dark', next === 'dark');
  return next;
}
