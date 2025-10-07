import React, { useRef } from 'react'
import mainpic from '../assets/images/header.png'
import { FaPrint } from "react-icons/fa";
import {useReactToPrint} from 'react-to-print'
import InvoiceForm from './InvoiceForm';

const PerformaInvoice = () => {

const sameRef = useRef();

// print function 

const handleprint=useReactToPrint({
    contentRef:sameRef ,
    documentTitle:"invoice",
});



  return (
    <>
    <div className='w-full h-10  flex justify-between bg-white px-3 py-2 '>
      <h1>ACCOUNT SECTION || PERFORMA INVOICE</h1>
      <button onClick={handleprint} className='w-fit h-fit border border-gray-300 px-2 py-1 text-xs cursor-pointer'><FaPrint /></button>
    </div>
    <div ref={sameRef}>
        <InvoiceForm/>
    </div>
    
    </>
  )
}

export default PerformaInvoice
