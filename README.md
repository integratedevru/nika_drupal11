# Drupal Project

This is a Drupal project running on Docker, based on the wodby/docker4drupal stack.

## Prerequisites

*   Docker: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
*   Docker Compose: (Usually included with Docker Desktop) [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)
*   `make` utility (available on most Linux/macOS systems. For Windows, you might need to install it via WSL or a similar tool).

## Project Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Environment Configuration (`.env` file):**
    This project uses an `.env` file to manage environment-specific configurations such as Docker image tags, database credentials, and project URLs.
    The `Makefile` includes `.env` at the top, so ensure this file exists.
    You might need to create it based on an example file (if one is provided, e.g., `.env.example`) or by setting the required variables. Common variables from `compose.yml` and `wodby/docker4drupal` include:

    ```env
    # Docker Image Tags (Update these to your desired versions)
    MARIADB_TAG=10.11 # Or your preferred MariaDB version
    PHP_TAG=8.3       # Or your preferred PHP version (Drupal 11 requires >= 8.3)
    NGINX_TAG=1.27    # Or your preferred Nginx version
    # DRUPAL_VERSION=11 # If you manage Drupal version here for scripts

    # Project Name (used for container naming)
    PROJECT_NAME=my_drupal_project

    # Database Credentials
    DB_HOST=mariadb
    DB_PORT=3306
    DB_NAME=drupal
    DB_USER=drupal
    DB_PASSWORD=drupal
    DB_ROOT_PASSWORD=root_password # Change this
    DB_DRIVER=mysql

    # Base URL for the project (if using Traefik or for Drush)
    # PROJECT_BASE_URL=myproject.localhost
    PROJECT_PORT=8000 # Port exposed by Nginx

    # Add other necessary variables as defined in your compose.yml or Makefile
    ```
    **Note:** Ensure your `.env` file reflects the actual versions and settings you intend to use. For Drupal 11, ensure `PHP_TAG` corresponds to PHP 8.3+.

3.  **Build and Start Containers:**
    ```bash
    make up
    ```
    This command will pull the necessary Docker images and start all services defined in `compose.yml`.

## Common Commands (via `Makefile`)

*   **Start containers:** `make up` (pulls images and starts)
*   **Start containers (without updating images):** `make start`
*   **Stop containers:** `make stop` or `make down`
*   **View container status:** `make ps`
*   **View container logs:** `make logs` (e.g., `make logs php nginx`)
*   **Access PHP container shell:** `make shell`
    *   To access a different service shell: `make shell <service_name>` (e.g., `make shell mariadb`)
*   **Run Composer commands:** `make composer "<your-composer-command>"`
    *   Example: `make composer "install"`
    *   Example: `make composer "require drupal/admin_toolbar"`
*   **Run Drush commands:** `make drush "<your-drush-command>"`
    *   Example: `make drush "status"`
    *   Example: `make drush "cr"` (clear cache)
    *   Example: `make drush "cim -y"` (config import)
    *   Example: `make drush "site-install standard --db-url=mysql://\$DB_USER:\$DB_PASSWORD@\$DB_HOST/\$DB_NAME --site-name='My Drupal Site' -y"` (for a fresh install if needed, ensure DB variables are correctly set in `.env`)
*   **Prune (Remove) Containers and Volumes:**
    *   Remove all containers and their volumes: `make prune` (Use with caution, this deletes data like your database)
    *   Remove a specific service and its volume: `make prune <service_name>` (e.g., `make prune mariadb` to remove the MariaDB container and its data volume, useful for a clean database setup)

## Database

*   The database service is `mariadb`.
*   Data is persisted in a Docker volume named `mariadb_data` (as per your `compose.yml`).
*   To perform a clean database installation:
    1.  `make prune mariadb` (This will remove the MariaDB container and its data volume)
    2.  `make up` (This will recreate the MariaDB service with an empty database)
    3.  You may then need to run a `drush site-install` command or restore a database backup.

## Drupal Installation

If this is a fresh setup or after pruning the database:

1.  Ensure containers are running (`make up`).
2.  Access the PHP container: `make shell`
3.  Inside the container, navigate to your Drupal root (usually `/var/www/html`) if your `DRUPAL_ROOT` for Drush is `/var/www/html/web`.
4.  Run `composer install` if dependencies are not yet installed.
5.  Install Drupal using Drush:
    ```bash
    drush site-install standard \\
      --db-url=mysql://$DB_USER:$DB_PASSWORD@$DB_HOST/$DB_NAME \\
      --site-name="My Drupal Site" \\
      --account-name=admin --account-pass=admin -y
    ```
    (Adjust credentials and site details as per your `.env` file and preferences. The `make drush "site-install ..."` command can also be used from outside the container.)

## Accessing the Site

Once the containers are running, you should be able to access your Drupal site at `http://localhost:${PROJECT_PORT}` (e.g., `http://localhost:8000` if `PROJECT_PORT` is set to 8000 in your `.env`).

## Customization

*   Modify `compose.yml` to add or change services.
*   Update `.env` for version changes and credentials.
*   Extend the `Makefile` with more custom commands. 