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






// Commenting this part out until I understand better how this all works. 

//   // === Unified Intersection Observer ===
//   const allTriggers = document.querySelectorAll('[data-toggle-visible], [data-add-visible], [data-remove-visible]');

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       const el = entry.target;

//       // Helper to apply/remove classes based on logic
//       const handleTargets = (dataAttr, onEnter, onExit) => {
//         const raw = el.getAttribute(dataAttr);
//         if (!raw) return;

//         const targetIds = raw.split(',').map(id => id.trim());
//         targetIds.forEach(id => {
//           const target = document.getElementById(id);
//           if (!target) return;

//           if (entry.isIntersecting) {
//             onEnter(target);
//           } else {
//             onExit(target);
//           }
//         });
//       };

//       // === Logic per Attribute ===

//       // TOGGLE: Applies visible on enter, removes on exit — direction matters
//       handleTargets('data-toggle-visible',
//         target => {
//           if (scrollDirection === 'down') target.classList.add('visible');
//           else if (scrollDirection === 'up') target.classList.remove('visible');
//         },
//         target => {
//           if (scrollDirection === 'down') target.classList.remove('visible');
//           else if (scrollDirection === 'up') target.classList.add('visible');
//         }
//       );

//       // ADD: Always adds when entering
//       handleTargets('data-add-visible',
//         target => target.classList.add('visible'),
//         () => { } // No removal on exit
//       );

//       // REMOVE: Always removes when entering
//       handleTargets('data-remove-visible',
//         target => target.classList.remove('visible'),
//         () => { } // No reversal on exit
//       );
//     });
//   }, 
//   {
//     root: stage, 
//     threshold: 0.1
//   });

//   allTriggers.forEach(trigger => observer.observe(trigger));
// });
