# Practical requirement status

| # | Requirement | Status | Evidence / next step |
| --- | --- | --- | --- |
| 1 | Planning, sitemap, wireframes, README | Partial | README and audit added; sitemap/wireframes still need lecturer-specific artefacts. |
| 2 | Semantic HTML | Complete | Pages use landmarks, headings, labelled tables/forms. |
| 3 | Responsive UI | Complete | Shared CSS has 1050px and 700px layouts plus reduced-motion support. |
| 4 | JavaScript DOM interactions | Complete | Accessible menu, password controls and table search. |
| 5 | Registration validation | Partial | Client constraints plus secure server validation; requires local MySQL setup to run. |
| 6 | JSON, search, filtering, pagination | Partial | Search works in browser; JSON rendering/filter/pagination API remains to be connected. |
| 7 | PHP CSV/JSON storage | Missing | Use MySQL path rather than duplicate storage, unless required by marking scheme. |
| 8 | MySQL schema/connectivity | Partial | Schema and PDO connection present; not runtime-tested without XAMPP configuration. |
| 9 | Secure registration/password hashing | Implemented | Prepared statements and `password_hash()` in `api/register.php`. |
| 10 | Authentication/sessions/roles | Partial | Login, session regeneration and role helper are present; protected PHP views remain to be migrated. |
| 11 | Student CRUD | Missing | Requires protected admin API/UI. |
| 12 | Event CRUD/secure uploads | Missing | Requires admin endpoints and upload storage policy. |
| 13 | PHP JSON APIs/Fetch CRUD | Partial | Registration and login JSON endpoints are Fetch-integrated. |
| 14 | Admin dashboard/RBAC/audit | Partial | Role helper and audit-log table/function provided; admin UI and CRUD missing. |
| 15 | Integration/testing/deployment | Partial | Documentation added; runtime XAMPP test remains required. |
