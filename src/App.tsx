import React from "react";
import Sidebar from "./pages/Sidebar/sidebar";
import Header from "./pages/Header/header";
import { Routes, Route } from "react-router-dom";

import { Box } from "@mui/joy";

import MainLayout from "./components/layout/MainLayout";
import { routes } from "./routes";

const App = () => {
  return (
    <Box sx={{ display: "flex" }}>
      
        <Routes>
          {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="/" element={<MainLayout />}>
          {routes}
        </Route>
          {/* <Route path="/" element={<Dashboard />} />
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
          <Route path="/setup/location-setup" element={<LocationSetup />} />
          <Route path="/setup/setup-comp-info" element={<SetupCompInfo />} /> */}
        </Routes>
      </Box>

  );
};

export default App;
