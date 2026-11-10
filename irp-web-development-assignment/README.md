# IRP Web Development Assignment

Responsive Web Design and JavaScript Foundations.

## Project structure

```
irp-web-development-assignment/
├── part-a-responsive-ui/
│   ├── index.html     # Semantic HTML5 IRP LMS Home Page
│   └── style.css      # Flexbox, CSS Grid, Media Queries
├── part-b-javascript/
│   └── bank.js        # Types & Coercion, var/let/const & Hoisting
└── README.md
```

## Part A: IRP LMS Home Page

### Run
Open `part-a-responsive-ui/index.html` in Google Chrome (double-click, or use the VS Code "Live Server" extension).

### Features
- Sticky navigation bar (`position: sticky; top: 0; z-index: 1000`)
- Desktop: logo, links (Home with orange underline, Courses, Contact Us), outlined Sign In button
- Mobile: links hidden; logo and Sign In stay anchored at the top
- Hero: 2 columns on desktop, stacked on mobile; illustration scales without overflow
- Learning Journey: 5 columns (desktop), 3 columns (tablet), 1 column (mobile)

### Responsive testing steps
1. Open `index.html` in Chrome.
2. Scroll down and confirm the navbar stays fixed at the top.
3. Press F12, then toggle the Device Toolbar (Ctrl+Shift+M).
4. At 1200px or wider, confirm 5 step cards in one row and a 2-column hero.
5. At about 800px, confirm 3 columns.
6. At 375px / 390px, confirm one column, no horizontal scrollbar, and links collapsed.

## Part B: Bank Account Simulator

### Run
```bash
node part-b-javascript/bank.js
```
Requires Node.js (v14 or later).

### Covers
- **Part 1:** `parseAmount(input)` validation with `trim()`, `Number()`, `NaN` and `<= 0` checks, tested with `try/catch`
- **Part 2:** `const` vs `let`, hoisting demo (var, let TDZ, function declaration, function expression), and the `var` vs `let` loop bug with `setTimeout`

## Submission
Push this folder to a **Public** GitHub repository and verify it in an incognito window before submitting the URL.
