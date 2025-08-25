# OKLCH Color Explorer

An interactive tool to explore the OKLCH color space, create color palettes, and discover color harmonies.

## Features

- **Interactive Color Picker**: Adjust Lightness, Chroma, and Hue with real-time feedback.
- **Color Harmonies**: Automatically generate complementary, analogous, triadic, and split-complementary colors.
- **Color Palette**: Save your favorite colors to a palette.
- **Accessibility Info**: Check contrast ratios against black and white text.
- **Gamut Checking**: Get warnings for colors outside the sRGB gamut.
- **Copy to Clipboard**: Easily copy color values in OKLCH and HEX formats.

## Tech Stack

- **Framework**: [React](https://react.dev/) with [TanStack Router](https://tanstack.com/router)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4.x](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- **Color Library**: [Culori](https://culorijs.org/)

## Getting Started

1.  **Install dependencies**:

    ```bash
    pnpm install
    ```

2.  **Start the development server**:

    ```bash
    pnpm dev
    ```

3.  Open your browser to `http://localhost:3000`.
