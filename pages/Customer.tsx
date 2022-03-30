import { useEffect, useState } from "react";
import { customerDisplay, ElementType } from ".";
import styles from '../styles/Customer.module.css'

function Customer() {
  const [customerDisplay,setCustomerDisplay] = useState<customerDisplay>()
  useEffect(()=>{
    setCustomerDisplay(JSON.parse(localStorage.customerDisplay))
  },[])
  useEffect(()=> {
    console.log(customerDisplay);
  },[customerDisplay])
  return ( 
    <div className={styles.main}>
      {(customerDisplay as customerDisplay)?.length !== undefined && (customerDisplay as customerDisplay).map((element)=> {
        if(element.type === ElementType.ElementParagraph){
          return <p className={styles.element}>{element.text}</p>
        } else {
          return <button className={styles.element} onClick={()=>{alert(element.msg)}}>{element.text}</button>
        }
      })}
    </div> 
  );
}


export default Customer;