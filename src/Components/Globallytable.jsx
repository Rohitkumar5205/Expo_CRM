import React, { useRef, useState, useEffect } from "react";
import { IoCaretUpOutline } from "react-icons/io5";
import { IoCaretDown } from "react-icons/io5";

// Helper: safely read nested values (e.g. "company.name")
const getValue = (obj, path) =>
  (path || "")
    .split(".")
    .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : ""), obj) ||
  "";

// Helper: stable row key (prefers id/_id then index)
const getRowKey = (row, index) => {
  if (row == null) return index;
  return row.id ?? row._id ?? index;
};

const Globallytable = ({ rows = [], colomns = [], onRowClick }) => {
  const [tableRows, setTableRows] = useState(rows);
  const [filters, setFilters] = useState({});
  const [globalSearch, setGlobalSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]); // stores row keys
  const [sortKey, setSortKey] = useState(null); // currently sorted accessor
  const [ascending, setAscending] = useState(true); // current direction for sortKey
  const tableContainerRef = useRef();

  // Keep local copy synced to prop changes
  useEffect(() => {
    setTableRows(rows);
    // keep selection filtered out if source rows changed
    setSelectedRows([]);
    setSortKey(null);
  }, [rows]);

  const handleFilterChange = (accessor, value) => {
    setFilters((prev) => ({ ...prev, [accessor]: value.toLowerCase() }));
  };

  // Filtering + global search
  const filteredRows = tableRows.filter((row) => {
    const matchesFilters = colomns.every((col) => {
      const filterValue = filters[col.accessor] || "";
      const cellValue = String(getValue(row, col.accessor)).toLowerCase();
      if (!cellValue.trim() && filterValue) return false;
      if (!filterValue) return true;
      return cellValue.includes(filterValue);
    });

    const matchesGlobal = globalSearch
      ? colomns.some((col) =>
          String(getValue(row, col.accessor))
            .toLowerCase()
            .includes(globalSearch.toLowerCase())
        )
      : true;

    return matchesFilters && matchesGlobal;
  });

  const noData = filteredRows.length === 0;

  // Selection by stable key
  const toggleSelectAll = () => {
    const allKeys = filteredRows.map((row, i) => getRowKey(row, i));
    const allSelected =
      selectedRows.length > 0 &&
      allKeys.every((k) => selectedRows.includes(k)) &&
      allKeys.length > 0;

    setSelectedRows(allSelected ? [] : allKeys);
  };

  const toggleRow = (rowKey) => {
    setSelectedRows((prev) =>
      prev.includes(rowKey) ? prev.filter((k) => k !== rowKey) : [...prev, rowKey]
    );
  };

  // Sorting: works with nested accessor and numeric/text values
  const handleSort = (accessor) => {
    // determine next direction
    const nextDirection = sortKey === accessor ? !ascending : true;

    const sorted = [...tableRows].sort((a, b) => {
      const aVal = getValue(a, accessor);
      const bVal = getValue(b, accessor);

      const aStr = String(aVal).trim();
      const bStr = String(bVal).trim();

      // numeric compare when both parse as numbers
      const aNum = parseFloat(aStr);
      const bNum = parseFloat(bStr);
      const bothNumbers = !Number.isNaN(aNum) && !Number.isNaN(bNum);

      if (bothNumbers) {
        return nextDirection ? aNum - bNum : bNum - aNum;
      }

      // fallback: case-insensitive string compare
      return nextDirection
        ? aStr.toLowerCase().localeCompare(bStr.toLowerCase())
        : bStr.toLowerCase().localeCompare(aStr.toLowerCase());
    });

    setTableRows(sorted);
    setSortKey(accessor);
    setAscending(nextDirection);
    // Clear selection because row order changed (optional)
    setSelectedRows([]);
  };

  // Print (unchanged logic)
  const handlePrint = () => {
    const originalBodyDisplay = document.body.style.display;
    const originalBodyOverflow = document.body.style.overflow;
    const tableContainer = tableContainerRef.current;

    document.body.style.display = "block";
    document.body.style.overflow = "hidden";

    const allElements = document.querySelectorAll("body > *");
    const hiddenElements = [];
    allElements.forEach((el) => {
      if (!el.contains(tableContainer)) {
        hiddenElements.push(el);
        el.style.display = "none";
      }
    });

    window.print();

    hiddenElements.forEach((el) => {
      el.style.display = "";
    });
    document.body.style.display = originalBodyDisplay;
    document.body.style.overflow = originalBodyOverflow;
  };

  // CSV export (uses filteredRows)
  const exportToCsv = () => {
    const headers = colomns.map((col) => `"${col.label}"`).join(",");
    const csvRows = filteredRows.map((row) =>
      colomns
        .map((col) => {
          const value = getValue(row, col.accessor);
          const sanitizedValue = String(value).replace(/"/g, '""');
          return `"${sanitizedValue}"`;
        })
        .join(",")
    );
    const csvString = [headers, ...csvRows].join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "ClientData.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const scrollTable = (direction) => {
    const container = tableContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "forward" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            .printable-table-container, .printable-table-container * { visibility: visible; }
            .printable-table-container { position: absolute; left: 0; top: 0; width: 100%; overflow: visible; }
            .printable-table-container table { border-collapse: collapse; width: 100%; border: 1px solid black; }
            .printable-table-container th, .printable-table-container td { border: 1px solid black; padding: 8px; }
          }
        `}
      </style>
      <div className="flex flex-wrap justify-between items-center p-5 pt-3 print-hidden">
        <div className="flex items-center mb-4 md:mb-0">
          <select className="h-8 w-20 border border-gray-300 text-sm pl-4">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="all">All</option>
          </select>
          <p className="ml-1 text-sm mt-1">entries</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2">
          <button
            onClick={handlePrint}
            className="text-[#2f353b] h-7 w-24 text-xs text-center cursor-pointer hover:bg-black hover:text-white border border-[#2f353b]"
          >
            Print
          </button>
          <button
            onClick={exportToCsv}
            className="h-7 w-24 text-[#78a300] text-xs text-center cursor-pointer hover:bg-[#78a300] hover:text-white border border-[#78a300]"
          >
            Excel
          </button>
          <div className="flex items-center w-full md:w-50">
            <label className="pt-1 text-[#2f353b] text-sm" htmlFor="Search">
              Search:
            </label>
            <input
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="ml-1 px-2 h-7 border border-gray-300 text-xs outline-none hover:border-blue-500 w-full"
              type="text"
            />
          </div>
        </div>
      </div>

      <div
        ref={tableContainerRef}
        className="overflow-x-auto mx-auto printable-table-container"
      >
        <div>
          <table className="border border-gray-200 text-[#4f5a67] text-xs font-semibold mb-5 md:mb-5 w-full min-w-max">
            <thead>
              <tr className="bg-[#555555] text-white">
                <th className="h-8 w-[60px] pl-3 border border-gray-200 print-hidden">
                  <div className="h-6 flex items-center justify-center !mb-0">
                    <input
                      className="table-checkbox"
                      checked={
                        selectedRows.length === filteredRows.length &&
                        filteredRows.length > 0
                      }
                      onChange={toggleSelectAll}
                      type="checkbox"
                    />
                  </div>
                </th>
                {colomns.map((col) => (
                  <th
                    key={col.accessor}
                    className="h-8 pl-3 border border-gray-200 text-left"
                    style={{ width: col.width }}
                  >
                    {col.label}
                    {sortKey === col.accessor && <span className="  ml-7">{ascending ? <IoCaretUpOutline /> : <IoCaretDown />}</span>}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {!noData ? (
              filteredRows.map((row, i) => {
                const rowKey = getRowKey(row, i);
                return (
                  <tr key={rowKey} className="hover:bg-gray-50">
                    <td className="h-8 w-[60px] pl-3 border border-gray-200 text-center print-hidden">
                      <input
                        className="table-checkbox"
                        checked={selectedRows.includes(rowKey)}
                        onChange={() => toggleRow(rowKey)}
                        type="checkbox"
                      />
                    </td>

                    {colomns.map((col) => (
                      <td
                        key={col.accessor}
                        className="h-8 pl-3 border border-gray-200 text-left"
                        style={{ width: col.width }}
                      >
                        {/* Check if column has custom render function */}
                        {col.render ? (
                          col.render(getValue(row, col.accessor), row)
                        ) : col.accessor === "company.name" ? (
                          <span
                            onClick={() => onRowClick(row)}
                            className="text-[#337ab7] cursor-pointer hover:underline print-hidden"
                          >
                            {getValue(row, col.accessor)}
                          </span>
                        ) : (
                          getValue(row, col.accessor)
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={colomns.length + 1} className="text-center text-gray-400 py-3 border border-gray-200">
                  No data found
                </td>
              </tr>
            )}
          </tbody>

          <tfoot className="print-hidden">
            <tr>
              <td className="w-[60px] border border-gray-200"></td>
              {colomns.map((col) => (
                <td key={col.accessor} className="border border-gray-200" style={{ width: col.width }}>
                  <div className="h-8">
                    <input
                      type="text"
                      placeholder={`Search ${col.label}`}
                      className="w-full px-1 text-xs border-none outline-none"
                      value={filters[col.accessor] || ""}
                      onChange={(e) => handleFilterChange(col.accessor, e.target.value)}
                    />
                  </div>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-between items-center p-5 text-xs pt-6 print-hidden">
        <p className="p-2 mb-4 md:mb-0">
          Showing 1 to {filteredRows.length} of {tableRows.length} entries
        </p>
        <div className="flex">
          <ul className="flex cursor-pointer">
            <li onClick={() => scrollTable("back")} className="border text-gray-400 border-gray-200 flex items-center justify-center h-8 w-12">
              &lt;
            </li>
            <li className="border text-white border-gray-200 flex items-center justify-center h-8 w-10 bg-[#337ab7]">
              1
            </li>
            <li onClick={() => scrollTable("forward")} className="border text-gray-400 border-gray-200 flex items-center justify-center h-8 w-12">
              &gt;
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Globallytable;