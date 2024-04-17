import Hero from "@/components/Home/Hero";
import Popular from "@/components/Home/Popular";
import Standout from "@/components/Home/Standout";
import Story from "@/components/Home/Story";
import Testimonials from "@/components/Home/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 h-auto xl:px-32 lg:px-16 px-8 pt-8 overflow-x-hidden">
      <Hero />
      <div id="menu" className="mb-10" />
      <Popular />
      <div id="offers" className="mb-10" />
      <Standout />
      <Testimonials />
      <div id="services" className="mb-10" />
      <Story />
    </div>
  );
}
