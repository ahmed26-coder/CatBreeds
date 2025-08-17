import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/nav";
import { FavoritesProvider } from "@/components/favorites-context";
import { VotingProvider } from "@/components/voting-context";
import { UserFooter } from "@/components/footer";
import { AuthProvider } from "@/lib/auth-context";
import GuestFooter from "@/components/guest-footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "CatBreeds - Discover Amazing Cat Breeds",
  description: "Explore, vote, and save your favorite cat breeds from around the world",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-body antialiased`}>
        <AuthProvider> {/* 👈 ضيفه هنا */}
          <FavoritesProvider>
            <Navigation />
            <VotingProvider>{children}</VotingProvider>
            <UserFooter />
            <GuestFooter />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
