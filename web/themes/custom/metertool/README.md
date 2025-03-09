# MeterTool Theme

A custom Drupal theme for the MeterTool application.

## Overview

This theme provides a clean, modern interface for the MeterTool application. It includes custom styling and JavaScript enhancements.

## Features

- Responsive design
- Modern CSS using CSS variables
- JavaScript enhancements
- Custom logo
- Enhanced page template

## Customization

### CSS

The theme uses CSS variables defined in `css/style.css`. You can easily modify the theme colors and spacing by changing these variables.

```css
:root {
  --primary-color: #006699;
  --secondary-color: #004466;
  --light-gray: #f5f5f5;
  --dark-gray: #333333;
  --text-color: #2a2a2a;
  --link-color: #0077cc;
  --link-hover-color: #005599;
  --padding-default: 1rem;
  --margin-default: 1rem;
  --border-radius: 4px;
}
```

### Templates

The theme includes a custom `page.html.twig` template with enhanced styling for page elements including:

- Improved header with logo and navigation
- Responsive content area
- Enhanced footer with copyright
- Better mobile experience

## Installation

1. Place the theme in your Drupal site's `web/themes/custom/` directory
2. Enable the theme in the Drupal admin UI at Appearance (/admin/appearance)
3. Set as default theme if desired

## Requirements

- Drupal 9 or 10
- Base theme: Claro 