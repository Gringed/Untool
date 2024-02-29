import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-wallpaper bg-wallpaperPosition">
      <div className="background">
        <svg
          id="10015.io"
          viewBox="0 0 480 480"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgba(195, 108, 222, 1)"
            d="M396,268Q404,296,400.5,329.5Q397,363,379.5,395Q362,427,324.5,427Q287,427,257.5,408.5Q228,390,203,385.5Q178,381,158.5,365.5Q139,350,91,348Q43,346,45.5,309Q48,272,55,241Q62,210,49.5,170Q37,130,82.5,124.5Q128,119,146.5,93.5Q165,68,194.5,56Q224,44,256.5,44.5Q289,45,312,69.5Q335,94,353,116Q371,138,403.5,155.5Q436,173,412,206.5Q388,240,396,268Z"
          />
        </svg>
        <svg
          id="10015.io"
          viewBox="0 0 480 480"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgba(145, 142, 254, 1)"
            d="M400,283Q404,326,363,342.5Q322,359,295.5,418.5Q269,478,230,423Q191,368,131.5,378Q72,388,96,329Q120,270,90.5,233Q61,196,90.5,165Q120,134,148,103Q176,72,221,49Q266,26,291,78.5Q316,131,383.5,130Q451,129,423.5,184.5Q396,240,400,283Z"
          />
        </svg>
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
        <Footer />
      </div>
    </div>
  );
};

export default MarketingLayout;
