import './Home.css';
import HeroSlider from '../../Components/HeroSlider/HeroSlider.jsx';
import Reliable from '../../Components/Reliable/Reliable.jsx';
import FeaturedProducts from '../../Components/FeaturedProducts/FeaturedProducts.jsx';
import ShopByCategoris from '../../Components/ShopByCategoris/ShopByCategoris.jsx';
import Trust from '../../Components/Trust/Trust.jsx';
import TustByNumbers from '../../Components/TustByNumbers/TustByNumbers.jsx';
import PromotionalCardHome from '../../Components/PromotionalCardHome/PromotionalCardHome.jsx';
import ProductCardSM from '../../Components/ProductCardSM/ProductCardSM.jsx';
import Testimonials from '../../Components/Testimonials/Testimonials.jsx';
import ShortInfoWithBrandsAndNewletter from '../../Components/ShortInfoWithBrandsAndNewletter/ShortInfoWithBrandsAndNewletter.jsx';

const Home = () => {

  return (
    <>
      <HeroSlider/>
      <Reliable/>
      <FeaturedProducts/>
      <ShopByCategoris/>
      <Trust/>
      <TustByNumbers/>
      <PromotionalCardHome/>
      <Testimonials/>
      <ShortInfoWithBrandsAndNewletter/>
    </>
  )
}

export default Home
