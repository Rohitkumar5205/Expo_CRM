import React from 'react'
import mainpic from '../../assets/images/header.png'
import { useLocation } from 'react-router-dom';
const InvoiceNumberDetails = () => {

    const location = useLocation();
  const heading = location.state?.heading || "" ;
  return (
     <div className="bg-gray-100 p-6 min-h-screen ">
      <div className="max-w-6xl mx-auto bg-white  px-6 py-0.5">
        <img className=' my-2' src={mainpic} alt="" />
       <div className='flex justify-between sm:text-[11px] md:text-sm my-2 pl-110 pr-8'>
        <h1 className='font-semibold text-center'>Tax Invoice</h1>
       <h1 className='font-semibold text-center pt-1'>{heading}</h1>
       </div>
        {/* Client + Invoice Info */}
               {/* Client and Estimate Details Table */}
                <table className="w-full border-collapse border mb-3">
                    <thead>
                        <tr className="bg-[#818481]">
                            <th colSpan="1" className="border text-center py-0.5 text-[#1d2129] text-[11px] font-semibold">Buyer's Name & Address</th>
                            <th colSpan="1" className="border text-center py-0.5 text-[#1d2129] text-[11px] font-semibold">Shipment Details</th>
                            <th colSpan="2" className="border text-center py-0.5 text-[#1d2129] text-[11px] font-semibold">Seller Invoice Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='border'>
                            <td className=" px-1 py-0.5 text-[11px] ">Asg Mantra</td>
                            <td className="border px-1 py-0.5 text-[11px]">Indo-himalayan Expo-2025</td>
                            <td className="border px-1 py-0.5 font-semibold text-[11px] ">Invoice No.</td>
                            <td className=" px-1 py-0.5 text-[11px] ">NGW/INV/24-25/026</td>
                        </tr>
                        <tr className='border'>
                            <td className=" px-1 py-0.5 text-[11px] ">5/49, Old Rajender Nagar, New Delhi - 110060</td>
                            <td className=" border px-1 py-0.5 text-[11px]" >Prem Nagar Ashram , Haridwar</td>
                            <td className="border px-1 py-0.5 font-semibold text-[11px] ">Invoice Date</td>
                            <td className=" px-1 py-0.5 text-[11px]">	19 Feb 25</td>
                            
                        </tr>
                        <tr className='border'>
                            <td className=" px-1 py-0.5 text-[11px] ">Karol Bagh, Delhi, Bharat</td>
                            <td className=" border px-1 py-0.5 text-[11px] ">Haridwar, Uttarakhand, Bharat</td>
                            <td className="border px-1 py-0.5 font-semibold text-[11px]">Estimate No.</td>
                            <td className=" px-1 py-0.5 text-[11px] ">NGW/24-25/EST/019</td>
                            
                        </tr>
                        <tr className='border'>
                            <td className=" px-1 py-0.5 text-[11px] ">Contact Person : Versha Sharma</td>
                            <td className=" border px-1 py-0.5 text-[11px]">Place of Supply & State : Haridwar | Uttarakhand</td>
                            <td className="border px-1 py-0.5 font-semibold text-[11px] ">Estimate Status</td>
                            <td className=" px-1 py-0.5 text-[11px]">	Estimate Approved</td>  
                        </tr>
                        <tr className='border'>
                            <td className=" px-1 py-0.5 text-[11px] ">Email : ags@gmail.com</td>
                            <td className=" border px-1 py-0.5 text-[11px]">State of Supply & Code : Uttarakhand | 07</td>
                            <td className="border px-1 py-0.5 font-semibold text-[11px] ">Date of Supply</td>
                            <td className=" px-1 py-0.5 text-[11px]">	21 Feb 25</td>  
                        </tr>
                         <tr className='border'>
                            <td className=" px-1 py-0.5 text-[11px] ">GSTIN/PAN No. : 07ABGFA6364G1ZF</td>
                            <td className="border px-1 py-0.5 text-[11px]">GSTIN/PAN No. : 07ABGFA6364G1ZF</td>
                            <td className="border px-1 py-0.5 font-semibold text-[11px] ">Reverse Charge</td>
                            <td className=" px-1 py-0.5 text-[11px]">No</td>  
                        </tr>
                    </tbody>
                </table>

                {/* Main Items Table */}
                <table className="w-full border-collapse border  mb-3">
                    <thead className="bg-[#818481]">
                        <tr>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129] w-12">S.No.</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129]">Item Description</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129]  w-20">HSN Code</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129]  w-12">Qty.</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129]  w-12">Size</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129]  w-12">Rate</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129]  w-16">Amount</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129]  w-20">Discount</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129]  w-20">Total</th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr>
                            <td className="border  px-2 py-0.5 text-[11px] text-center">1</td>
                            <td className="border  px-2 py-0.5 text-[11px]"> Exhibition Shell Stall No.78 In Hall No.7, Pragati Maidan, New Delhi</td>
                            <td className="border  px-2 py-0.5 text-[11px] text-center">998596</td>
                            <td className="border  px-2 py-0.5 text-[11px] text-center">1</td>
                            <td className="border  px-2 py-0.5 text-[11px] text-center">6 Sqmtr.</td>
                            <td className="border  px-2 py-0.5 text-[11px] text-center">7000</td>
                            <td className="border  px-2 py-0.5 text-[11px] text-center">11700</td>
                            <td className="border  px-2 py-0.5 text-[11px] text-center">14%</td>
                            <td className="border  px-2 py-0.5 text-[11px] text-center">59999</td>
                        </tr>
                        {/* Empty rows for spacing */}
                        {[...Array(10)].map((_, i) => (
                            <tr key={i} style={{height: '30px'}}>
                                <td className="border-t border-b border-l border-r border-t-gray-100 border-b-gray-100  border-l-black border-r-black  px-2 py-0.5 text-[11px]"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-100 border-b-gray-100  border-l-black border-r-black  px-2 py-0.5 text-[11px]"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-100 border-b-gray-100  border-l-black border-r-black px-2 py-0.5 text-[11px]"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-100 border-b-gray-100  border-l-black border-r-black px-2 py-0.5 text-[11px]"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-100 border-b-gray-100  border-l-black border-r-black px-2 py-0.5 text-[11px]"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-100 border-b-gray-100  border-l-black border-r-black px-2 py-0.5 text-[11px]"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-100 border-b-gray-100  border-l-black border-r-black px-2 py-0.5 text-[11px]"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-100 border-b-gray-100  border-l-black border-r-black px-2 py-0.5 text-[11px]"></td>
                                <td className="border-t border-b border-l border-r border-t-gray-100 border-b-gray-100  border-l-black border-r-black px-2 py-0.5 text-[11px]"></td>
                            </tr>
                            
                        ))}
                        <tr><td className="px-2 text-[11px] text-center"></td></tr>
                        <tr>
                            <td colSpan="8" className="border  px-2 py-0.5 text-[11px] text-right font-semibold">Total Taxable Value</td>
                            <td className="border  px-2 py-0.5 text-[11px] text-center font-semibold">59999</td>
                        </tr>
                    </tbody>
                </table>

                {/* HSN/SAC Details and Summary */}
                <table className="w-[100%] border-collapse border mb-3">
                    <thead className="bg-[#818481]">
                        <tr>
                            <th rowSpan="2" className="border px-2 py-0.5 text-[11px] text-[#1D2129]  w-[5%]">S.No.</th>
                            <th rowSpan="2" className="border px-2 py-0.5 text-[11px] text-[#1D2129]  w-[15%]">HSN/SAC Details</th>
                            <th rowSpan="2" className="border px-2 py-0.5 text-[11px] text-[#1D2129]  w-[15%]">Item Value</th>
                            <th rowSpan="2" className="border px-2 py-0.5 text-[11px] text-[#1D2129]  w-[10%]">Qty.</th>
                            <th  colSpan="7" className="border px-2 py-0.5 text-[11px] text-[#1D2129]  w-auto">GST Details Item No. 1 to 1</th>
                             </tr>
                            <tr>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129] ">CGST(%)</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129] ">Amount</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129] ">SGST(%)</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129] ">Amount</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129] ">IGST(%)</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129] ">Amount</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129] ">Total Tax</th>
                            </tr>
                            
                          
                        
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-2 py-0.5 text-[11px] text-center">1</td>
                            <td className="border px-2 py-0.5 text-[11px] text-center">998596</td>
                            <td className="border px-2 py-0.5 text-[11px] text-center">85254.48</td>
                            <td className="border px-2 py-0.5 text-[11px] text-center">1</td>
                            <td className="border px-2 py-0.5 text-[11px] text-center"></td>
                            <td className="border px-2 py-0.5 text-[11px] text-center"></td>
                            <td className="border px-2 py-0.5 text-[11px] text-center"></td>
                            <td className="border px-2 py-0.5 text-[11px] text-center"></td>
                            <td className="border px-2 py-0.5 text-[11px] text-center">18%</td>
                            <td className="border px-2 py-0.5 text-[11px] text-center">15346</td>
                            <td className="border px-2 py-0.5 text-[11px] text-center">15346</td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="border px-2 py-0.5 text-[11px] font-semibold text-center">Amount in Words</td>
                            <td colSpan="6" className="border px-2 py-0.5 text-[11px] font-semibold ">Seventy Thousand, Seven Hundred Ninety Nine Rupees Only</td>
                            <td colSpan="2" className="border text-center align-middle text-[11px] font-semibold">
                                Grand Total  
                            </td>
                             <td  className="border text-center align-middle text-[11px] font-semibold">
                                70799
                            </td>
                        </tr>
                      
                    </tbody>
                </table>

                <table className='border mb-3 w-[100%]'>
                     <thead>
                          <tr>
                            <th className='w-[20%] text-center px-2 py-0.5 font-semibold text-[11px] border'>Amount in Words</th>
                            <th className='w-[62%] text-left px-2 py-0.5 font-semibold text-[11px] border  '>One Hundred Thousand, Six Hundred Point Four Eight Rupees Only.</th>
                            <th className='w-[10%] text-center px-4 py-0.5 font-semibold text-[11px] border'>Invoice Value</th>
                            <th className='w-[8%] text-center px-4 py-0.5 font-semibold text-[11px] border'>100600.48</th>
                        </tr>
                     </thead>
                </table>

                {/* Bank Details and Signatures Section */}
                <table className="w-full border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <td colSpan="7" className=" border px-2 py-0.5 text-[11px] font-semibold align-top">Terms and Conditions :
                                  <div className='font-normal'>
                                    1. Payments should be made through crossed cheque/D.D./RTGS/NEFT payable at Delhi, favouring Namo Gange Wellness Pvt. Ltd.<br />
                                    2. Interest @24% p.a will be charged if the payment is not made within 7 days from the date of issue of bill.<br />
                                    3. All Disputes are subject to Delhi Jurisdiction.<br />
                                </div>
                            </td>
                            
                              
                            
                        </tr>
                    </thead>
                    <thead className="bg-[#818481]">
                        <tr>
                            <th colSpan="2" className="border px-2 py-0.5 text-[11px] text-[#1D2129]  text-left w-[40%]">Namo Gange Wellness Pvt. Ltd. Bank Details</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129]  text-center w-[30%]">Client Signature</th>
                            <th className="border px-2 py-0.5 text-[11px] text-[#1D2129]  text-center w-[30%]">For Namo Gange Wellness Pvt. Ltd.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=" pl-2  text-[11px] ">Bank Name</td>
                            <td className=" px-2  text-[11px]">: Kotak Mahindra Bank</td>
                            <td rowSpan="4" className=" border px-2 text-[11px] text-center align-bottom" style={{height: '80px',width:'30%'}}>
                                <div >Auth.Signatory</div>
                            </td>
                            <td rowSpan="4" className=" border px-2 text-[11px] text-center align-bottom" style={{height: '80px',width:'30%'}}>
                                <div >Auth.Signatory</div>
                            </td>
                        </tr>
                        <tr>
                            <td className=" pl-2   text-[11px] ">Account No.</td>
                            <td className=" px-2  text-[11px]">: 6812013962</td>
                        </tr>
                        <tr>
                            <td className=" pl-2  text-[11px] ">IFSC Code</td>
                            <td className=" px-2  text-[11px]">: KKBK0004584</td>
                        </tr>
                        <tr>
                            <td className=" pl-2  text-[11px] ">Branch Name</td>
                            <td className=" px-2  text-[11px]">: Jagriti Enclave, Anand Vihar, Delhi, India</td>
                        </tr>
                    </tbody>
                </table>
               <div className='flex justify-center text-[11px] pt-2 pb-5 text-gray-900'>Registered Address : First Floor, E-1, Opposite KFC, Kalkaji Main Market, South Delhi-110019, Delhi, India</div>
      </div>
      </div>
  )
}

export default InvoiceNumberDetails
