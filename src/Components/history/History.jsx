import React, { useState } from "react";
import Globallytable from "../Globallytable";
import ClientOverview from "../ClientOverview";

const History = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const columns = [
    { label: "S. No.", accessor: "serial.number" },
    { label: "Message & Attachment", accessor: "massage.attachment" },
    { label: "Sent to", accessor: "Sent.to" },
    { label: "Sender Details", accessor: "Sender.Details" },
  ];

  const rows = [
    {
      serial: { number: "1" },
      massage: { attachment: "Attachment.pdf" },
      Sent: { to: "Ravi Kumar" },
      Sender: { Details: "" },
    },
    {
      serial: { number: "2" },
      massage: { attachment: "Attachment.pdf" },
      Sent: { to: "Priya Singh" },
      Sender: { Details: "" },
    },
    {
      serial: { number: "3" },
      massage: { attachment: "Attachment.pdf" },
      Sent: { to: "Amit Verma" },
      Sender: { Details: "" },
    },
    {
      serial: { number: "4" },
      massage: { attachment: "Attachment.pdf" },
      Sent: { to: "Neha Agarwal" },
      Sender: { Details: "" },
    },
    {
      serial: { number: "5" },
      massage: { attachment: "Attachment.pdf" },
      Sent: { to: "Suresh Yadav" },
      Sender: { Details: "" },
    },
    {
      serial: { number: "6" },
      massage: { attachment: "Attachment.pdf" },
      Sent: { to: "Komal Jain" },
      Sender: { Details: "" },
    },
    {
      serial: { number: "7" },
      massage: { attachment: "Attachment.pdf" },
      Sent: { to: "Manoj Tiwari" },
      Sender: { Details: "" },
    },
  ];

  const handleClientClick = (clientData) => {
    setSelectedClient(clientData);
  };

  const handleBackClick = () => {
    setSelectedClient(null);
  };

  return (
    <div className="w-full h-auto bg-[#eef1f5]">
      {selectedClient ? (
        // When a client is selected, show only the ClientOverview component
        <ClientOverview client={selectedClient} onBack={handleBackClick} />
      ) : (
        // When no client is selected, show the list and the Textarea below it
        <>
          <div className="w-full bg-white shadow-md mb-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between px-4 py-1 ">
              <h1 className="text-xl  text-gray-500 mb-2 lg:mb-0">
                CLIENT DATA 2025
              </h1>
            </div>
          </div>
          <div className="w-full bg-white p-3">
            <h1 className="text-lg text-[#4f5a67] pl-4 ">WHATSAPP HISTORY</h1>
            <div className="flex flex-wrap justify-start md:justify-end gap-2 mb-1"></div>
            <hr className="opacity-10 mb-2" />
            <div className="text-xs">
              <Globallytable
                rows={rows}
                colomns={columns}
                onRowClick={handleClientClick}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default History;
