// This adds a cute little box in the corner of the page to show which was the last direction I scrolled. 

document.addEventListener('DOMContentLoaded', () => {
  // === Scroll Direction Detection ===
  const stage = document.querySelector('.wrapper');
  let lastScrollY = stage.scrollTop;
  let scrollDirection = 'down';

  // Creates the scroll debugger UI
  const scrollDebugger = document.createElement('div');
  scrollDebugger.style.position = 'fixed';
  scrollDebugger.style.top = '10px';
  scrollDebugger.style.right = '10px';
  scrollDebugger.style.padding = '4px 8px';
  scrollDebugger.style.background = 'black';
  scrollDebugger.style.color = 'white';
  scrollDebugger.style.fontSize = '12px';
  scrollDebugger.style.borderRadius = '4px';
  scrollDebugger.style.zIndex = '1000';
  scrollDebugger.textContent = `Scroll: ${scrollDirection}`;
  document.body.appendChild(scrollDebugger);

  // Detect scroll direction on the stage
  stage.addEventListener('scroll', () => {
    const currentScrollY = stage.scrollTop;
    scrollDirection = (currentScrollY > lastScrollY) ? 'down' : 'up';
    lastScrollY = currentScrollY;
    scrollDebugger.textContent = `Scroll: ${scrollDirection}`;
  });

  // === Set up IntersectionObserver to use the stage as the scroll container ===
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log(entry.target.id, 'isIntersecting:', entry.isIntersecting);
    });
  }, {
    root: stage || null, // Use stage as the root if it exists, otherwise fallback to the viewport
    threshold: 0.1
  });

  // === Observe any element you want ===
  const targets = document.querySelectorAll('.watch-me');
  targets.forEach(target => observer.observe(target));
});




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

