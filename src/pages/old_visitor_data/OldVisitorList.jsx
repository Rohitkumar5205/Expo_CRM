import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Globallytable from "../../Components/Globallytable";
import Textarea from "../../Components/Textarea";
import VisitorDetail from "../../Components/VisitorDetail";

const OldVisitorList = () => {
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const navigate = useNavigate();

  // Upda+ted columns with custom render for name column
  const columns = [
    {
      label: "Name",
      accessor: "name",
      render: (value, row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedVisitor(row);
          }}
          className="text-[#337ab7] hover:text-[#286090] hover:underline font-medium cursor-pointer text-left"
        >
          {value}
        </button>
      ),
    },
    { label: "Mobile", accessor: "mobile" },
    { label: "Email", accessor: "email" },
    { label: "Visit For", accessor: "visitFor" },
    { label: "Company", accessor: "company" },
    { label: "Designation", accessor: "designation" },
    { label: "Website", accessor: "website" },
    { label: "City", accessor: "city" },
    { label: "State", accessor: "state" },
    { label: "Updated Details", accessor: "updatedDetails" },
  ];

  const rows = [
    {
      checkbox: true,
      name: "Yogita Bagri",
      mobile: "9899271894",
      email: "yogitamu786@gmail.com",
      visitFor: "Expo 2024",
      company: "None",
      designation: "Student",
      website: "",
      city: "Delhi",
      state: "Delhi",
      updatedDetails: "30 Nov -1",
      address: "G 294 Ambedkar Nagar Dakshin Puri, Delhi, Bharat",
      remark:
        "I am yoga student from lal bahadur sanskrit vidyapeeth, looking for new things and thats why i want to become the part of this expo",
    },
    {
      checkbox: true,
      name: "Yogita Ahlawat",
      mobile: "8130398127",
      email: "yogitaahlawat4@gmail.com",
      visitFor: "Expo 2024",
      company: "Cbpacs",
      designation: "Student",
      website: "",
      city: "Delhi",
      state: "Delhi",
      updatedDetails: "30 Nov -1",
      address: "N/A",
      remark: "No remark provided",
    },
    {
      checkbox: true,
      name: "Yogindra Malik",
      mobile: "8006418962",
      email: "yogindramalik12@gmail.com",
      visitFor: "Expo 2024",
      company: "",
      designation: "",
      website: "",
      city: "Delhi",
      state: "Uttar Pradesh",
      updatedDetails: "30 Nov -1",
      address: "N/A",
      remark: "No remark provided",
    },
    {
      checkbox: true,
      name: "Yogguru Kamal",
      mobile: "9911348647",
      email: "yoggurukamal@gmail.com",
      visitFor: "Expo 2024",
      company: "",
      designation: "",
      website: "",
      city: "Delhi",
      state: "Delhi",
      updatedDetails: "30 Nov -1",
      address: "N/A",
      remark: "No remark provided",
    },
    {
      checkbox: true,
      name: "Yogeshwar Malik",
      mobile: "9896908643",
      email: "yjgimalik9@gmail.com",
      visitFor: "Expo 2024",
      company: "",
      designation: "",
      website: "",
      city: "Delhi",
      state: "Delhi",
      updatedDetails: "30 Nov -1",
      address: "N/A",
      remark: "No remark provided",
    },
    {
      checkbox: true,
      name: "Yogeshwar Chaurasia",
      mobile: "9350551525",
      email: "yogeshwarchaurasia@yahoo.com",
      visitFor: "Expo 2024",
      company: "",
      designation: "",
      website: "",
      city: "Delhi",
      state: "Uttar Pradesh",
      updatedDetails: "30 Nov -1",
      address: "N/A",
      remark: "No remark provided",
    },
    {
      checkbox: true,
      name: "Yogesh Singhal",
      mobile: "9166254927",
      email: "info@indiagoods.in",
      visitFor: "Expo 2024",
      company: "India goods",
      designation: "Owner",
      website: "",
      city: "Rajasthan",
      state: "Rajasthan",
      updatedDetails: "30 Nov -1",
      address: "N/A",
      remark: "No remark provided",
    },
    {
      checkbox: true,
      name: "Yogesh Rathor",
      mobile: "8287857320",
      email: "yogeshrathore660@gmail.com",
      visitFor: "Expo 2024",
      company: "",
      designation: "Admin",
      website: "",
      city: "Delhi",
      state: "Delhi",
      updatedDetails: "Admin | 30 Nov -1",
      address: "N/A",
      remark: "No remark provided",
    },
    {
      checkbox: true,
      name: "Yogesh Pant",
      mobile: "9350072209",
      email: "daaman.yogesh@gmail.com",
      visitFor: "Expo 2024",
      company: "heart care foundation of india",
      designation: "manager",
      website: "",
      city: "Delhi",
      state: "Delhi",
      updatedDetails: "30 Nov -1",
      address: "N/A",
      remark: "No remark provided",
    },
    {
      checkbox: true,
      name: "Yogesh Bhole",
      mobile: "9423186854",
      email: "yogeshbhole2006@gmail.com",
      visitFor: "Expo 2024",
      company: "Himalay Tractors Parts",
      designation: "Owner",
      website: "",
      city: "Maharashtra",
      state: "Maharashtra",
      updatedDetails: "30 Nov -1",
      address: "N/A",
      remark: "No remark provided",
    },
  ];

  const handleBackClick = () => {
    setSelectedVisitor(null);
  };

  const handleAddNewVisitorClick = () => {
    navigate("/visitors");
  };

  return (
    <div className="w-full h-auto bg-[#eef1f5]">
      {selectedVisitor ? (
        <VisitorDetail visitor={selectedVisitor} onBack={handleBackClick} />
      ) : (
        <>
          <div className="w-full bg-white shadow-md ">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1">
              <h1 className="text-xl  text-gray-600 mb-2 lg:mb-0">
                VISITOR DATA 2023
              </h1>
            </div>
          </div>

          <div className="w-[97%] bg-white p-2 mx-4 my-6">
            <h1 className="text-base font-semibold  text-gray-950 pl-4 ">
              OLD VISITOR LIST
            </h1>
            <div className="flex flex-wrap justify-start md:justify-end gap-2 mb-1">
              {/* <button
                                onClick={handleAddNewVisitorClick}
                                className="bg-[#337ab7] hover:bg-[#286090] text-white px-2.5 py-1 rounded-sm text-sm font-medium"
                            >
                                Add New Visitor
                            </button> */}
            </div>
            <hr className="opacity-10 mb-2" />
            <div className="text-xs">
              <Globallytable rows={rows} colomns={columns} />
            </div>
          </div>
          <div className="bg-white shadow-md m-4 w-[97%] ">
            <Textarea />
          </div>
        </>
      )}
    </div>
  );
};

export default OldVisitorList;
