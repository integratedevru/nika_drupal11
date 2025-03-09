/**
 * @file
 * JavaScript behaviors for the MeterTool theme.
 */
(function (Drupal, $) {
  'use strict';

  /**
   * Behavior for general theme enhancements.
   */
  Drupal.behaviors.meterToolTheme = {
    attach: function (context, settings) {
      // Smooth scrolling for anchor links
      $('a[href*="#"]:not([href="#"])', context).once('smooth-scroll').on('click', function() {
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

      // Add responsive table classes
      $('table', context).once('responsive-table').each(function () {
        $(this).addClass('responsive-table');
        $(this).wrap('<div class="table-responsive"></div>');
      });
    }
  };

})(Drupal, jQuery); 