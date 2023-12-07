import './Modal.css';
import close from '../../assets/icons/close.svg';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useDispatch, useSelector } from 'react-redux';
import { handleModal } from '../../features/product/productSlice';
import { useEffect, useState } from 'react';
import { avatarClientHanlder, handleUserAlert } from '../../features/user/userSlice';

const AvatarModal = () => {

  const dispatch = useDispatch();
  const { status, data } = useSelector((state)=>state.userReducer.user);
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
        let base64String = cropper.getCroppedCanvas().toDataURL();
        dispatch(avatarClientHanlder(base64String));
        dispatch(handleUserAlert({show: true, type: 'success', msg: 'Image cropped!'}))
        dispatch(handleModal({show: false, modalType: 'avatarModal'}));
    }
  };


  const setImageOnRender = () =>{
    
    if(status === 'success'){
        setImage(data.avatar.url);
    }

  }

  useEffect(()=>{
    
    setImageOnRender();

  }, [status]);
  return (
    <div className='quick-view-modal'>
    <div className="modal">
      <img src={close} alt="close" className='closeModal' 
      onClick={()=>dispatch(handleModal({show: false, modalType: 'avatarModal'}))}/>
      <div className="avatarUploadContainer">
          <input type="file" name="profile" id="profile" onChange={(e)=>onChange(e)}  />
          {status === 'success' && <div className="cropper-box">
            <div className="cropper">
              <Cropper
              style={{ height: '100%', width: "100%" }}
              zoomTo={0}
              initialAspectRatio={1}
              aspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />
            </div>
            <div className="cropper-output">
              {/* Cropper Output  */}
              <div className="img-preview" style={{ width: "100%", float: "left", height: "300px" }} />
            </div>
          </div>}
          <button className="btn" onClick={getCropData}>Crop</button>
      </div>
    </div>
  </div>
  )
}

export default AvatarModal
