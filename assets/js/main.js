document.addEventListener('DOMContentLoaded', () => {
  function calculateAge() {
    const birthDate = new Date(1997, 0, 23);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
      age -= 1;
    }
    return age;
  }
  
  function typeEffect(element, text, callback) {
    let index = 0;
    const interval = setInterval(() => {
      element.innerHTML = text.slice(0, index + 1) || ' ';
      index++;
      if (index === text.length) {
        clearInterval(interval);
        setTimeout(() => {
          callback();
        }, 5000);
      }
    }, 100);
  }
  
  function deleteEffect(element, callback) {
    let text = element.textContent;
    const interval = setInterval(() => {
      text = text.slice(0, -1) || ' ';
      element.textContent = text;
      if (text === ' ') {
        clearInterval(interval);
        callback();
      }
    }, 50);
  }
  
  function updateSubtitle() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    const age = calculateAge();
    const phrases = [
      'Web Developer',
      'Server Administrator',
      'Tech Enthusiast',
      `${age} y/o`,
      'Based in Austria',
    ];
    
    let index = 1;
    
    function loop() {
      deleteEffect(subtitle, () => {
        typeEffect(subtitle, phrases[index], () => {
          index = (index + 1) % phrases.length;
          loop();
        });
      });
    }
    
    loop();
  }
  
  function setupDiscordCopy() {
    const button = document.querySelector('[data-discord-username]');
    const status = document.querySelector('.copy-status');
    if (!button || !status) return;
    
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let feedbackTimeout;
    let copying = false;
    
    status.addEventListener('transitionend', (event) => {
      if (event.propertyName === 'opacity' && !status.classList.contains('is-visible')) {
        status.textContent = '';
      }
    });
    
    button.addEventListener('click', async () => {
      if (copying) return;
      copying = true;
      clearTimeout(feedbackTimeout);
      status.classList.remove('is-visible');
      
      try {
        await navigator.clipboard.writeText(button.dataset.discordUsername);
        status.textContent = 'Copied!';
      } catch {
        status.textContent = 'Copy failed';
      } finally {
        status.classList.add('is-visible');
        copying = false;
        feedbackTimeout = setTimeout(() => {
          status.classList.remove('is-visible');
          if (reducedMotion.matches) {
            status.textContent = '';
          }
        }, 2500);
      }
    });
  }
  
  setupDiscordCopy();
  
  setTimeout(() => {
    updateSubtitle();
  }, 5000);
});