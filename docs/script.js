const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#main-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

// The hosted form is loaded only when the guest chooses to complete it here.
const embed = document.querySelector('#precheckin-embed');
const showForm = document.querySelector('#show-precheckin');
const hideForm = document.querySelector('#hide-precheckin');
showForm?.addEventListener('click', () => {
  const frame = embed.querySelector('iframe');
  if (!frame.getAttribute('src')) frame.setAttribute('src', frame.dataset.src);
  embed.hidden = false;
  showForm.setAttribute('aria-expanded', 'true');
  embed.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  hideForm.focus({ preventScroll: true });
});
hideForm?.addEventListener('click', () => {
  embed.hidden = true;
  showForm.setAttribute('aria-expanded', 'false');
  showForm.focus();
});
const photoDialog = document.querySelector('#photo-dialog');
document.querySelectorAll('[data-photo]').forEach(button => {
  button.addEventListener('click', () => {
    const picture = button.querySelector('img');
    const display = photoDialog.querySelector('img');
    display.src = button.dataset.photo;
    display.alt = picture.alt;
    photoDialog.querySelector('p').textContent = button.querySelector('span').textContent;
    photoDialog.showModal();
  });
});
photoDialog?.querySelector('.dialog-close').addEventListener('click', () => photoDialog.close());
photoDialog?.addEventListener('click', event => {
  if (event.target === photoDialog) {
    const box = photoDialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) photoDialog.close();
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation?.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
    menuButton.focus();
  }
});
