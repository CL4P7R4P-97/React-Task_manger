import './confirm.css';

const Confirm = ({modalTitle, modalMessage, modalAction, modalActionText, onCloseModal}) => {





  return (
    <div className='confirm'>
      <div className='confirm-modal'>

       <div className='header'>
        <span className='title'>
        {modalTitle}
        
        </span>
        <button className='close' onClick={onCloseModal}>&times;</button>
       </div>

       <div className='content'>
        <p>{modalMessage}</p>
       </div>

       <div className='buttons'>
        <button className='btn btn-ok' onClick={modalAction}>{modalActionText}</button>
        <button className='btn btn-cancel' onClick={onCloseModal}>Cancel</button>
       </div>
        </div>
    </div>
  )
}
 
export default Confirm;
