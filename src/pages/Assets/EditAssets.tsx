import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../Redux/store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import EditAssetInfo from "./ViewAssetInfo";
import EditAssetDetails from "../../components/AssetSections/EditAsset/EditAssetDetails";
import { Typography } from '@mui/joy';
import AppView from "../../components/Common/AppView";
import { fetchAssetsById, updateAssets } from "../../Redux/features/AssetSlice";
import ViewAssetInfo from "./ViewAssetInfo";

const EditAssets: React.FC = () => {

  const assets = useSelector((state: RootState) => state.assets.data);
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const asset = useSelector((state: RootState) => state.assets.data);
  const [editAssetData, setEditAssetData] = useState(asset);
  useEffect(() => {
    if (id) {
      dispatch(fetchAssetsById(id));
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
    dispatch(updateAssets(editAssetData));
  };


  return (
    <AppView>
      
          <Typography level="h3">Asset View</Typography>
          <ViewAssetInfo
            assetInfo={editAssetData}
            dataUpdater={dataUpdater}
            assets={assets}          />
          {/* <EditAssetDetails
            assetDetails={editAssetData?.assetDetails || {}}
            dataUpdater={dataUpdater}
          /> */}
    </AppView>
  );
};

export default EditAssets;
