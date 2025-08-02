export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    console.error('copyText error', e);
    return false;
  }
}

export async function readText() {
  try {
    return await navigator.clipboard.readText();
  } catch (e) {
    console.error('readText error', e);
    return '';
  }
}
