import check from '../../assets/icons/check.svg';
import alert from '../../assets/icons/alert.png';

const AlertModal = ({alertMsg, type}) => {
  return (
    <div className={`alert-modal ${type === 'success' ? 'success': 'error'}`} >
        <div className="alert-modal-box">
            {type === 'success' ? <img src={check} alt="" />
            : <img className='alertImg' src={alert} alt=''/>
            }
            <span className="s-fontsize fw-500">{alertMsg}!</span>
        </div>      
    </div>
  )
}

export default AlertModal
