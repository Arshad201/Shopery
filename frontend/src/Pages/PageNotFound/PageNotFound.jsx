import './PageNotFound.css';
import { Link } from "react-router-dom"
import PageHeader from "../../Components/PageHeader/PageHeader"
import pageNotFoundImg from '../../assets/images/404.png'

const PageNotFound = () => {
  return (
    <section className='page-not-found'>
        <PageHeader/>
        <div className="wrapper">
            <img src={pageNotFoundImg} alt="page not found" />
            <h1 className="heading5">Oops! page not found</h1>
            <p className="s-fontsize fw-400">Ut consequat ac tortor eu vehicula. Aenean accumsan purus eros. Maecenas sagittis tortor at metus mollis</p>
            <Link className="btn" to={'/'}>Back to Home</Link>
        </div>
    </section>
  )
}

export default PageNotFound
