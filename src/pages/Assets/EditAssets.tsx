import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAssetById } from "../../Redux/features/assetSlice";
import { RootState } from "../../Redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import EditAssetInfo from "../../components/AssetSections/EditAsset/EditAssetInfo";
import EditAssetDetails from "../../components/AssetSections/EditAsset/EditAssetDetails";
import { Typography } from '@mui/joy';

const EditAssets: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const asset = useSelector((state: RootState) => state.assets.selectedAsset);
  const [editAssetData, setEditAssetData] = useState(asset);
  useEffect(() => {
    if (id) {
      dispatch(fetchAssetById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (asset) {
      setEditAssetData(asset);
    }
  }, [asset]);

  const dataUpdater = (data: any, tab: string) => {
    if (tab === "AssetDetails" && data && data?.tabName) {
      const tabName = data.tabName;
      setEditAssetData((prevData: any) => ({
        ...prevData,
        assetDetails: {
          ...prevData?.assetDetails,
          [tabName]: {
            ...prevData?.assetDetails[tabName],
            ...data?.tabsData,
          },
        },
      }));
    } else if (tab === "AssetInfo" && data && data?.assetInfo) {
      const assetInfoData = data.assetInfo;
      setEditAssetData((prevData: any) => ({
        ...prevData,
        assetInfo: { ...prevData.assetInfo, ...assetInfoData },
      }));
    }
  };

  const handleSubmit = () => {
    dispatch(updateAsset(editAssetData));
  };

  return (
    <>
      <div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: " 0px 52px 0 65px", paddingTop: "30px" }}>
          <Typography level="h3">Asset View</Typography>
          <EditAssetInfo
            assetInfo={editAssetData}
            dataUpdater={dataUpdater}
          />
          <EditAssetDetails
            assetDetails={editAssetData?.assetDetails || {}}
            dataUpdater={dataUpdater}
          />
        </div>
      </div>
    </>
  );
};

export default EditAssets;
