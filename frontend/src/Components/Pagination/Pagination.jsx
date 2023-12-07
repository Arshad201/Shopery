import './Pagination.css';
import PrevBtnImage from '../../assets/icons/prevPage.svg';
import NextBtnImage from '../../assets/icons/nextPage.svg';


const Pagination = ({pages, currentPage, queries, setQueries}) => {

    //Create Array of page for mapping all pages in button
    const ArrayOfPage = Array.from({ length: pages }, (_, index) => index + 1);


  return (
    <div className='pagination'>
        <button className={`stepsbtn ${currentPage === 1 && 'disableBtn'}`} onClick={queries.currentPage!=1 ? ()=>setQueries({...queries, currentPage: currentPage-1}) : ()=>{}} >
            <img src={PrevBtnImage} alt="Previous" />
        </button>
        {
            ArrayOfPage.map((i)=>

                <button 
                key={i} 
                className={`btn ${i === currentPage && 'activePagination'}`} 
                onClick={()=>setQueries({...queries, currentPage: i})}>
                    {i}
                </button>
            
            )
        }
  
        <button className={`stepsbtn ${currentPage === pages && 'disableBtn'}`} onClick={queries.currentPage!=pages ? ()=>setQueries({...queries, currentPage: currentPage+1}) : ()=>{}} >
            <img src={NextBtnImage} alt="Previous" />
        </button>
    </div>
  )
}

export default Pagination
