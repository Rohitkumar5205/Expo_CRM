import React from 'react';

import { Route, Routes } from 'react-router-dom';
import Page1 from '../Pages of Section One/Page1';
import Page2 from '../Pages of Section One/Page2';
import Page3 from '../Pages of Section One/Page3';
import Page4 from '../Pages of Section One/Page4';
import Page5 from '../Pages of Section One/Page5';
import Page6 from '../Pages of Section One/Page6';
import Page7 from '../Pages of Section One/Page7';
import Page8 from '../Pages of Section One/Page8';
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
  return (
   
     
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