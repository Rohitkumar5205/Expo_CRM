import React, { useRef } from 'react'
import mainpic from '/header.png'
import { FaPrint } from "react-icons/fa";
import {useReactToPrint} from 'react-to-print'

const PerformaInvoiceDetails = () => {

const sameRef = useRef();

// print function 

const handleprint=useReactToPrint({
    content: () => sameRef.current, // Changed from contentRef to content
    documentTitle:"invoice",
});

  return (
    <>
    <div className='w-full h-10 flex justify-between bg-white px-3 py-2 '>
      <h1>ACCOUNT SECTION || PERFORMA INVOICE</h1>
      <button onClick={handleprint} className='w-fit h-fit border border-gray-300 px-2 py-1 text-xs cursor-pointer'><FaPrint /></button>
    </div>
      <div className="bg-gray-100 p-6 min-h-screen ">
      <div ref={sameRef} className="max-w-6xl mx-auto bg-white px-6 py-1">
        <img className=' my-6' src={mainpic} alt="" />
        
        {/* Client + Invoice Info */}
                {/* Client and Estimate Details Table */}
                <table className="w-full border-collapse border mb-3">
                    <thead>
                        <tr className="bg-[#818481]">
                            <th colSpan="8" className="text-center py-1 text-[#1d2129] text-xs font-semibold">Client Proforma Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-1 py-1 text-xs font-semibold">Client Name</td>
                            <td className="border px-1 py-1 text-xs">The-Pahari-Life</td>
                            <td className="border px-1 py-1 text-xs font-semibold">Contact Person</td>
                            <td className="border px-1 py-1 text-xs">Amit Joshi</td>
                            <td className="border px-1 py-1 text-xs font-semibold">PF Invoice No.</td>
                            <td className="border px-1 py-1 text-xs">NGW/25-26/PI/116</td>
                        </tr>
                        <tr>
                            <td className="border px-1 py-1 text-xs font-semibold">Client Address</td>
                            <td className="border px-1 py-1 text-xs" rowSpan="2">Naukuchiatal - Bhimtal Road, Bhimtal, Nainital-263136, Uttarakhand, India</td>
                            <td className="border px-1 py-1 text-xs font-semibold">Designation</td>
                            <td className="border px-1 py-1 text-xs">Founder</td>
                            <td className="border px-1 py-1 text-xs font-semibold">PF Invoice Date</td>
                            <td className="border px-1 py-1 text-xs">06 Sep 25</td>
                        </tr>
                        <tr>
                            <td className="border px-1 py-1 text-xs font-semibold">PAN No.</td>
                            <td className="border px-1 py-1 text-xs font-semibold">Email Id</td>
                            <td className="border px-1 py-1 text-xs">joanjoshi999@gmail.com</td>
                            <td className="border px-1 py-1 text-xs font-semibold">Place of Supply</td>
                            <td className="border px-1 py-1 text-xs">Nainital</td>
                        </tr>
                        <tr>
                            <td className="border px-1 py-1 text-xs font-semibold">GSTIN</td>
                            <td className="border px-1 py-1 text-xs">05AGCPJ7208D1ZW</td>
                            <td className="border px-1 py-1 text-xs font-semibold">Contact No.</td>
                            <td className="border px-1 py-1 text-xs">9868082880</td>
                            <td className="border px-1 py-1 text-xs font-semibold">State of Supply</td>
                            <td className="border px-1 py-1 text-xs">Uttarakhand</td>
                        </tr>
                    </tbody>
                </table>

                {/* Main Items Table */}
                <table className="w-full border-collapse border mb-3">
                    <thead className="bg-[#818481]">
                        <tr>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-12">S.No.</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129]">Particulars</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-20">HSN Code</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-12">Qty.</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-12">Size</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-12">Unit</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-16">Rate</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-20">Discount</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-20">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-2 py-1 text-xs text-center">1</td>
                            <td className="border px-2 py-1 text-xs">Organic Expo 2026<br />Stall Number 106 Booked</td>
                            <td className="border px-2 py-1 text-xs text-center">998596</td>
                            <td className="border px-2 py-1 text-xs text-center">1</td>
                            <td className="border px-2 py-1 text-xs text-center">6</td>
                            <td className="border px-2 py-1 text-xs text-center">L.S</td>
                            <td className="border px-2 py-1 text-xs text-center">11700</td>
                            <td className="border px-2 py-1 text-xs text-center">14%</td>
                            <td className="border px-2 py-1 text-xs text-center">59999</td>
                        </tr>
                        {/* Empty rows for spacing */}
                        {[...Array(20)].map((_, i) => (
                            <tr key={i} style={{height: '30px'}}>
                                <td className="border-t border-b border-l border-r border-t-gray-300 border-b-gray-300 border-l-black border-r-black px-2 py-1 text-xs"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-300 border-b-gray-300 border-l-black border-r-black px-2 py-1 text-xs"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-300 border-b-gray-300 border-l-black border-r-black px-2 py-1 text-xs"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-300 border-b-gray-300 border-l-black border-r-black px-2 py-1 text-xs"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-300 border-b-gray-300 border-l-black border-r-black px-2 py-1 text-xs"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-300 border-b-gray-300 border-l-black border-r-black px-2 py-1 text-xs"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-300 border-b-gray-300 border-l-black border-r-black px-2 py-1 text-xs"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-300 border-b-gray-300 border-l-black border-r-black px-2 py-1 text-xs"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-300 border-b-gray-300 border-l-black border-r-black px-2 py-1 text-xs"></td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="8" className="border px-2 py-1 text-xs text-right font-semibold">Total Taxable Value</td>
                            <td className="border px-2 py-1 text-xs text-center font-semibold">59999</td>
                        </tr>
                    </tbody>
                </table>

                {/* HSN/SAC Details and Summary */}
                <table className="w-full border-collapse border mb-3">
                    <thead className="bg-[#818481]">
                        <tr>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-30">S.No.</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-auto">HSN/SAC Details</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-12">Qty.</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-24">Taxable Value</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-20">GST Rate</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-24">GST Amount</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] w-24">Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-2 py-1 text-xs text-center">1</td>
                            <td className="border px-2 py-1 text-xs text-center">998596</td>
                            <td className="border px-2 py-1 text-xs text-center">1</td>
                            <td className="border px-2 py-1 text-xs text-center">59999</td>
                            <td className="border px-2 py-1 text-xs text-center">18%</td>
                            <td className="border px-2 py-1 text-xs text-center">10799</td>
                            <td className="border px-2 py-1 text-xs text-center">70798</td>
                        </tr>
                        <tr>
                            <td colSpan="1" className="border px-2 py-1 text-xs font-semibold">Amount in Words</td>
                            <td colSpan="4" className="border px-2 py-1 text-xs">Seventy Thousand, Seven Hundred Ninety Nine Rupees Only</td>
                            <td className="border text-center align-middle text-xs font-semibold">
                                Grand Total 
                            </td>
                            <td className="border text-center align-middle text-xs font-semibold">
                                70799
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="7" className=" border px-2 py-1 text-xs font-semibold align-top">Terms and Conditions :
                                    <div style={{fontSize: '10px', lineHeight: '1.3'}}>
                                        1. Payments should be made by D.D/IMPS/NEFT/RTGS payable at New Delhi, favoring of Namo Gange Wellness Pvt Ltd.<br />
                                        2. All disputes are subject to Delhi Jurisdiction.<br />
                                        3. Proforma Invoice is subject to issue of Final Invoice.<br />
                                        4. Any objection/correction/change shall be incorporated in Final Invoice.
                                    </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Bank Details and Signatures Section */}
                <table className="w-full border-collapse border border-gray-400">
                    <thead className="bg-[#818481]">
                        <tr>
                            <th colSpan="2" className="border px-2 py-1 text-xs text-[#1D2129] text-left">Namo Gange Wellness Pvt. Ltd. Bank Details</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] text-center">Client Signature</th>
                            <th className="border px-2 py-1 text-xs text-[#1D2129] text-center">For Namo Gange Wellness Pvt. Ltd.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=" px-2 py-1 text-xs font-semibold w-24">Bank Name</td>
                            <td className=" px-2 py-1 text-xs">: Kotak Mahindra Bank</td>
                            <td rowSpan="4" className=" border px-2 text-xs text-center align-bottom" style={{height: '80px'}}>
                                <div className="mb-2">Auth.Signatory</div>
                            </td>
                            <td rowSpan="4" className=" border px-2 text-xs text-center align-bottom" style={{height: '80px'}}>
                                <div className="mb-2">Auth.Signatory</div>
                            </td>
                        </tr>
                        <tr>
                            <td className=" px-2 py-1 text-xs font-semibold">Account No.</td>
                            <td className=" px-2 py-1 text-xs">: 6812013962</td>
                        </tr>
                        <tr>
                            <td className=" px-2 py-1 text-xs font-semibold">IFSC Code</td>
                            <td className=" px-2 py-1 text-xs">: KKBK0004584</td>
                        </tr>
                        <tr>
                            <td className=" px-2 py-1 text-xs font-semibold">Branch Name</td>
                            <td className=" px-2 py-1 text-xs">: Jagriti Enclave, Anand Vihar, Delhi, India</td>
                        </tr>
                    </tbody>
                </table>
               <div className='flex justify-center text-xs pt-2 pb-5 text-gray-900'>Registered Address : First Floor, E-1, Opposite KFC, Kalkaji Main Market, South Delhi-110019, Delhi, India</div>
      </div>
    </div>
    </>
  )
}

export default PerformaInvoiceDetails;