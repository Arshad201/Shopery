import { useState } from 'react';
import './ProductImageSlider.css';

const ProductImageSlider = ({images}) => {

    const [currentImg, setCurrentImg] = useState(images[0].url)
  return (
    <div className='product-img-slider'>
     <div className="images">
        {
        images.map((i, index)=><div key={index} className={`img-box ${i === currentImg && 'selectedProductImg'}`}>
            <img src={i.url} alt="catalogue1" onClick={()=>setCurrentImg(i.url)} />
        </div>)
        }
     </div>
     <div className="active-img">
        <img src={currentImg} alt="" />
     </div>
    </div>
  )
}

export default ProductImageSlider
