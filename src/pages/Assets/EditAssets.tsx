import React from "react";
import EditAssetInfo from "../../components/AssetSections/EditAsset/EditAssetInfo";
import EditAssetDetails from "../../components/AssetSections/EditAsset/EditAssetDetails";



const EditAssets: React.FC = () => {
  return (
    <>
      <div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: "52px" }}>
          <EditAssetInfo/>
          <EditAssetDetails/>
        </div>
      </div>
    </>
  );
};

export default EditAssets;
