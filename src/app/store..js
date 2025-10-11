import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import categoryReducer from "../features/category/categorySlice";
import natureReducer from "../features/nature/natureSlice";
import countryReducer from "../features/country/countrySlice";
import stateReducer from "../features/state/stateSlice";
import cityReducer from "../features/city/citySlice";
import dataSourceReducer from "../features/dataSource/dataSourceSlice";
import crmEventReducer from "../features/crmEvent/crmEventSlice";
import companyReducer from "../features/company/companySlice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    categories: categoryReducer,
    natures: natureReducer,
    countries: countryReducer,
    states: stateReducer,
    cities: cityReducer,
    dataSources: dataSourceReducer,
    events: crmEventReducer,
    companies: companyReducer,
  },
});

export default store;
