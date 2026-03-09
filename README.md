# Auzclean Services — Official Website

![Auzclean Services](/public/images/logo.png)

A high-performance, modern corporate website built for **Auzclean Services**, a premier commercial cleaning provider operating across Brisbane and Queensland, Australia. 

This project is engineered to serve as a powerful digital storefront and lead-generation engine. It combines cutting-edge web technologies with a premium aesthetic to communicate trust, reliability, and industry expertise.

## 🎯 Project Objectives

1. **Brand Authority:** Establish Auzclean as the leading, professional choice for commercial cleaning through a premium, dynamic UI.
2. **Lead Generation:** Drive conversions with strategically placed CTAs, a persistent contact form, and an intelligent virtual assistant.
3. **Information Architecture:** Clearly present complex service offerings (Commercial, Healthcare, Industrial, etc.) and company values (Sustainability, CM3 Compliance).
4. **Performance & SEO:** Achieve near-instant load times and high Core Web Vitals using Next.js Server Components and optimized assets.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) utilizing the modern App Router (`src/app`).
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) for rapid, utility-first UI development.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for smooth, scroll-triggered reveals and component transitions.
- **Icons:** [Lucide React](https://lucide.dev/) for clean, scalable, and consistent iconography.
- **Typography:** `next/font` implementing the Inter font family for optimal readability.

---

## 🗺️ Site Architecture & Pages

The application is structured to guide users naturally from landing to conversion:

### 1. `app/page.tsx` (Homepage)
The entry point featuring a dynamic Hero section, a Trust Banner with scrolling client logos, a high-level grid of services, the unique "Auzclean Difference" proposition, and integrated client testimonials.

### 2. `app/about/page.tsx`
Details the company's 15+ year history, core metrics (500+ active contracts, 99% retention), and founding values. Designed to build trust and humanize the brand.

### 3. `app/services/page.tsx`
A comprehensive breakdown of the 7 core service pillars (Commercial, Healthcare, Industrial, Education, GMP, Transport, and Specialized). Each service is detailed with specific offerings and targeted imagery.

### 4. `app/sustainability/page.tsx`
Highlights Auzclean's commitment to the environment, focusing on their use of GECA Certified products, water conservation strategies, and zero-waste goals.

### 5. `app/gallery/page.tsx`
A visual portfolio built with a robust masonry grid. It includes a custom-built, accessible Lightbox modal allowing users to view high-resolution images of past projects with keyboard navigation support.

### 6. `app/contact/page.tsx`
The primary conversion hub. Features direct contact information, an integrated Google Maps iframe for the Brisbane HQ, and a dynamic lead-capture form.

---

## ✨ Key Features & Components

### 🎨 Premium Design System
- **Color Palette:** Grounded in a corporate 'Navy' (`#0B2F4E`) mapped to trust, with 'Teal' (`#00A896`) and 'Emerald' (`#2ECC71`) accents representing eco-friendliness and health.
- **Glassmorphism:** Subtle use of semi-transparent backgrounds and blurs (`backdrop-blur`) for a modern, layered feel.

### 🎬 Scroll-Triggered Animations (`AnimatedSection.tsx`)
A highly reusable wrapper component utilizing Framer Motion's `useInView` to trigger smooth fade-up, slide-in, and staggered animations as users scroll down the page, ensuring a dynamic feel without performance hits.

### 🧠 Intelligent Virtual Assistant (`ChatbotPlaceholder.tsx`)
A custom-engineered, client-side NLP (Natural Language Processing) chatbot.
- **Zero API Dependencies:** Runs entirely in the browser using a custom matching engine.
- **Capabilities:** Features fuzzy string matching (Levenshtein distance), synonym expansion (mapping words like 'cost' to 'quote'), question pattern detection, and conversational context memory.
- **Conversion Focused:** Dynamically injects action links (e.g., "Request a Quote") directly into chat responses based on user intent.

### 🖼️ Optimized Media
- All imagery is processed through `next/image` for automatic WebP conversion, resizing, and lazy loading.
- Client logos in the `TrustBanner` are fully visible to immediately establish social proof.

---

## 🛠️ Folder Structure

```text
src/
├── app/                  # Next.js App Router (Pages, Layouts, Globals)
│   ├── about/            
│   ├── contact/          
│   ├── gallery/          
│   ├── services/         
│   ├── sustainability/   
│   ├── globals.css       # Tailwind entry and custom CSS variables
│   ├── layout.tsx        # Root layout (Navbar, Footer, Script injection)
│   └── page.tsx          # Main landing page
├── components/           # Reusable UI/UX Components
│   ├── AnimatedSection.tsx # Framer Motion scroll wrapper
│   ├── Button.tsx          # Standardized interactive buttons
│   ├── ChatbotPlaceholder.tsx # The chatbot UI
│   ├── chatbot-engine.ts   # The underlying NLP matching logic
│   ├── ContactForm.tsx     # Lead generation form
│   ├── Footer.tsx          # Site-wide footer with Quick Links
│   ├── Hero.tsx            # Homepage hero banner
│   ├── LeadGenCTA.tsx      # Reusable bottom-of-page CTA banner
│   ├── Navbar.tsx          # Desktop/Mobile responsive navigation
│   ├── ServiceCard.tsx     # Individual service display cards
│   └── TrustBanner.tsx     # Client logos and CM3 compliance badge
```

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18.17.0 or newer)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/batman2400/auzclean-website.git
   cd auzclean-website
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`. The page will hot-reload as you make edits to the files in the `src/` directory.

### Building for Production

To create an optimized production build:
```bash
npm run build
```

To test the production build locally:
```bash
npm run start
```

---

## 🚀 Deployment

This Next.js application is fully optimized for deployment on [Vercel](https://vercel.com/), the creators of Next.js. 

Simply connect your GitHub repository to a Vercel project, and it will automatically build and deploy the `main` branch. No additional configuration is required.
