import Backtotop from "../../../components/common/Backtotop";
import CommonHero from "../../../components/common/CommonHero";
import Footer from "../../../components/common/Footer";
import Header from "../../../components/common/Header";
import Seo from "../../../components/common/Seo";
import NewsInsightsCards from "../../../components/news-insights/NewsInsightsCards";
import MasteringGame from "../../../components/news-insights/MasteringGames";
import RecentNewsInsights from "../../../components/news-insights/RecentNewsInsights";

const Newsinsight = () => {
    // SEO
    const hero = {
        heading: "News and Insights",
        title: "Your Title Here",
        subtitle: "Your Subtitle Here",
    };
    const pageSEO = {
        // SEO TITLE
        title: "News and Insights",

        // SEO DESCRIPTION
        description: "news_meta_img",

        // SEO WEBSITE URL
        websiteURL: "https://athletifi-web.vercel.app/news-insight",

        // SEO IMAGE
        image: "/news_meta_img.png",
    };
    return (
        <>
            {/* SEO */}
            <Seo pageSEO={pageSEO} />
            <div className="overflow_hidden">
                <div className="bg-new-hero-img bg-center bg-no-repeat bg-cover">
                    <Header />
                    <CommonHero hero={hero} />
                </div>
                <MasteringGame />
                {/* <RecentNewsInsights /> */}
                
                <NewsInsightsCards/>
                <Footer />
                <Backtotop />
            </div>
        </>
    );
};

export default Newsinsight;
