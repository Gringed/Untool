import Features from "./_components/Features";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <div className="background absolute">
        <div className="lg:block hidden  bg-secondary"></div>
        <div className="lg:block hidden bg-secondary"></div>
        <div className="lg:block hidden bg-secondary"></div>
        <div className="lg:block hidden bg-secondary"></div>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className=" z-50 relative">
        <Navbar />
        <main className=" h-screen flex justify-center items-center flex-col self-center">
          {children}
        </main>
        <div className="border-t-8 border-secondary">
          <div className="mx-auto px-4 md:max-w-screen-2xl gap-16 sm:gap-y-24 flex flex-col">
            <Features />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MarketingLayout;
