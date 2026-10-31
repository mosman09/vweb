const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navigation.classList.toggle('open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  }
});

const launcher = document.querySelector('.chat-launcher');
const panel = document.querySelector('#chat-panel');
const closeChat = document.querySelector('.chat-close');
const chatForm = document.querySelector('.chat-form');
const chatInput = document.querySelector('#chat-input');
const messages = document.querySelector('#chat-messages');

function setChatOpen(open) {
  panel.hidden = !open;
  launcher.setAttribute('aria-expanded', String(open));
  if (open) chatInput.focus();
  else launcher.focus();
}
launcher.addEventListener('click', () => setChatOpen(panel.hidden));
closeChat.addEventListener('click', () => setChatOpen(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !panel.hidden) setChatOpen(false);
});
function addMessage(text, sender) {
  const message = document.createElement('div');
  message.className = `${sender}-message`;
  message.textContent = text;
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
}
function replyTo(question) {
  const text = question.toLowerCase();
  if (/price|cost|pricing|budget|rate|how much/.test(text)) return 'The best way to discuss pricing is to tell us about your project using the contact form below. We can talk through what you need.';
  if (/start|contact|hire|reach|talk|book/.test(text)) return 'We would love to hear about your idea! Use the contact form in the Say hello section to tell us about your project.';
  if (/sprint|process|work|how|long|time/.test(text)) return 'We start with a remote conversation, then explore your idea with a demo and prototype. Our development sprint moves through discovery, sketching, storyboarding and user testing over four days.';
  if (/service|what do you do|offer|website|web|app|mobile|build|design|prototype/.test(text)) return 'We help with remote technical consultation, web and mobile applications, demos, prototypes and user testing. Explore What we do for more details.';
  if (/hello|hi\b|hey/.test(text)) return 'Hello! Ask me about our services, process, pricing or how to get started.';
  return 'I can help with questions about our services, process, pricing and getting started. For anything else, please tell us about it using the contact form in the Say hello section.';
}
function sendQuestion(question) {
  const trimmed = question.trim();
  if (!trimmed) return;
  addMessage(trimmed, 'user');
  addMessage(replyTo(trimmed), 'bot');
}
chatForm.addEventListener('submit', event => {
  event.preventDefault();
  sendQuestion(chatInput.value);
  chatInput.value = '';
  chatInput.focus();
});
document.querySelector('.quick-replies').addEventListener('click', event => {
  if (event.target.matches('button')) sendQuestion(event.target.textContent);
});
