import './Modal.css';
import close from '../../assets/icons/close.svg';
import ProductShortInfo from '../ProductShortInfo/ProductShortInfo';
import { useDispatch, useSelector } from 'react-redux';
import { handleModal} from '../../features/product/productSlice';

const ProductModal = () => {

    const dispatch = useDispatch();
    const { data, status} = useSelector((state)=>state.productReducer.products.singleProduct);
  
  
  return (
    <div className='quick-view-modal'>
      <div className="modal">
        <img src={close} alt="close" className='closeModal' 
        onClick={
          ()=>dispatch(handleModal({show: false, modalType: 'productModal'}))}/>
        {status === 'succeed' && <ProductShortInfo data={data}/>}
      </div>
    </div>
  )
}

export default ProductModal
