//  AUTH 
function switchAuthTab(tab, btn) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('login-form').style.display    = tab === 'login'    ? 'flex' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? 'flex' : 'none';
}

function goToApp() {
  document.getElementById('auth-page').classList.remove('active');
  const app = document.getElementById('app-page');
  app.classList.add('active');
  showView('feed');
}

// NAV 
function switchNav(btn, view) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  btn.classList.add('active');
  showView(view);
}

function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
  const el = document.getElementById('view-' + name);
  if (el) {
    el.style.display = 'block';
    el.style.animation = 'fadeSlideIn 0.3s ease';
  }
  // sync nav active state
  document.querySelectorAll('.nav-item').forEach(n => {
    if (n.onclick && n.onclick.toString().includes("'" + name + "'")) {
      document.querySelectorAll('.nav-item').forEach(x => x.classList.remove('active'));
      n.classList.add('active');
    }
  });
}

//  CAPTION MODAL
let selectedTone = 'Poetic';

function openCaptionModal() {
  document.getElementById('caption-modal').classList.add('open');
  document.getElementById('caption-result').style.display  = 'none';
  document.getElementById('caption-actions').style.display = 'none';
}

function closeCaptionModal() {
  document.getElementById('caption-modal').classList.remove('open');
}

function selectTone(btn, tone) {
  document.querySelectorAll('.caption-chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  selectedTone = tone;
}

const captions = {
  Poetic: [
    "Some moments aren't captured — they're felt long after the shutter closes. ✦",
    "The light spoke and I listened. This is what silence sounds like in color. 🌅",
    "Every frame holds a universe of what was, what is, and what could've been."
  ],
  Witty: [
    "Me: I'll take just one photo. Also me: *1,400 photos later* 📸",
    "They said go touch grass. I went and took pictures of it. Same thing.",
    "Plot twist: the camera captures memories, but the memories capture you."
  ],
  Motivational: [
    "You don't find the right path. You walk, and it finds you. Keep moving. 🔥",
    "Every sunrise is the universe saying: try again. Show up. Begin. ✦",
    "Not every day is perfect. But every day is a chance. Take it."
  ],
  Minimal: [
    "Here. Now. Enough.",
    "Light. Stillness. Presence.",
    "Some things need no caption. This is not one of them. ◇"
  ],
  Nostalgic: [
    "The smell of that afternoon still lives somewhere in my chest. 🌸",
    "I didn't know then that I'd miss it this much. But here we are.",
    "Some photos don't just show you a place — they return you to it. Always."
  ],
  Funny: [
    "POV: You took 47 shots to get this one 'candid'. Worth it? Ask my camera roll. 😂",
    "Living my best life (photo taken by my patient, suffering friend who said 'one more' 14 times).",
    "I came, I saw, I filtered. Caesar had it easy."
  ]
};

function generateCaption() {
  const resultEl  = document.getElementById('caption-result');
  const actionsEl = document.getElementById('caption-actions');

  resultEl.style.display  = 'block';
  actionsEl.style.display = 'none';
  resultEl.innerHTML = `
    <div class="caption-loading">
      <div class="loading-dots"><span></span><span></span><span></span></div>
      <span style="color:var(--muted);font-size:13px">Generating ${selectedTone} caption...</span>
    </div>`;

  setTimeout(() => {
    const pool = captions[selectedTone] || captions.Poetic;
    const cap  = pool[Math.floor(Math.random() * pool.length)];
    resultEl.innerHTML      = `"${cap}"`;
    actionsEl.style.display = 'flex';
  }, 1400);
}

function useCaption() {
  const text = document.getElementById('caption-result').textContent;
  document.getElementById('post-text-input').value = text;
  closeCaptionModal();
  showView('feed');
}

// ===== EMOTION SEARCH =====
const emotionPosts = {
  happy: [{
    user: 'Priya Mehta', handle: '@priyamehta', em: 'emotion-happy', badge: '😊 Happy',
    text: "Golden hour hits different when you're finally living your dream. 🌅 Three years, countless rejections, and here I am — with my own studio!",
    icon: '🌅'
  }],
  excited: [{
    user: 'Rohan Dev', handle: '@rohandev', em: 'emotion-excited', badge: '⚡ Excited',
    text: 'Just shipped v2.0! 847 GitHub stars overnight. The community response has been overwhelming 🚀',
    icon: '🚀'
  }],
  calm: [{
    user: 'Neha Singh', handle: '@neha_creates', em: 'emotion-calm', badge: '🌿 Calm',
    text: 'Sunday morning ritual: matcha, journaling, and zero notifications. The art of doing nothing — beautifully. ☕',
    icon: '☕'
  }],
  sad: [{
    user: 'Aryan Kapoor', handle: '@aryanart', em: 'emotion-sad', badge: '💜 Melancholy',
    text: "Some songs play and suddenly you're back in a moment that no longer exists. Music is a time machine nobody asked for. 🎵",
    icon: '🎵'
  }],
  inspired: [{
    user: 'Dev Anand', handle: '@dev_writes', em: 'emotion-inspired', badge: '✨ Inspired',
    text: 'The mountains taught me silence. No wifi, no distractions — just wind, altitude, and perspective that shifts everything. 🏔️',
    icon: '🏔️'
  }]
};

function setMood(btn, mood, label) {
  document.querySelectorAll('.mood-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('emotion-input').value = label;
  showEmotionResults(mood, label);
}

function triggerEmotionSearch() {
  const val = document.getElementById('emotion-input').value.toLowerCase();
  let mood = 'happy';
  if      (val.includes('excit') || val.includes('energy'))              mood = 'excited';
  else if (val.includes('calm')  || val.includes('peace') || val.includes('relax')) mood = 'calm';
  else if (val.includes('sad')   || val.includes('melan') || val.includes('miss'))  mood = 'sad';
  else if (val.includes('inspir')|| val.includes('motiv'))               mood = 'inspired';
  showEmotionResults(mood, val || 'Happy');
}

function showEmotionResults(mood, label) {
  document.getElementById('emotion-results').style.display = 'block';
  document.getElementById('mood-label').textContent = label;
  const posts = emotionPosts[mood] || emotionPosts.happy;
  document.getElementById('emotion-posts').innerHTML = posts.map(p => `
    <div class="post-card">
      <div class="post-header">
        <div class="post-avatar">${p.user[0]}</div>
        <div class="post-user">
          <div class="post-username">${p.user}</div>
          <div class="post-handle">${p.handle}</div>
        </div>
        <span class="post-emotion-badge ${p.em}">${p.badge}</span>
      </div>
      <div class="post-content">${p.text}</div>
      <div class="post-actions">
        <button class="post-action-btn">❤️ <span>${Math.floor(Math.random() * 900 + 100)}</span></button>
        <button class="post-action-btn">💬 <span>${Math.floor(Math.random() * 90 + 10)}</span></button>
        <button class="post-action-btn post-share">↗ Share</button>
      </div>
    </div>`).join('');
}

// ===== CHATBOT =====
const botReplies = [
  "Great question! Here's what I think would work best for your content... Let me analyze your mood and craft something special ✨",
  "I love that idea! Based on your emotional signature this week, I'd suggest leaning into the **Inspired** tone for maximum engagement. 🎯",
  "SwiftChat's emotion engine detects that you're in a creative headspace right now — perfect time to post! Here are 3 caption ideas...",
  "I can see from your interaction patterns that your audience resonates most with authentic, personal stories. Want me to draft something along those lines?",
  "That's a fascinating topic! Searching through posts with similar emotional resonance... Found 47 matching posts in your network. 🔍"
];

function sendChat() {
  const input     = document.getElementById('chat-input');
  const msg       = input.value.trim();
  if (!msg) return;

  const container = document.getElementById('chat-messages');
  container.innerHTML += `
    <div class="chat-msg user">
      <div class="chat-msg-avatar user-av">H</div>
      <div class="chat-bubble user">${msg}</div>
    </div>`;
  input.value = '';
  container.scrollTop = container.scrollHeight;

  // Bot typing indicator
  const typingId = 'typing-' + Date.now();
  container.innerHTML += `
    <div class="chat-msg" id="${typingId}">
      <div class="chat-msg-avatar bot">S</div>
      <div class="chat-bubble bot">
        <div class="loading-dots"><span></span><span></span><span></span></div>
      </div>
    </div>`;
  container.scrollTop = container.scrollHeight;

  setTimeout(() => {
    const typing = document.getElementById(typingId);
    if (typing) {
      typing.outerHTML = `
        <div class="chat-msg">
          <div class="chat-msg-avatar bot">S</div>
          <div class="chat-bubble bot">${botReplies[Math.floor(Math.random() * botReplies.length)]}</div>
        </div>`;
    }
    container.scrollTop = container.scrollHeight;
  }, 1200);
}

function sendSuggestion(text) {
  document.getElementById('chat-input').value = text;
  sendChat();
}

// ===== SECTION TABS (visual only) =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.section-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      this.closest('.section-tabs').querySelectorAll('.section-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
});
