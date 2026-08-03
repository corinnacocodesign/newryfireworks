# Newry Fireworks website

A responsive website for Newry Fireworks, focused on retail sales, weddings, and special occasions. The design uses the supplied Newry Fireworks photography and includes working section navigation, enquiry links, and map directions.

## Run locally

Requirements: Node.js 22 or later.

```bash
npm install
npm run dev
```

Open the local address shown in the terminal.

## Production build

```bash
npm run build
```

## Main files

- `app/page.tsx` — homepage content and structure
- `app/globals.css` — complete responsive visual design
- `public/assets/` — approved Newry Fireworks photography

## Before launch

Replace the placeholder email address, map query, shop opening times, and social links with the final business details. Product checkout is presented as a visual route only; connect it to an ecommerce platform before taking online orders.

## Publishing from GitHub

Push this folder to a GitHub repository, then connect the repository to a compatible React/Next.js hosting service. Use `npm run build` as the build command.
