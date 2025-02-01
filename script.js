/* Explanation of JavaScript:

    triggers: This selects all the elements with the class .trigger-block, which will act as your scroll triggers.
    Intersection Observer: Observes each trigger element. When a trigger element enters the viewport, it checks the data-target attribute to identify the associated target element (like an image).
    data-target: Each trigger uses a data-target attribute that specifies the ID of the target element (the element that will be animated or changed). This allows you to link multiple triggers to their respective target elements.
    Dynamic Handling: The observer listens to each trigger independently, and each target element will respond accordingly.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Select all triggers and target elements
    const triggers = document.querySelectorAll('.trigger');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Find the corresponding image using the data-target attribute
        const targetImage = document.querySelector(`#${entry.target.dataset.target}`);
  
        if (entry.isIntersecting && targetImage) {
          // Add the 'visible' class to the target when the trigger enters the viewport
          targetImage.classList.add('visible');
        } else if (targetImage) {
          // Remove the 'visible' class when the trigger leaves the viewport
          targetImage.classList.remove('visible');
        }
      });
    });
  
    // Observe each trigger element
    triggers.forEach(trigger => observer.observe(trigger));
  });
  