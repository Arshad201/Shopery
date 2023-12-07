import './PageHeader.css';
import HomeIcon from '../../assets/icons/home.svg';
import ArrowIcon from '../../assets/icons/breadcrumbs-arrow.svg';
import { Link, useLocation } from 'react-router-dom'

const PageHeader = () => {

    const location = useLocation();
    const breadcrumbs = location.pathname.split("/").filter((i)=>i!=='');
    let myUrl = "";

  return (
      <div className="page-header">
        <div>
            <Link to='/'><img className='homeIcon' src={HomeIcon} alt="Home" /></Link>
            <img src={ArrowIcon} alt=">" />
            {
                breadcrumbs && breadcrumbs.map((i, index)=>{
                    myUrl = myUrl + "/" + i
                return<div key={index}>
                    <Link className={`m-fontsize fw-400 ${i===breadcrumbs[breadcrumbs.length-1] ? 'activeCrumbs' : 'inActiveCrumbs'}`} to={myUrl}>{i}</Link>
                    {index !== breadcrumbs.length-1 && <img src={ArrowIcon} alt=">" />}
                </div>
                })
            }
      </div>
      </div>
  )
}

export default PageHeader
