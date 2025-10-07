import React, { useState } from 'react';
import Globallytable from '../Components/Globallytable';
import Textarea from '../Components/Textarea';
import ClientOverview from '../Components/ClientOverview';
// You'll need to create this CSS file

const generalvisitor = () => {
    const [selectedClient, setSelectedClient] = useState(null);

    const columns = [
        { label: "Registration Id", accessor: "registrationId" },
        { label: "Visitor Details", accessor: "visitorDetails" },
        { label: "Email", accessor: "email" },
        { label: "Company Name", accessor: "companyName" },
        { label: "Status", accessor: "status" },
        { label: "City & State", accessor: "cityState" },
        { label: "Event", accessor: "event" },
        { label: "Updated Details", accessor: "updatedDetails" },
    ];

    const rows = [
        {
            registrationId: "NGT/OE/GV/0126/100006",
            visitorDetails: "Rohit Suthar | 9214059511",
            email: "rohit2553@gmail.com",
            companyName: "Not Provided By Visitor",
            status: "New Reg.",
            cityState: "Rani | Rajasthan",
            event: "30 Sep 25 | 20:51 | Web",
            updatedDetails: "30 Sep 25 | 20:51 | Web",
        },
        {
            registrationId: "NGT/OE/GV/0126/100006",
            visitorDetails: "Dr.s.boja Raj | 9944228535",
            email: "bojerode211@gmail.com",
            companyName: "Not Provided By Visitor",
            status: "New Reg.",
            cityState: "Erode | Tamil Nadu",
            event: "27 Sep 25 | 08:07 | Web",
            updatedDetails: "27 Sep 25 | 08:07 | Web",
        },
        {
            registrationId: "NGT/OE/GV/0126/100006",
            visitorDetails: "Dr.s.boja Raj | 9944228535",
            email: "bojerode211@gmail.com",
            companyName: "Not Provided By Visitor",
            status: "New Reg.",
            cityState: "Erode | Tamil Nadu",
            event: "27 Sep 25 | 08:06 | Web",
            updatedDetails: "27 Sep 25 | 08:06 | Web",
        },
        {
            registrationId: "NGT/OE/GV/0126/100006",
            visitorDetails: "Dr.s.boja Raj | 9944228535",
            email: "bojerode211@gmail.com",
            companyName: "Not Provided By Visitor",
            status: "New Reg.",
            cityState: "Erode | Tamil Nadu",
            event: "27 Sep 25 | 08:02 | Web",
            updatedDetails: "27 Sep 25 | 08:02 | Web",
        },
        {
            registrationId: "NGT/OE/GV/0126/100006",
            visitorDetails: "Dr.s.boja Raj | 9944228535",
            email: "bojerode211@gmail.com",
            companyName: "Not Provided By Visitor",
            status: "New Reg.",
            cityState: "Erode | Tamil Nadu",
            event: "27 Sep 25 | 07:59 | Web",
            updatedDetails: "27 Sep 25 | 07:59 | Web",
        },
        {
            registrationId: "NGT/OE/GV/0126/100006",
            visitorDetails: "Mahadev Vidrohli | 9429825908",
            email: "mahadevvidrohli@gmail.com",
            companyName: "Not Provided By Visitor",
            status: "New Reg.",
            cityState: "Ahmedabad | Gujarat",
            event: "26 Sep 25 | 21:15 | Web",
            updatedDetails: "26 Sep 25 | 21:15 | Web",
        },
        {
            registrationId: "NGT/OE/GV/0126/100006",
            visitorDetails: "Dipesh Baheti | 7000276488",
            email: "dipesh.baheti@gmail.com",
            companyName: "Not Provided By Visitor",
            status: "New Reg.",
            cityState: "Indore | Madhya pradesh",
            event: "26 Sep 25 | 02:31 | Web",
            updatedDetails: "26 Sep 25 | 02:31 | Web",
        },
        {
            registrationId: "NGT/OE/GV/0126/100006",
            visitorDetails: "Ved Yadav | 9996699154",
            email: "ved.aryan00001@gmail.com",
            companyName: "Rich soil Food Pvt Ltd",
            status: "New Reg.",
            cityState: "Bhiwadi | Rajasthan",
            event: "23 Sep 25 | 16:48 | Web",
            updatedDetails: "23 Sep 25 | 16:48 | Web",
        },
        {
            registrationId: "NGT/OE/GV/0126/100006",
            visitorDetails: "Prerna Pandey | 9220448109",
            email: "prernapandey83@gmail.com",
            companyName: "Not Provided By Visitor",
            status: "New Reg.",
            cityState: "Central Delhi | Delhi",
            event: "22 Sep 25 | 10:46 | Web",
            updatedDetails: "22 Sep 25 | 10:46 | Web",
        },
    ];

    const handleRowClick = (rowData) => {
        setSelectedClient(rowData);
    };

    const handleBackClick = () => {
        setSelectedClient(null);
    };

    return (
        <div className="w-full h-auto bg-[#eef1f5]">
            {selectedClient ? (
                <ClientOverview client={selectedClient} onBack={handleBackClick} />
            ) : (
                <>
                    <div className="w-full bg-white shadow-md border-b">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-3">
                            <h1 className="text-xl font-semibold text-gray-700 mb-2 lg:mb-0">
                                WEB VISITOR DATA 2025
                            </h1>
                        </div>
                    </div>
                    <div className="w-full bg-white p-3">
                        <h1 className='text-lg text-[#4f5a67] pl-4 pt-1'>GENRAL VISITOR LIST</h1>
                        <div className="flex flex-wrap justify-start md:justify-end gap-2 mb-1">
                            {/* You can add action buttons here if needed */}
                        </div>
                        <hr className="opacity-10 mb-2" />
                        <div className="text-xs">
                            <Globallytable rows={rows} columns={columns} onRowClick={handleRowClick} />
                        </div>
                        {/* Footer Section with Pagination and Buttons */}
                        <div className="table-footer">
                            <div className="entries-info">
                                Showing 1 to 10 of 4,496 entries
                            </div>
                            <div className="pagination">
                                <button className="nav-button">&lt;</button>
                                <button className="page-button active">1</button>
                                <button className="page-button">2</button>
                                <button className="page-button">3</button>
                                <button className="page-button">4</button>
                                <button className="page-button">5</button>
                                <button className="nav-button">&gt;</button>
                            </div>
                            <div className="action-buttons">
                                <div className="radio-group">
                                    <label><input type="radio" name="action" /> Send Details</label>
                                    <label><input type="radio" name="action" /> Office Location</label>
                                    <label><input type="radio" name="action" /> Venue Location</label>
                                    <label><input type="radio" name="action" /> Visitor Pass</label>
                                </div>
                                <div className="button-group">
                                    <button className="action-btn-blue">RESEND VISITOR PASS</button>
                                    <button className="action-btn-blue">SENT</button>
                                    <button className="action-btn-blue">HISTORY</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white shadow-md m-3 p-4 rounded-md">
                        <Textarea />
                    </div>
                </>
            )}
        </div>
    );
};

export default generalvisitor;