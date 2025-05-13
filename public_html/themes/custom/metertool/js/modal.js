(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.contactModal = {
    attach: function (context, settings) {
      const modal = document.getElementById('contact-modal');
      const contactButton = document.getElementById('contact-button');
      const closeButton = modal.querySelector('.modal-close');
      const modalForm = modal.querySelector('.modal-form');

      // Open modal
      contactButton.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });

      // Close modal
      function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }

      closeButton.addEventListener('click', closeModal);

      // Close modal when clicking outside
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal();
        }
      });

      // Handle form submission
      modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you can add your form submission logic
        // For example, using AJAX to submit the form data
        
        // After successful submission:
        alert('Сообщение отправлено!');
        closeModal();
        modalForm.reset();
      });
    }
  };
})(jQuery, Drupal); 