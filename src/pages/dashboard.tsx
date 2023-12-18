import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Seo from "@/components/common/Seo";
import { SEO_CONFIG } from "@/utils/seoConfig";
import CommonHero from "@/components/common/CommonHero";

import Highlights from "@/components/dashboard/Highlights";
import Teammates from "@/components/dashboard/Teammates";
import PlayerStats from "@/components/dashboard/PlayerStats";
import PlayerInfo from "@/components/dashboard/PlayerInfo";


const Dashboard = () => {
    const hero = {
        heading: "Dashboard",
        title: "Your Title Here",
        subtitle: "Your Subtitle Here",
      };
    return (
        <>
          <Seo pageSEO={SEO_CONFIG.dashboard} />
          <div className="overflow_hidden">
            <div className=" bg-about-hero bg-no-repeat bg-cover">
              <Header />
              <CommonHero hero={hero} />
            </div>
            <Highlights/>
            <Teammates/>
            <PlayerStats />
            <PlayerInfo/>
           <Footer/>
          </div>
        </>
      );
    };

    export default Dashboard;