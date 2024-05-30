import React from "react";
import Sidebar from "./pages/Sidebar/sidebar";
import Header from "./pages/Header/header";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/dashboard";
import AddAnAsset from "./pages/Assets/AddAnAsset";
import { Box } from "@mui/joy";
import ListOfAssets from "./pages/Assets/ListOfAssets";
import CheckOut from "./pages/CheckOut/CheckOut";
import CheckIn from "./pages/CheckIn/CheckIn";
import Lease from "./pages/Lease/Lease";
import LeaseReturn from "./pages/LeaseReturn/LeaseReturn";
import Dispose from "./pages/Dispose/Dispose";
import Maintenance from "./pages/Maintenance/Maintenance";
import Reserve from "./components/AssetSections/EditAsset/Tabs/Reserve";
import Move from "./pages/Move/Move";
import Setup from "./pages/Alerts/Setup";

import SearchCriteria from "./pages/Assets/SearchCriteria";
import MaintenanceOverdue from "./pages/Maintenance/MaintenanceOverdue";
import Warranty from "./pages/Maintenance/WarrantieExp";
import LeasesExp from "./pages/Maintenance/LeasesExpiring";
import AssetsPastDue from "./pages/Maintenance/AssetsPastDue";
import CompanyInfo from "./pages/Companyinfo/CompanyInfo";
import MaintenancesDue from "./pages/Maintenance/MaintenancesDue";
import MaintenanceDue from "./pages/Alerts/MaintenanceDue";

const App = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{}}>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/company-info" element={<CompanyInfo />} />
          <Route path="/assets/add-an-asset" element={<AddAnAsset />} />
          <Route path="/assets/list-of-assets" element={<ListOfAssets />} />
          <Route path="/assets/checkout" element={<CheckOut />} />
          <Route path="/alerts/maintenances-due" element={<MaintenancesDue />} />
          <Route path="/assets/check-in" element={<CheckIn />} />
          <Route path="/assets/lease" element={<Lease />} />
          <Route path="/assets/lease-return" element={<LeaseReturn />} />
          <Route path="/assets/dispose" element={<Dispose />} />
          <Route path="/assets/maintenance" element={<Maintenance />} />
          <Route path="/assets/move" element={<Move />} />
          <Route path="/assets/reserve" element={<Reserve />} />
          <Route path="/alerts/maintenance-over-due" element={<MaintenanceOverdue />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/leases" element={<LeasesExp />} />
          <Route path="/assets-past" element={<AssetsPastDue />} />

          <Route path="/alerts/warranty-exp" element={<Warranty />} />
          <Route path="/alerts/leasesExpiring" element={<LeasesExp />} />
          <Route path="/alerts/assets-past-due" element={<AssetsPastDue />} />

          <Route path="/assets/add-an-asset" element={<AddAnAsset />} />
          <Route path="/assets/list-of-assets" element={<ListOfAssets />} />
          <Route path="/alerts/setup" element={<Setup />} />
          <Route path="/alerts/maintenance-due" element={<MaintenanceDue />} />
          <Route path="/asset-search-criteria" element={<SearchCriteria />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
