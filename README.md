# Student Course Registration System

A responsive front-end prototype for a Student Course Registration System. The project is built with **HTML5, CSS3, and Vanilla JavaScript**, with browser `localStorage` used for demonstration data because no backend/API is currently provided.

> **Project status:** Initial repository scaffold. Features will be implemented incrementally against the supplied Class Diagram and 19 Use Case specifications.

## Overview

The system has two roles:

- **Student:** create an account, sign in, browse courses, inspect course details, register/drop/cancel courses, view active registrations, and view a weekly schedule.
- **Administrator:** manage courses, departments, and enrollments; inspect student records and course enrollment lists; and perform permitted student-related operations.

The source requirements define 19 use cases (UC-01 through UC-19). The full supplied document is preserved at [`docs/requirements/source-use-cases.docx`](docs/requirements/source-use-cases.docx), and the Class Diagram is available at [`docs/diagrams/class-diagram.png`](docs/diagrams/class-diagram.png).

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic page structure |
| CSS3 | Responsive layout and visual styling |
| Vanilla JavaScript | Client-side interactions and business-rule demonstrations |
| localStorage | Demo persistence in the current browser |

No framework, package manager, or backend is required for the initial version.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/student-course-registration-system.git
cd student-course-registration-system
```

### 2. Run the project

Open `index.html` with a local development server. Recommended options:

- VS Code **Live Server** extension
- Any static HTTP server

You can also open `index.html` directly, but a local server is recommended for consistent browser behavior.

## Repository Structure

```text
student-course-registration-system/
├── assets/
│   ├── icons/
│   └── images/
├── css/
│   ├── base.css
│   ├── components.css
│   ├── layout.css
│   └── pages/
├── docs/
│   ├── architecture/
│   ├── diagrams/
│   │   └── class-diagram.png
│   └── requirements/
│       ├── source-use-cases.docx
│       └── use-cases.md
├── js/
│   ├── data/
│   ├── modules/
│   ├── app.js
│   └── config.js
├── pages/
│   ├── admin/
│   ├── auth/
│   └── student/
├── .editorconfig
├── .gitattributes
├── .gitignore
├── index.html
└── README.md
```

## Functional Scope

| Area | Main capabilities |
|---|---|
| Authentication | Student registration, login, logout |
| Course catalog | Browse courses and view course details |
| Student registration | Register, drop, cancel, and view registrations |
| Schedule | Build a weekly schedule from active registrations |
| Administration | Manage courses, departments, enrollments, and student records |
| Waiting list | FIFO queue demonstration and promotion when seats become available |

See [`docs/requirements/use-cases.md`](docs/requirements/use-cases.md) for the UC-01–UC-19 catalogue and important rules.

## Important Prototype Limitations

This repository is a **front-end-only educational prototype**, not a production registration system.

- `localStorage` is browser-local and is not shared between users or devices.
- Client-side role checks are for UI demonstration only and are not secure authorization.
- Passwords must never be treated as securely stored credentials in this prototype.
- Real authentication, authorization, concurrency-safe seat allocation, database transactions, and cross-user persistence require a backend.
- The source specifications contain open issues / undefined decisions. These must be resolved before claiming full requirements compliance.

## Development Principles

1. Keep HTML, CSS, and JavaScript separated.
2. Use small, focused JavaScript modules.
3. Keep demo data separate from UI rendering.
4. Validate user input and show clear feedback.
5. Preserve the specified registration statuses and seat-count rules.
6. Do not silently invent behavior where the requirements mark a decision as undefined.
7. Make pages responsive and accessible with semantic HTML and keyboard-friendly controls.

## Documentation

- [Use Case Catalogue](docs/requirements/use-cases.md)
- [Architecture Notes](docs/architecture/overview.md)
- [Class Diagram](docs/diagrams/class-diagram.png)
- [Original Use Case Specifications](docs/requirements/source-use-cases.docx)

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before making changes.

## License

No open-source license has been selected yet. Until a license is added, all rights remain with the repository owner.
