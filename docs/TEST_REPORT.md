# Test report

## Static checks completed

- Reviewed all HTML stylesheet references: all internal pages now reference `../style.css`.
- Reviewed JavaScript initialisation: menu creation is guarded, current-page state is set, and registration no longer reports demo success.
- Checked responsive CSS breakpoints for 360–390px, tablet and desktop layouts.

## Requires local XAMPP verification

- Import schema, configure `config/config.php`, then register a new user and sign in.
- Confirm duplicate-email rejection and invalid-password rejection.
- Confirm session and role guards for future protected endpoints.
- Test desktop/mobile navigation in a browser and run PHP lint where PHP is installed.

No real credentials, MySQL service, or XAMPP instance were available in this environment, so server/database integration was not claimed as runtime-verified.
