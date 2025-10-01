import React from 'react';
import { FiPrinter } from "react-icons/fi";
import { Route, Routes, Link } from 'react-router-dom';
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
// import GeneralVisitor from "../webvisitordata/generalvisitor";
// import CorporateVisitor from "../webvisitordata/corporatevisitor";
// import HealthCamp from "../webvisitordata/healthcamp";

const Dashboard = () => {
  return (
    <div className="w-full flex-1 overflow-auto bg-[#eef1f5]">
      <div className="p-2 sm:p-4">
        <Routes>
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/page5" element={<Page5 />} />
          <Route path="/page6" element={<Page6 />} />
          <Route path="/page7" element={<Page7 />} />
          <Route path="/page8" element={<Page8 />} />
          <Route path='/old' element={<Old />} />
          <Route path='/visitors' element={<Visitors />} />
          
          {/* Web Visitor Data Routes */}
          <Route path='/newvisitor' element={<NewVisitor />} />
          {/* <Route path='/generalvisitor' element={<GeneralVisitor />} />
          <Route path='/corporatevisitor' element={<CorporateVisitor />} />
          <Route path='/healthcamp' element={<HealthCamp />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard; 