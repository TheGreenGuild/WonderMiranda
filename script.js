/* Explanation of JavaScript:

    triggers: This selects all the elements with the class .trigger-block, which will act as your scroll triggers.
    Intersection Observer: Observes each trigger element. When a trigger element enters the viewport, it checks the data-target attribute to identify the associated target element (like an image).
    data-target: Each trigger uses a data-target attribute that specifies the ID of the target element (the element that will be animated or changed). This allows you to link multiple triggers to their respective target elements.
    Dynamic Handling: The observer listens to each trigger independently, and each target element will respond accordingly.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Select all elements with the relevant data attributes
  const toggleTriggers = document.querySelectorAll('[data-toggle-visible]');
  const removeTriggers = document.querySelectorAll('[data-remove-visible]');
  const addTriggers = document.querySelectorAll('[data-add-visible]');

  const toggleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Find the corresponding images using the data-toggle-visible attribute
      const targetIds = entry.target.dataset.toggleVisible.split(',');

      targetIds.forEach(id => {
        const targetImage = document.querySelector(`#${id.trim()}`);

        if (entry.isIntersecting && targetImage) {
          // Add the 'visible' class to the target when the trigger enters the viewport
          targetImage.classList.add('visible');
        } else if (targetImage) {
          // Remove the 'visible' class when the trigger leaves the viewport
          targetImage.classList.remove('visible');
        }
      });
    });
  });

  const removeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Find the corresponding images using the data-remove-visible attribute
      const targetIds = entry.target.dataset.removeVisible.split(',');

      targetIds.forEach(id => {
        const targetImage = document.querySelector(`#${id.trim()}`);

        if (entry.isIntersecting && targetImage) {
          // Remove the 'visible' class when the remove-trigger enters the viewport
          targetImage.classList.remove('visible');
        }
      });
    });
  });

  const addObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Find the corresponding images using the data-add-visible attribute
      const targetIds = entry.target.dataset.addVisible.split(',');

      targetIds.forEach(id => {
        const targetImage = document.querySelector(`#${id.trim()}`);

        if (entry.isIntersecting && targetImage) {
          // Add the 'visible' class when the add-trigger enters the viewport
          targetImage.classList.add('visible');
        }
      });
    });
  });

  // Observe each element with the relevant data attributes
  toggleTriggers.forEach(trigger => toggleObserver.observe(trigger));
  removeTriggers.forEach(removeTrigger => removeObserver.observe(removeTrigger));
  addTriggers.forEach(addTrigger => addObserver.observe(addTrigger));
});