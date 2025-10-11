import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout
import Layout from "./layouts/Layout";

// Authentication
import Login from "./authUI/Login";
import OtpPage from "./authUI/OtpPage";

// Dashboard & Main
import MainComponent from "./Components/MainComponent";
import ClientOverview from "./Components/ClientOverview";

// Web Visitor Data
import NewVisitor from "./webvisitordata/newvisitor";
import GeneralVisitor from "./webvisitordata/generalvisitor";

// OrganicExpo2026 (Old)
import AddNew from "./OrganicExpo2026/addnew";
import NewLead from "./OrganicExpo2026/newlead";
import Warm from "./OrganicExpo2026/warm";
import Hot from "./OrganicExpo2026/hot";
import Confirm from "./OrganicExpo2026/confirm";
import Cold from "./OrganicExpo2026/cold";
import Master from "./OrganicExpo2026/master";
import Raw from "./OrganicExpo2026/raw";

// Organic_Expo_Data_2026 (New)
import Addnewclients from "./Organic_Expo_Data_2026/Addnewclients";
import Coldcclientlist from "./Organic_Expo_Data_2026/Coldcclientlist";
import Confirmclientlist from "./Organic_Expo_Data_2026/Confirmclientlist";
import Hotclientlist from "./Organic_Expo_Data_2026/Hotclientlist";
import Masterdata from "./Organic_Expo_Data_2026/Masterdata";
import Newleadlist from "./Organic_Expo_Data_2026/Newleadlist";
import Rawdatalist from "./Organic_Expo_Data_2026/Rawdatalist";
import Warmclientlist from "./Organic_Expo_Data_2026/Warmclientlist";

// User Management
import AddUser from "./UserList/adduser";
import UserList from "./UserList/userlist";

// Admin Config
import Category from "./AddAdmin/category";
import Remark from "./AddAdmin/remark";
import AddTarget from "./AddAdmin/addtarget";
import Message from "./AddAdmin/message";
import Nature from "./AddAdmin/nature";
import DataSource from "./AddAdmin/datasource";
import Status from "./AddAdmin/status";
import AddBank from "./AddAdmin/addbank";

// Invoice Components
import Performabutton from "./Components/invoice/TaxInvoiceDetails";
import EditEstimate from "./Components/EditEstimate";
import AddCreditNote from "./Components/AddCreditNote";

// rohit kumar
import AddNewClients from "./pages/ihwe_client_data_2026/AddNewClients";
import NewLeadList from "./pages/ihwe_client_data_2026/NewLeadList";
import WarmClientList from "./pages/ihwe_client_data_2026/WarmClientList";
import HotClientList from "./pages/ihwe_client_data_2026/HotClientList";
import ConfirmClientList from "./pages/ihwe_client_data_2026/ConfirmClientList";
import ColdClientList from "./pages/ihwe_client_data_2026/ColdClientList";
import MasterClientsList from "./pages/ihwe_client_data_2026/MasterClientsList";
import RawDataList from "./pages/IHWE_Client_Data_2026/RawDataList";
import OldVisitorList from "./pages/old_visitor_data/OldVisitorList";
import UploadVisitorList from "./pages/old_visitor_data/UploadVisitorList";
import History from "./Components/history/History";
import CreateInvoice from "./Components/invoice/CreateInvoice";
import InvoiceNumberDetails from "./Components/invoice/InvoiceNumberDetails";
import PerformaInvoiceDetails from "./Components/invoice/PerformaInvoiceDetails";
import EstimateDetails from "./Components/invoice/EstimateDetails";
import TaxInvoiceDetails from "./Components/invoice/TaxInvoiceDetails";

const App = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OtpPage />} />

        {/* Protected Layout (Sidebar + Header + Footer) */}
        <Route element={<Layout />}>
          {/* Dashboard Routes */}
          <Route path="/" element={<MainComponent />} />
          <Route path="/client-overview" element={<ClientOverview />} />

          {/* Section One */}
          <Route path="/addNewClients" element={<AddNewClients />} />
          <Route path="/newLeadList" element={<NewLeadList />} />
          <Route path="/warmClientList" element={<WarmClientList />} />
          <Route path="/hotClientList" element={<HotClientList />} />
          <Route path="/confirmClientList" element={<ConfirmClientList />} />
          <Route path="/coldClientList" element={<ColdClientList />} />
          <Route path="/masterData" element={<MasterClientsList />} />
          <Route path="/rawDataList" element={<RawDataList />} />
          <Route path="/history" element={<History />} />
          <Route path="/createInvoice" element={<CreateInvoice />} />
          <Route
            path="/invoiceNumberDetails"
            element={<InvoiceNumberDetails />}
          />
          <Route
            path="/performanceInvoiceDetails"
            element={<PerformaInvoiceDetails />}
          />
          <Route path="/estimateDetails" element={<EstimateDetails />} />

          {/* Old Visitor Data */}
          <Route path="/oldVisitorList" element={<OldVisitorList />} />
          <Route path="/uploadVisitorList" element={<UploadVisitorList />} />

          {/* Web Visitor Data */}
          <Route path="/newvisitor" element={<NewVisitor />} />
          <Route path="/generalvisitor" element={<GeneralVisitor />} />

          {/* OrganicExpo2026 */}
          <Route path="/addnew" element={<AddNew />} />
          <Route path="/organicexpo2026/newlead" element={<NewLead />} />
          <Route path="/organicexpo2026/warm" element={<Warm />} />
          <Route path="/organicexpo2026/hot" element={<Hot />} />
          <Route path="/organicexpo2026/confirm" element={<Confirm />} />
          <Route path="/organicexpo2026/cold" element={<Cold />} />
          <Route path="/organicexpo2026/master" element={<Master />} />
          <Route path="/organicexpo2026/raw" element={<Raw />} />

          {/* Organic_Expo_Data_2026 */}
          <Route path="/addnewclients" element={<Addnewclients />} />
          <Route path="/coldcclientlist" element={<Coldcclientlist />} />
          <Route path="/confirmclientlist" element={<Confirmclientlist />} />
          <Route path="/hotclientlist" element={<Hotclientlist />} />
          <Route path="/masterdata" element={<Masterdata />} />
          <Route path="/newleadlist" element={<Newleadlist />} />
          <Route path="/rawdatalist" element={<Rawdatalist />} />
          <Route path="/warmclientlist" element={<Warmclientlist />} />

          {/* User Management */}
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/userlist" element={<UserList />} />

          {/* Admin Config */}
          <Route path="/category" element={<Category />} />
          <Route path="/remark" element={<Remark />} />
          <Route path="/addtarget" element={<AddTarget />} />
          <Route path="/message" element={<Message />} />
          <Route path="/nature" element={<Nature />} />
          <Route path="/datasource" element={<DataSource />} />
          <Route path="/status" element={<Status />} />
          <Route path="/addbank" element={<AddBank />} />

          {/* Invoice / Utility */}

          <Route path="/taxInvoiceDetails" element={<TaxInvoiceDetails />} />

          <Route path="/editestimate" element={<EditEstimate />} />
          <Route path="/addCreditNote" element={<AddCreditNote />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
