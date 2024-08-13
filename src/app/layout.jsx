import { Inter } from "next/font/google";
import "./globals.css";
import { sitemetadata } from "@/lib/siteMetadata";
import "remixicon/fonts/remixicon.css";
import SearchBox from "@/components/SearchBox";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(sitemetadata.siteUrl),
  title: "Articon Blog",
  description:
    "AI and datascience blog for studencts from the department of AD",

  openGraph: {
    title: sitemetadata.title,
    description: sitemetadata.description,
    url: sitemetadata.url,
    siteName: sitemetadata.title,
    images: [sitemetadata.socialBanner],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-[#F9F9F9] w-fit">
          <SearchBox />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
