import Hero from "@/components/Home/Hero";
import Popular from "@/components/Home/Popular";
import Standout from "@/components/Home/Standout";
import Story from "@/components/Home/Story";
import Testimonials from "@/components/Home/Testimonials";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const refPopular = useRef(null);
  const inViewPopular = useInView(refPopular, { once: true });

  const refStandout = useRef(null);
  const inViewStandout = useInView(refStandout, { once: true });

  const refTestimonials = useRef(null);
  const inViewTestimonials = useInView(refTestimonials, { once: true });

  const refStory = useRef(null);
  const inViewStory = useInView(refStory, { once: true });

  return (
    <div className="flex flex-col gap-16 h-auto xl:px-32 lg:px-16 px-8 pt-8 overflow-x-hidden">
      <Hero />
      <div id="menu" className="mb-10" ref={refPopular} />
      {!inViewPopular ? (
        <div className="lg:mt-32" />
      ) : (
        <Popular inView={inViewPopular} />
      )}
      <div id="offers" className="mb-10" ref={refStandout} />
      {!inViewStandout ? (
        <div className="lg:mt-32" />
      ) : (
        <Standout inView={inViewStandout} />
      )}
      <div ref={refTestimonials} />
      {!inViewTestimonials ? (
        <div className="lg:mt-32" />
      ) : (
        <Testimonials inView={inViewTestimonials} />
      )}
      <div id="services" className="mb-10" ref={refStory} />
      {!inViewStory ? (
        <div className="lg:mt-32" />
      ) : (
        <Story inView={inViewStory} />
      )}
    </div>
  );
}
