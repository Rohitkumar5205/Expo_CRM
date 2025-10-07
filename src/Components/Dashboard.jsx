import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Page1 from '../Pages of Section One/Page1';
import Page2 from '../Pages of Section One/Page2';
import Page3 from '../Pages of Section One/Page3';
import Page4 from '../Pages of Section One/Page4';
import Page5 from '../Pages of Section One/Page5';
import Page6 from '../Pages of Section One/Page6';
import Page7 from '../Pages of Section One/Page7';
import Page8 from '../Pages of Section One/Page8';
import Old from '../Old Vistors Data/old';
import Visitors from '../Old Vistors Data/visitors';
import NewVisitor from "../webvisitordata/newvisitor";
import GeneralVisitor from "../webvisitordata/generalvisitor";
import AddNew from '../OrganicExpo2026/addnew';
import NewLead from '../OrganicExpo2026/newlead';
import Warm from '../OrganicExpo2026/warm';
import Hot from '../OrganicExpo2026/hot';
import Confirm from '../OrganicExpo2026/confirm';
import Cold from '../OrganicExpo2026/cold';
import Master from '../OrganicExpo2026/master';
import Raw from '../OrganicExpo2026/raw';
import MainComponent from './maincomponent';
import AddUser from'../UserList/adduser';
import UserList from '../UserList/userlist';
import Category from '../AddAdmin/category';
import Remark from '../AddAdmin/remark';
import AddTarget from '../AddAdmin/addtarget';
import Message from '../AddAdmin/message';
import Nature from  '../AddAdmin/nature';
import DataSource from '../AddAdmin/datasource';
import Status from '../AddAdmin/status';
import AddBank from '../AddAdmin/addbank';
import PerformaInvoice from './performainvoice';
import OtpPage from '../OtpPage';
import History from '../Pages of Section One/History';
import Addnewclients from '../Organic_Expo_Data_2026/Addnewclients'
import Coldcclientlist from '../Organic_Expo_Data_2026/Coldcclientlist'
import Confirmclientlist from '../Organic_Expo_Data_2026/Confirmclientlist'
import Hotclientlist from '../Organic_Expo_Data_2026/Hotclientlist'
import Masterdata from '../Organic_Expo_Data_2026/Masterdata'
import Newleadlist from '../Organic_Expo_Data_2026/Newleadlist'
import Rawdatalist from '../Organic_Expo_Data_2026/Rawdatalist'
import Warmclientlist from '../Organic_Expo_Data_2026/Warmclientlist'
import MainComponent from './MainComponent';
import Invoice from '../Pages of Section One/Invoice';
import PerformaInvoice from './PerformaInvoice';
import PerformaInvoiceDetail from './PerformaInvoiceDetail';
import Performabutton from './Performabutton';
import InvoiceFormButton from './InvoiceFormButton';
import EditEstimate from './EditEstimate';
import CreditNoteComponent from './CreditNoteComponent';


const Dashboard = () => {
  const location = useLocation();
  
  // Check if current route is OTP page
  const isOtpPage = location.pathname === '/otp';

  // If OTP page, return only OtpPage without Dashboard wrapper
  if (isOtpPage) {
    return <OtpPage />;
  }

  return (
    <div className="w-full flex-1 overflow-auto bg-[#eef1f5]">
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/page4" element={<Page4 />} />
        <Route path="/page5" element={<Page5 />} />
        <Route path="/page6" element={<Page6 />} />
        <Route path="/page7" element={<Page7 />} />
        <Route path="/page8" element={<Page8 />} />
        <Route path="/old" element={<Old />} />
        <Route path="/visitors" element={<Visitors />} />
        <Route path="/performaInvoice" element={<PerformaInvoice />} />
        
        {/* Web Visitor Data Routes */}
        <Route path="/newvisitor" element={<NewVisitor />} />
        <Route path="/generalvisitor" element={<GeneralVisitor />} />
        <Route path="/addnew" element={<AddNew />} />
        <Route path="/organicexpo2026/newlead" element={<NewLead />} />
        <Route path="/organicexpo2026/warm" element={<Warm />} />
        <Route path="/organicexpo2026/hot" element={<Hot />} />
        <Route path="/organicexpo2026/confirm" element={<Confirm />} />
        <Route path="/organicexpo2026/cold" element={<Cold />} />
        <Route path="/organicexpo2026/master" element={<Master />} />
        <Route path="/organicexpo2026/raw" element={<Raw />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/category" element={<Category />} />
        <Route path="/remark" element={<Remark />} />
        <Route path="/addtarget" element={<AddTarget />} />
        <Route path="/message" element={<Message />} />
        <Route path="/nature" element={<Nature />} />
        <Route path="/datasource" element={<DataSource />} />
        <Route path="/status" element={<Status />} />
        <Route path="/addbank" element={<AddBank />} />
      </Routes>
   
     
      <div>

      {/* Routes Section */}
      
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/page5" element={<Page5 />} />
          <Route path="/page6" element={<Page6 />} />
          <Route path="/page7" element={<Page7 />} />
          <Route path="/page8" element={<Page8 />} />
          <Route path='/history' element={<History/>}/>
          <Route path='/invoice' element={<Invoice/>}/>
          <Route path="/performaInvoice" element={<PerformaInvoice />} />
          <Route path="/creditnotecomponent" element={<CreditNoteComponent />} />
          <Route path="/performaInvoicemain" element={<PerformaInvoiceDetail />} />
          <Route path="/editestimate" element={<EditEstimate/>} />
           <Route path="/performabutton" element={<Performabutton />} />
          <Route path="/addnewclients" element={<Addnewclients/>} />
          <Route path="/coldcclientlist" element={<Coldcclientlist />} />
          <Route path="/confirmclientlist" element={<Confirmclientlist />} />
          <Route path="/hotclientlist" element={<Hotclientlist />} />
          <Route path="/masterdata" element={<Masterdata />} />
          <Route path="/newleadlist" element={<Newleadlist />} />
          <Route path="/rawdatalist " element={<Rawdatalist />} />
          <Route path="/warmclientlist" element={<Warmclientlist />} />
         
         <Route path="/invoiceformbutton" element={<InvoiceFormButton />} />
        </Routes>
      
    </div>
  );
};

export default Dashboard;