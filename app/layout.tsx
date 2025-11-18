import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://polkamesh.vercel.app";
const siteTitle = "Polkasmesh | The Decentralized AI Compute & Data Mesh for Polkadot";
const siteDescription = "The Decentralized AI Compute & Data Mesh for Polkadot - Powering Smart Cities & DeFi. A privacy-first, cross-chain AI marketplace built on Polkadot's multichain architecture. Deploy AI agents, monetize IoT data, and protect against MEV on a permissionless mesh network.";
const ogImageUrl = `${siteUrl}/Homepage.png`;
const logoImageUrl = `${siteUrl}/logopolkadot.jpeg`;
const homepageImageUrl = `${siteUrl}/Homepage.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Polkasmesh",
  },
  description: siteDescription,
  keywords: [
    "Polkasmesh",
    "Polkadot",
    "AI Mesh",
    "DeFi",
    "Smart Cities",
    "Blockchain",
    "Web3",
    "Decentralized Compute",
    "MEV Protection",
    "Cross-Chain",
    "AI Marketplace",
    "IoT Data",
    "DePIN",
    "Phala Network",
    "Acurast",
    "XCM",
    "Parachain",
    "Decentralized AI",
    "Data Mesh",
  ],
  authors: [{ name: "Polkasmesh Team", url: siteUrl }],
  creator: "Polkasmesh",
  publisher: "Polkasmesh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: "Polkasmesh",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Polkasmesh - The Decentralized AI Compute & Data Mesh for Polkadot powering Smart Cities & DeFi",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
    creator: "@Polkasmesh",
    site: "@Polkasmesh",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logopolkadot.jpeg", sizes: "any" },
      { url: "/logopolkadot.jpeg", sizes: "32x32" },
      { url: "/logopolkadot.jpeg", sizes: "16x16" },
    ],
    apple: [
      { url: "/logopolkadot.jpeg", sizes: "180x180" },
    ],
    shortcut: ["/logopolkadot.jpeg"],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  other: {
    "og:logo": logoImageUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Polkasmesh",
    alternateName: "Polkadot AI Mesh",
    description: siteDescription,
    url: siteUrl,
    logo: logoImageUrl,
    image: ogImageUrl,
    sameAs: [
      "https://twitter.com/Polkasmesh",
      "https://github.com/polkasmesh",
      "https://discord.gg/polkasmesh",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      url: `${siteUrl}/#contact`,
    },
    slogan: "The Decentralized AI Compute & Data Mesh for Polkadot",
  };

  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/logopolkadot.jpeg" type="image/jpeg" />
        <link rel="icon" href="/logopolkadot.jpeg" sizes="32x32" type="image/jpeg" />
        <link rel="icon" href="/logopolkadot.jpeg" sizes="16x16" type="image/jpeg" />
        <link rel="shortcut icon" href="/logopolkadot.jpeg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logopolkadot.jpeg" />
        
        {/* Additional Open Graph tags for better platform support */}
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="Polkasmesh" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content="polkamesh.vercel.app" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:creator" content="@Polkasmesh" />
        <meta name="twitter:site" content="@Polkasmesh" />
        
        {/* WhatsApp specific - uses smaller logo for better preview */}
        <meta property="og:image:alt" content="Polkasmesh Logo" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
