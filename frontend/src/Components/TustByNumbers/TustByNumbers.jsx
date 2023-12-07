import { useEffect, useState } from 'react';
import './TurstByNumbers.css';

const TustByNumbers = () => {

  const [nums, setNums] = useState({
    years: 0,
    customer: 0,
    members: 0,
    monthlyOrders: 0
  })


  useEffect(()=>{
    
    if(nums.years !== 37 && nums.customer !== 500){
      
        setInterval(()=>{
          setNums((prev)=>{
            return {
              years: (prev.years < 37) ? prev.years+=1 : prev.years,
              customer: (prev.customer < 500) ? prev.customer+=1 : prev.customer,
              members: (prev.members < 28) ? prev.members+=1 : prev.members,
              monthlyOrders: (prev.monthlyOrders < 750) ? prev.monthlyOrders+=1 : prev.monthlyOrders,
            }
          }) 
        }, 100);
    }

  },[]);

  return (
    <section className="trust-by-number">
      <div className="numbers">
        <div className="num-box">
            <span>{nums.years}+</span>
            <p className="l-fontsize fw-400">Years of Hard Work</p>
        </div>
        <div className="num-box">
            <span>{nums.customer}k+</span>
            <p className="l-fontsize fw-400">Happy Customer</p>
        </div>
        <div className="num-box">
            <span>{nums.members}</span>
            <p className="l-fontsize fw-400">Qualified Team Member</p>
        </div>
        <div className="num-box">
            <span>{nums.monthlyOrders}k+</span>
            <p className="l-fontsize fw-400">Monthly Orders</p>
        </div>
      </div>
    </section>
  )
}

export default TustByNumbers
