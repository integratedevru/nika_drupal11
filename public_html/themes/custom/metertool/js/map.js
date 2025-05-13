(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.meterToolMap = {
    attach: function (context, settings) {
      once('meterToolMap', '#contacts-map', context).forEach(function (element) {
        // Wait for the element to be fully rendered
        setTimeout(function() {
          try {
            // Initialize the map with custom options
            var map = L.map(element, {
              scrollWheelZoom: false, // Disable scroll zoom
              dragging: !L.Browser.mobile // Disable dragging on mobile
            }).setView([55.751244, 37.618423], 16);

            // Add OpenStreetMap tiles with retina support
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
              attribution: '© OpenStreetMap contributors',
              detectRetina: true
            }).addTo(map);

            // Add a marker with custom icon
            var marker = L.marker([55.751244, 37.618423], {
              title: 'Наш офис'
            }).addTo(map);

            // Add popup with content
            marker.bindPopup('<strong>MeterTools</strong><br>777777, Россия, г. Москва,<br>ул. Московская, 01А').openPopup();

            // Fix any size issues
            map.invalidateSize();
          } catch (e) {
            console.error('Error initializing map:', e);
          }
        }, 100);
      });
    }
  };

})(jQuery, Drupal);