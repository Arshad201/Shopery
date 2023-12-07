import Skeleton from "react-loading-skeleton";
import '../style.css';

const ProductCardSkeleten = () => {
  return (
    <div className='product-card' >
    <div className="productImg">
      <Skeleton height={250} style={{width: '100%'}}/>
    </div>
    <div className="product-card-footer">
      <div className="product-meta">
          <Skeleton height={12} width={100}/>
          <div className='prices'>
            <Skeleton height={22} width={50}/>
          </div>
          <div className="ratings">
              <Skeleton width={14} height={14} circle={true}/>
              <Skeleton width={14} height={14} circle={true}/>
              <Skeleton width={14} height={14} circle={true}/>
              <Skeleton width={14} height={14} circle={true}/>
              <Skeleton width={14} height={14} circle={true}/>
          </div>
      </div>
      <div className="iconBtn">
        <Skeleton width={30} height={30} circle={true}/>
      </div>
    </div>
  </div>
  )
}

export default ProductCardSkeleten
