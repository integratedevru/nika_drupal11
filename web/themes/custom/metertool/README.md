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

## Theme Structure

- `css/`: Compiled CSS files
- `js/`: JavaScript files
- `less/`: LESS source files
- `templates/`: Twig templates
- `images/`: Theme images

## LESS Preprocessing

This theme uses LESS for CSS preprocessing. The LESS files are organized in a modular structure:

- `less/style.less`: Main LESS file that imports all other files
- `less/variables.less`: Color, spacing, and other variables
- `less/layout.less`: Layout and structure styles
- `less/typography.less`: Text and font styles
- `less/banner.less`: Banner component styles
- `less/responsive.less`: Mobile and responsive styles

### Compiling LESS to CSS

To compile LESS files to CSS, you can use one of the following methods:

#### Using npm scripts (requires Node.js)

```bash
# Navigate to the theme directory
cd web/themes/custom/metertool

# Install dependencies
npm install

# Compile LESS to CSS once
npm run build

# Watch for changes and compile automatically
npm run watch
```

#### Using global LESS compiler

```bash
# Navigate to the theme directory
cd web/themes/custom/metertool

# Compile LESS to CSS once
lessc less/style.less css/style.css

# Watch for changes and compile automatically
less-watch-compiler less css style.less
```

## Development

When making style changes, always edit the LESS files in the `less/` directory, not the compiled CSS files in the `css/` directory. The CSS files will be overwritten when the LESS files are compiled.

## Drupal Libraries

The theme's styles are included via the `global-styling` library defined in `metertool.libraries.yml`.

## Design Consistency

The theme implements the MeterTools 5 design with the following key components:

1. **Header with Banner**:
   - Blue navigation bar with logo, navigation menu, and user options
   - Navigation menu with "Описание", "Скачать", "Преимущества", "Контакты"
   - User menu with "Войти" and "Регистрация" options
   - Banner section with gradient blue background and arc decoration
   - Title "MeterTools 5" with descriptive paragraph
   - "Скачать" (download) and "Связаться" (contact) buttons

2. **Typography**:
   - Clean, modern sans-serif fonts
   - White text on blue backgrounds
   - Appropriate sizing for different screen resolutions

3. **Responsive Design**:
   - Adapts to mobile, tablet, and desktop screens
   - Maintains design consistency across devices

The design follows the branding guidelines for MeterTools 5 application. 