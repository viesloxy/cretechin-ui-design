"use client";

import {
  Navbar,
  HeroStats,
  MarqueeText,
  LogoTicker,
  NewCourses,
  DigitalAssets,
  CareerPaths,
  Statistics,
  Testimonials,
  FAQ,
  Newsletter,
  Footer,
} from "@/components/landing-page";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroStats />
      <MarqueeText />
      <LogoTicker />
      <NewCourses />
      <DigitalAssets />
      <CareerPaths />
      <Statistics />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  );
}