import React from "react";
import { Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./layouts/Layout";
import Login from "./authUI/Login";
import OtpPage from "./authUI/OtpPage";
import MainComponent from "./Components/MainComponent";
// import ClientOverview from "./Components/ClientOverview";
import EditEstimate from "./Components/EditEstimate";
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
import GeneralVisitorsList from "./pages/web_visitor_data/GeneralVisitorsList";
import CorporateVisitorsList from "./pages/web_visitor_data/CorporateVisitorsList";
import HealthCampVisitorsList from "./pages/web_visitor_data/HealthCampVisitorsList";
import AddNewVisitors from "./pages/web_visitor_data/add_new_visitor/AddNewVisitors";
import OrganicAddClients from "./pages/organic_expo_data_2026/organicAddClients";
import OrganicLeadList from "./pages/organic_expo_data_2026/OrganicLeadList";
import OrganicWarmList from "./pages/organic_expo_data_2026/OrganicWarmList";
import OrganicHotClientsList from "./pages/organic_expo_data_2026/OrganicHotClientsList";
import OrganicConfirmClientList from "./pages/organic_expo_data_2026/OrganicConfirmClientList";
import OrganicColdClientList from "./pages/organic_expo_data_2026/OrganicColdClientList";
import OrganicMasterData from "./pages/organic_expo_data_2026/OrganicMasterData";
import OrganicRawDataList from "./pages/organic_expo_data_2026/OrganicRawDataList";
import UserList from "./pages/users/UserList";
import AddUser from "./pages/users/AddUser";
import AddCategory from "./pages/add_by_admin/AddCategory";
import AddRemarkLengthFixed from "./pages/add_by_admin/AddRemarkLengthFixed";
import AddTarget from "./pages/add_by_admin/AddTarget";
import AddWhatsappMessage from "./pages/add_by_admin/AddCrmWhatsappMessage";
import AddNatureOfBusiness from "./pages/add_by_admin/AddNatureOfBusiness";
import AddDataSource from "./pages/add_by_admin/AddDataSource";
import AddStatus from "./pages/add_by_admin/AddStatus";
import AddBank from "./pages/add_by_admin/AddBank";
import UploadExhibitor from "./pages/ihwe_client_data_2026/uploadExhibitor";
import ClientOverview1 from "./Components/ClientOverview1";
import AddEvent from "./pages/add_by_admin/AddEvent";
import AccountSection1 from "./Components/AccountSection1";
import CreateEstimate1 from "./Components/CreateEstimate1";
import CreditNote from "./Components/CreditNote";
import Payments from "./Components/payments/Payment";
import PaymentEdit from "./Components/payments/PaymentEdit";
import InvoiceEdit from "./Components/InvoiceEdit";
const App = () => {
  return (
    <>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <ToastContainer />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login/otp" element={<OtpPage />} />

        {/* Protected Layout (Sidebar + Header + Footer) */}
        <Route element={<Layout />}>
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<MainComponent />} />
          {/* <Route path="/client-overview" element={<ClientOverview />} /> */}

          {/* Section One */}
          <Route
            path="/ihweClientData2026/addNewClients"
            element={<AddNewClients />}
          />
          <Route
            path="/ihweClientData2026/addNewClients/:id"
            element={<AddNewClients />}
          />
          <Route
            path="/ihweClientData2026/newLeadList"
            element={<NewLeadList />}
          />
          <Route
            path="/ihweClientData2026/warmClientList"
            element={<WarmClientList />}
          />
          <Route
            path="/ihweClientData2026/hotClientList"
            element={<HotClientList />}
          />
          <Route
            path="/ihweClientData2026/confirmClientList"
            element={<ConfirmClientList />}
          />
          <Route
            path="/ihweClientData2026/coldClientList"
            element={<ColdClientList />}
          />
          <Route
            path="/ihweClientData2026/masterData"
            element={<MasterClientsList />}
          />
          <Route
            path="/ihweClientData2026/rawDataList"
            element={<RawDataList />}
          />
          <Route
            path="/ihweClientData2026/uploadExhibitor"
            element={<UploadExhibitor />}
          />
          <Route
            path="/ihweClientData2026/accountSection1/:id"
            element={<AccountSection1 />}
          />
          <Route
            path="/ihweClientData2026/createEstimate1/:id"
            element={<CreateEstimate1 />}
          />
          <Route
            path="/ihweClientData2026/creditNote/:id"
            element={<CreditNote />}
          />
          <Route
            path="/ihweClientData2026/payments/:id"
            element={<Payments />}
          />
          <Route
            path="/ihweClientData2026/paymentEdit/:id"
            element={<PaymentEdit />}
          />
          <Route path="/clientOverview1/:id" element={<ClientOverview1 />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/payments/createInvoice/:id"
            element={<CreateInvoice />}
          />
          <Route path="/payments/invoiceEdit/:id" element={<InvoiceEdit />} />
          <Route
            path="/payments/ODT/taxInvoiceDetails/:id"
            element={<TaxInvoiceDetails />}
          />
          <Route
            path="/invoiceNumberDetails"
            element={<InvoiceNumberDetails />}
          />
          <Route
            path="/payments/performanceInvoiceDetails/:id"
            element={<PerformaInvoiceDetails />}
          />
          <Route
            path="/payments/estimateDetails/:id"
            element={<EstimateDetails />}
          />
          <Route path="/payments/estimateEdit/:id" element={<EditEstimate />} />
          {/* Old Visitor Data */}
          <Route
            path="/OLDVisitorData/oldVisitorList"
            element={<OldVisitorList />}
          />
          <Route
            path="/OLDVisitorData/uploadVisitorList"
            element={<UploadVisitorList />}
          />

          {/* Web Visitor Data */}
          <Route
            path="/webVisitorData/addNewVisitors"
            element={<AddNewVisitors />}
          />
          <Route
            path="/webVisitorData/generalVisitorsList"
            element={<GeneralVisitorsList />}
          />
          <Route
            path="/webVisitorData/corporateVisitorsList"
            element={<CorporateVisitorsList />}
          />
          <Route
            path="/webVisitorData/healthCampVisitorsList"
            element={<HealthCampVisitorsList />}
          />

          {/* OrganicExpo2026 */}
          <Route
            path="/organicExpo2026/organicAddClients"
            element={<OrganicAddClients />}
          />
          <Route
            path="/organicExpo2026/organicLeadList"
            element={<OrganicLeadList />}
          />
          <Route
            path="/organicExpo2026/organicWarmList"
            element={<OrganicWarmList />}
          />
          <Route
            path="/organicExpo2026/organicHotClientsList"
            element={<OrganicHotClientsList />}
          />
          <Route
            path="/organicExpo2026/organicConfirmClientList"
            element={<OrganicConfirmClientList />}
          />
          <Route
            path="/organicExpo2026/organicColdClientList"
            element={<OrganicColdClientList />}
          />
          <Route
            path="/organicExpo2026/organicMasterData"
            element={<OrganicMasterData />}
          />
          <Route
            path="/organicExpo2026/organicRawDataList"
            element={<OrganicRawDataList />}
          />

          {/* User Management */}
          <Route path="/users/addUser" element={<AddUser />} />
          <Route path="/users/userList" element={<UserList />} />

          {/* Admin Config */}
          <Route path="/addByAdmin/category" element={<AddCategory />} />
          <Route path="/addByAdmin/remark" element={<AddRemarkLengthFixed />} />
          <Route path="/addByAdmin/target" element={<AddTarget />} />
          <Route path="/addByAdmin/whatsapp" element={<AddWhatsappMessage />} />
          <Route path="/addByAdmin/nature" element={<AddNatureOfBusiness />} />
          <Route path="/addByAdmin/dataSource" element={<AddDataSource />} />
          <Route path="/addByAdmin/status" element={<AddStatus />} />
          <Route path="/addByAdmin/bank" element={<AddBank />} />
          <Route path="/addByAdmin/event" element={<AddEvent />} />

          {/* Invoice / Utility */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
