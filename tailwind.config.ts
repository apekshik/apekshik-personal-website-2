import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        bebas: ["var(--font-bebas-neue)"],
        abril_fatface: ["var(--font-abril-fatface)"],
        sans: ['Helvetica', 'Arial', 'sans-serif'], // Set Helvetica as the default body font
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#ffffff', // Default text color
            fontFamily: 'Helvetica, Arial, sans-serif', // Default body font
            textAlign: 'justify', // Justify text by default
            a: {
              color: '#1E90FF', // Link color
              '&:hover': {
                color: '#ff4500', // Link hover color
              },
            },
            h1: {
              fontFamily: 'var(--font-bebas-neue)', // Font family for h1
              fontWeight: '700', // Font weight for h1
              color: '#ffffff', // Color for h1
              marginBottom: '0.5em', // Margin bottom for h1
            },
            h2: {
              fontFamily: 'var(--font-bebas-neue)', // Font family for h2
              fontWeight: '600', // Font weight for h2
              color: '#ffffff', // Color for h2
              marginBottom: '0.5em', // Margin bottom for h2
            },
            h3: {
              fontFamily: 'var(--font-bebas-neue)', // Font family for h3
              fontWeight: '500', // Font weight for h3
              color: '#ffffff', // Color for h3
              marginBottom: '0.5em', // Margin bottom for h3
            },
            h4: {
              fontFamily: 'var(--font-bebas-neue)', // Font family for h4
              fontWeight: '500', // Font weight for h4
              color: '#ffffff', // Color for h4
              marginBottom: '0.5em', // Margin bottom for h4
            },
            h5: {
              fontFamily: 'var(--font-bebas-neue)', // Font family for h5
              fontWeight: '500', // Font weight for h5
              color: '#ffffff', // Color for h5
              marginBottom: '0.5em', // Margin bottom for h5
            },
            h6: {
              fontFamily: 'var(--font-bebas-neue)', // Font family for h6
              fontWeight: '500', // Font weight for h6
              color: '#ffffff', // Color for h6
              marginBottom: '0.5em', // Margin bottom for h6
            },
            code: {
              color: '#ff4500', // Color for inline code
              backgroundColor: '#282c2e', // Background color for inline code
              padding: '2px 4px', // Padding for inline code
              borderRadius: '3px', // Border radius for inline code
            },
            'pre code': {
              backgroundColor: 'transparent', // Background color for code in pre
              padding: '0', // Remove padding for code in pre
            },
            pre: {
              backgroundColor: '#2d2d2d', // Background color for pre
              padding: '1em', // Padding for pre
              borderRadius: '8px', // Border radius for pre
              color: '#ffffff', // Color for text in pre
            },
            blockquote: {
              borderLeftColor: '#ff4500', // Border color for blockquote
              paddingLeft: '1em', // Padding left for blockquote
              fontStyle: 'italic', // Italicize blockquote text
              color: '#d1d5db', // Text color for blockquote
            },
            ul: {
              listStyleType: 'disc', // List style for unordered lists
              paddingLeft: '1.5em', // Padding left for unordered lists
            },
            ol: {
              listStyleType: 'decimal', // List style for ordered lists
              paddingLeft: '1.5em', // Padding left for ordered lists
            },
            strong: {
              color: '#ffffff', // Color for strong text
            },
            hr: {
              borderColor: '#ffffff', // Color for horizontal rules
              borderTopWidth: '1px', // Width for horizontal rules
            },
            table: {
              width: '100%', // Width for tables
              tableLayout: 'auto', // Table layout
              marginTop: '1em', // Margin top for tables
              marginBottom: '1em', // Margin bottom for tables
              th: {
                backgroundColor: '#2d2d2d', // Background color for table headers
                color: '#ffffff', // Text color for table headers
                padding: '0.5em', // Padding for table headers
              },
              td: {
                backgroundColor: '#1a1a1a', // Background color for table cells
                color: '#d1d5db', // Text color for table cells
                padding: '0.5em', // Padding for table cells
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    nextui(),
  ],
};

export default config;
