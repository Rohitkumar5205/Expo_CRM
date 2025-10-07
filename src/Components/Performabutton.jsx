import React, { useRef } from 'react'
import { MdOutlineModeEdit } from "react-icons/md";
import { FaPrint } from "react-icons/fa";
import {useReactToPrint} from 'react-to-print'

import { Link } from 'react-router-dom';
import InvoiceFormButton from './InvoiceFormButton';

const Performabutton = () => {

const sameRef = useRef();

// print function 

const handleprint=useReactToPrint({
    contentRef:sameRef ,
    documentTitle:"invoice",
});



  return (
    <>
    <div className='w-full h-10  flex justify-between bg-white px-3 py-2 '>
      <h1 className='text-xl text-gray-600'>ESTIMATE</h1>
      <div className='flex gap-2'>
         <Link to='/invoice' state={{heading:"Update Invoice"}} ><button  className='w-fit h-fit border border-[#3598dc] text-[#3598dc] text-[12px] hover:text-white hover:bg-[#3598dc] px-2 py-1  cursor-pointer'><MdOutlineModeEdit /></button></Link>
        <button onClick={handleprint} className='w-fit h-fit border border-gray-300 px-2 py-1 text-xs cursor-pointer'><FaPrint /></button>
      </div>
    </div>
    <div ref={sameRef}>
        <InvoiceFormButton />
    </div>
    
    </>
  )
}

export default Performabutton
