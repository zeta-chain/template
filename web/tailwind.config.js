/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      scale: {
        1025: "1.025",
      },
      fontFamily: {
        rounded: ["SFRounded", "ui-rounded", "SF Pro Rounded", "sans-serif"],
      },
      boxShadow: {
        rainbowkit: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);",
        "2xl": "0 10px 50px -12px rgb(0 0 0 / 0.25);",
      },
      colors: {
        bitcoin: "#f89414",
        zeta: {
          green: {
            50: "#00DDA5",
            100: "#00BC8D",
            200: "#00A87D",
            300: "#005741",
            400: "#008462",
            500: "#007457",
            600: "#00664C",
            700: "#005741",
            800: "#004937",
            900: "#003D2D",
          },
          mauve: {
            100: "#FF5AF1",
            300: "#E34ED6",
            500: "#C241B6",
            700: "#A03595",
            900: "#521A4D",
          },
          blue: {
            100: "#00D5FF",
            300: "#00C6EE",
            500: "#00B8DD",
            700: "#00A5C6",
            900: "#006579",
          },
          orange: {
            100: "#FFAB00",
            300: "#F4A400",
            500: "#EB9E00",
            700: "#D99200",
            900: "#B87C00",
          },
          lime: {
            100: "#EFFFDE",
            500: "#C4FF8A",
            700: "#B0FF61",
            900: "#9AEA4A",
          },
          sand: {
            100: "#F7F3EC",
          },
          grey: {
            50: "#FFFFFF",
            100: "#EFF1F4",
            200: "#E5E8EC",
            300: "#A9ACB0",
            400: "#696E75",
            500: "#3C4146",
            600: "#2D3237",
            700: "#1F2328",
            800: "#15191E",
            900: "#000000",
          },
        },
        rainbowkit: {
          dark: "#1a1b1f",
          secondary: "#24262a",
          profileAction: "rgba(224, 232, 255, 0.1)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
