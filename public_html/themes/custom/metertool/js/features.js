(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.meterToolFeatures = {
    attach: function (context, settings) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.5
      });

      once('features', '.progress-circle', context).forEach(circle => {
        observer.observe(circle);
      });
    }
  };
})(jQuery, Drupal); 