document.addEventListener('DOMContentLoaded', () => {
  function calculateAge() {
    const birthDate = new Date('1997-01-23');
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
          deleteEffect(element, callback);
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
      'Gamer',
      `${age} y/o`,
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

  setTimeout(() => {
    updateSubtitle();
  }, 5000);
});