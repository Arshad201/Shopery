import PageHeader from '../../Components/PageHeader/PageHeader';
import faqsImg from '../../assets/images/faqs.png';
import  './Faqs.css';

const Faqs = () => {
  return (
    <section className='faqs'>
      <PageHeader/>
      <div className="wrapper">
        <div className="faqs-component">
            <h2 className="heading4">
            Welcome, Let’s Talk <br/>About Our Ecobazar
            </h2>
        </div>
        <div className="faq-img-box">
            <img src={faqsImg} alt="" />
        </div>
      </div>
    </section>
  )
}

export default Faqs
