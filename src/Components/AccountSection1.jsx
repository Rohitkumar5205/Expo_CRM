import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompanies } from "../features/company/companySlice";
import EstimateTable from "./EstimateTable";

const AccountSection1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  // Redux state for companies (assuming this is how you manage client data)
  const { companies, loading } = useSelector((state) => state.companies);
  const [company, setCompany] = useState(null);

  // 1. Fetch company data if not already present in Redux
  useEffect(() => {
    if (companies.length === 0) {
      dispatch(fetchCompanies());
    }
  }, [dispatch, companies.length]);

  // 2. Find the specific company based on the ID from the URL
  useEffect(() => {
    if (companies.length > 0 && id) {
      const matchedCompany = companies.find((c) => c._id === id);
      setCompany(matchedCompany);
    }
  }, [companies, id]);

  // Use companyName from state (if passed) or from fetched company data
  let companyName = "Loading Company...";

  // Get company name from state if possible (passed from ClientOverview1)
  const stateCompanyName = location.state?.heading?.companyName;
  if (stateCompanyName) {
    companyName = stateCompanyName;
  }

  // Or use the name from the fetched company object
  if (company) {
    companyName = company.companyName || companyName;
  }

  if (loading) return <p>Loading client data...</p>;
  if (!id) return <p>Error: Client ID is missing in the URL.</p>;
  // if (!company) return <p>No client found with ID: {id}</p>; // Optional: show if company isn't found

  return (
    <div className="w-full h-auto bg-[#eef1f5] min-h-screen">
      {/* Header Section */}
      <div className="w-full bg-white  flex flex-col sm:flex-row justify-between items-center px-4 py-1">
        <h1 className="text-xl font-normal text-gray-500 mb-2 sm:mb-0">
          ACCOUNT SECTION | ESTIMATE
        </h1>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => navigate("/ihweClientData2026/addNewClients")}
            className="bg-white text-gray-700 border border-gray-400 hover:bg-gray-200 px-2 py-0.5  text-xs font-normal"
          >
            Add Client
          </button>

          <button
            onClick={() => navigate("/ihweClientData2026/masterData")}
            className="bg-white text-gray-700 border border-gray-400 hover:bg-gray-200 px-2 py-0.5  text-xs font-normal"
          >
            Master List
          </button>
        </div>
      </div>

      {/* Company Info & Action Buttons */}
      <div className="bg-white  m-5 pb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 pt-1 pb-1">
          {/* Display the dynamically retrieved company name */}
          <h2 className="text-lg text-gray-700 mb-2 sm:mb-0">
            {companyName}. Information
          </h2>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() =>
                navigate(`/ihweClientData2026/createEstimate1/${company._id}`)
              }
              className="bg-gray-200 text-gray-700 border border-gray-400 hover:bg-gray-200 px-2 py-0.5  text-xs font-normal"
            >
              Create Estimate
            </button>
            <button
              onClick={() => navigate(`/ihweClientData2026/payments/${id}`)}
              className="bg-white text-gray-700 border border-gray-400 hover:bg-gray-200 px-2 py-0.5  text-xs font-normal"
            >
              Payments
            </button>
            {/* <button
              onClick={() => navigate(`/ihweClientData2026/creditNote/${id}`)}
              className="bg-white text-gray-700 border border-gray-400 hover:bg-gray-200 px-3 py-1  text-xs font-medium"
            >
              Credit Note
            </button> */}
          </div>
        </div>
        <hr className="opacity-10 " />

        {/* Estimate Table - Pass company ID for data fetching */}

        <EstimateTable clientId={id} />
      </div>
    </div>
  );
};

export default AccountSection1;
