# Auzclean Services — Official Website

![Auzclean Services](/public/images/logo.png)

A modern, high-performance commercial website built for Auzclean Services, a leading commercial cleaning company in Brisbane & Queensland.

The site is designed to convert visitors into leads while showcasing the brand's commitment to sustainability (GECA Certified) and compliance (CM3).

## 🚀 Built With

*   **Framework:** [Next.js 14+ (App Router)](https://nextjs.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Components:** Custom-built React components
*   **Font:** Inter (via `next/font`)

## ✨ Key Features

*   **Responsive Design:** Fully optimized for all devices (mobile, tablet, desktop).
*   **Intelligent Chatbot:** Custom-built NLP (Natural Language Processing) chatbot without requiring external API keys. It handles fuzzy matching, synonyms, context, and converts chats to leads.
*   **Scroll Animations:** Smooth entry animations powered by Framer Motion (`AnimatedSection`).
*   **Interactive Gallery:** Masonry-style image grid with a custom full-screen lightbox modal.
*   **Speed Optimized:** Built with next/image for automatic image optimization and optimal loading metrics.
*   **Lead Generation:** Prominent CTAs, sticky header booking buttons, and a unified contact form.

## 📁 Project Structure

```bash
src/
├── app/                  # Next.js App Router (Pages, Layouts)
│   ├── about/            # About Us page
│   ├── contact/          # Contact page with form and map
│   ├── gallery/          # Masonry image gallery with Lightbox
│   ├── services/         # Detailed service offerings
│   ├── sustainability/   # Eco-friendly commitment
│   ├── globals.css       # Global Tailwind styling & theme colors
│   ├── layout.tsx        # Root layout (Navbar, Footer, Chatbot)
│   └── page.tsx          # Homepage
├── components/           # Reusable UI Components
│   ├── AnimatedSection.tsx
│   ├── Button.tsx
│   ├── ChatbotPlaceholder.tsx # UI for the intelligent assistant
│   ├── chatbot-engine.ts      # The NLP logic & knowledge base
│   ├── ContactForm.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── LeadGenCTA.tsx
│   ├── Navbar.tsx
│   ├── ServiceCard.tsx
│   └── TrustBanner.tsx
└── lib/                  # Utility functions (if any)
public/
├── images/               # Static assets (logos, badges, icons)
└── Auzclean gallery/     # Portfolio images for the gallery page
```

## 🧠 The AI Chatbot Engine (`chatbot-engine.ts`)

The site features a highly capable, zero-dependency "AI" chatbot that runs entirely on the client side:
*   **Fuzzy Matching:** Uses Levenshtein distance to correct typos (e.g., "hosptial" -> "healthcare").
*   **Synonym Engine:** Maps natural language to intents (e.g., "cost", "price", "rate" -> "quote").
*   **Context Memory:** Remembers the sequence of the conversation to handle follow-up questions intelligently.
*   **Smart Fallbacks:** Helpful, action-oriented fallbacks rather than "I don't understand".

## 🛠️ Development

### Prerequisites

Ensure you have Node.js installed (v18.17.0 or higher recommended).

### Getting Started

1.  Clone the repository
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

Then, to start the production server:

```bash
npm run start
```

## 🎨 Design System

The platform uses a custom Tailwind configuration focused on corporate professionalism and cleanliness:

*   **Navy (`#0B2F4E`)** & **Navy Light (`#134975`)**: Trust, stability, and corporate professionalism.
*   **Royal (`#1e5b8e`)**: Action color for primary buttons and links.
*   **Teal (`#00A896`)** & **Emerald (`#2ECC71`)**: Represents eco-friendliness, GECA certification, and health.
*   **Cyan (`#00BCD4`)**: Modern technology accents.
