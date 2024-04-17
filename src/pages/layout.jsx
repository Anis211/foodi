import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  return (
    <div className="h-auto bg-[#FCFCFC]">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
