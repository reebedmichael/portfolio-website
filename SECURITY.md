# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it privately. Do **not** create a public issue. Instead, email the maintainer at [your-email@example.com] with details. We will respond as soon as possible and coordinate a fix.

## Supported Versions

| Version | Supported          |
| ------- | ----------------- |
| latest  | :white_check_mark: |

## Security Best Practices for Contributors
- Never commit real secrets, API keys, or credentials.
- Use environment variables for all sensitive data.
- Add new sensitive files to `.gitignore`.
- Use only dummy/example data in documentation and example files.
- If you accidentally commit a secret, rotate it immediately and scrub it from git history.

## Dependency Security
- Run `npm audit` regularly and address vulnerabilities.
- Keep dependencies up to date.

Thank you for helping keep this project secure! 