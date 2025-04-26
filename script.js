// Adds the funcitonality to tell which direction you're scrolling and adding/removing classes based on triggers. No more toggle trigger, I have to be explicit in what I add/remove now. But all the animations are reversible now! 
document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.wrapper');

  let lastScrollY = wrapper.scrollTop;
  let scrollDirection = 'down';
  let hasScrolled = false;

  wrapper.addEventListener('scroll', () => {
    hasScrolled = true;
    const currentScrollY = wrapper.scrollTop;
    scrollDirection = (currentScrollY > lastScrollY) ? 'down' : 'up';
    lastScrollY = currentScrollY;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!hasScrolled) return; // Skip logic if the user hasn't scrolled yet

      const el = entry.target;
      const isVisible = entry.isIntersecting;

      // Handle data-add-visible
      if (el.dataset.addVisible) {
        const targetIds = el.dataset.addVisible.split(',').map(id => id.trim());
        targetIds.forEach(id => {
          const target = document.getElementById(id);
          if (!target) return;

          if (scrollDirection === 'down' && isVisible) {
            target.classList.add('visible');
            console.log(`Added visible to #${id}`)
          }
          if (scrollDirection === 'up' && !isVisible) {
            target.classList.remove('visible');
            console.log(`Removed visible from #${id}`)
          }
        });
      }

      // Handle data-remove-visible
      if (el.dataset.removeVisible) {
        const targetIds = el.dataset.removeVisible.split(',').map(id => id.trim());
        targetIds.forEach(id => {
          const target = document.getElementById(id);
          if (!target) return;

          if (scrollDirection === 'down' && isVisible) {
            target.classList.remove('visible');
            console.log(`Removed visible from #${id}`)
          }
          if (scrollDirection === 'up' && !isVisible) {
            target.classList.add('visible');
            console.log(`Added visible to #${id}`)
          }
        });
      }

    });
  }, {
    root: wrapper,
    threshold: 0.01 //What percent of the trigger needs to be on page before the add/remove stuff happens
  });

  // Find all triggers and observe them
  const allTriggers = document.querySelectorAll('[data-add-visible], [data-remove-visible]');
  allTriggers.forEach(trigger => {
    console.log('Observing trigger:', trigger);
    observer.observe(trigger);
  });
});

