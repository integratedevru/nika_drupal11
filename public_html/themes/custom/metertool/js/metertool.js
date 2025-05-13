/**
 * @file
 * JavaScript behaviors for the MeterTool theme.
 */
(function (Drupal, $, once) {
  'use strict';

  /**
   * Behavior for general theme enhancements.
   */
  Drupal.behaviors.meterToolTheme = {
    attach: function (context, settings) {
      // Smooth scrolling for anchor links
      once('smooth-scroll', 'a[href*="#"]:not([href="#"])', context).forEach(function (element) {
        $(element).on('click', function() {
          if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
              $('html, body').animate({
                scrollTop: target.offset().top - 100
              }, 1000);
              return false;
            }
          }
        });
      });

      // Add responsive table classes
      once('responsive-table', 'table', context).forEach(function (table) {
        $(table).addClass('responsive-table');
        $(table).wrap('<div class="table-responsive"></div>');
      });
    }
  };

})(Drupal, jQuery, once); 