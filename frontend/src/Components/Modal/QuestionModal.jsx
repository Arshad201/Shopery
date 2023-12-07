import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../features/user/userAction";
import btnLoader from '../../assets/icons/btn-loader.png';
import { handleQuestionModal, handleUserAlert } from "../../features/user/userSlice";

const QuestionModal = ({question}) => {
  const dispatch = useDispatch();
  const {status} = useSelector(state=>state.userReducer.user);

  const handleLogout = () =>{

    dispatch(logout());
    dispatch(handleQuestionModal({show: false, question: ''}));
    dispatch(handleUserAlert({show: true, type: "success", msg: "Logged Out successfully!"}));

  }
  return (
    <div className="question-modal">
      <div className="modal-box">
        <p className="l-fontsize fw-500">{question}?</p>
        <div>
            <button className="btn" onClick={handleLogout}>
            {status === 'loading' && <img src={btnLoader} />} Yes
            </button>
            <button className="btn noBtn" onClick={()=>dispatch(handleQuestionModal({show: false}))}>No</button>
        </div>
      </div>
    </div>
  )
}

export default QuestionModal
