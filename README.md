# StudentHub

StudentHub is a vanilla HTML/CSS/JavaScript and PHP/MySQL academic portal project for XAMPP. The visual identity of the original home page is retained while the internal portal experience, responsive navigation, client validation and server-side authentication baseline have been added.

## Run locally with XAMPP

1. Copy the project to `xampp/htdocs/studenthub` (or configure an Apache virtual host).
2. Start Apache and MySQL in XAMPP.
3. Open phpMyAdmin and import `database/schema.sql`.
4. Copy `config/config.example.php` to `config/config.php`; set the local database credentials. This file is ignored by Git.
5. Visit `http://localhost/studenthub/pages/index.html`.

## Included functionality

- Accessible, responsive shared navigation and page layouts.
- Searchable attendance and assignment tables using vanilla JavaScript.
- Fetch-based registration and login forms that only display success after an API response.
- Prepared statements, `password_hash`, `password_verify`, session regeneration, role helper, CSRF helper and audit logging foundation.
- MySQL users, students, events and audit-log schema.

## Important scope notes

The dashboard, academic records and notices currently display **demonstration data**; they are labelled as such and are not presented as live records. The authentication API requires MySQL configuration before it can run. Event CRUD, poster upload, administrator interface and academic-record APIs remain future implementation work; see `docs/PRACTICAL_STATUS.md`.

## Security notes

Never commit `config/config.php`. All future state-changing endpoints must call `require_csrf()`, all output from a database must be escaped with `htmlspecialchars`, and uploads must be MIME-checked, size-limited, randomly named and stored outside the executable web root where possible.
