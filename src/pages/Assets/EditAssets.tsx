import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Typography } from '@mui/joy';
import AppView from "../../components/Common/AppView";
import ViewAssetInfo from "./ViewAssetInfo";
import { RootState } from "../../redux/store";
import { fetchAssetsById } from "../../redux/features/AssetSlice";

const EditAssets: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const assets = useSelector((state: RootState) =>
    state.assets.data.find((asset: any) => asset.id.toString() === id),
  ) as any

  console.log(id)
  useEffect(() => {
    console.log('hsafjg')
      dispatch(fetchAssetsById(id));
  }, []);

  // useEffect(() => {
  //   if (asset) {
  //     setEditAssetData(asset);
  //   }
  // }, [asset]);

  // const dataUpdater = (data: any, tab: string) => {
  //   if (tab === "AssetDetails" && data && data?.tabName) {
  //     const tabName = data.tabName;
  //     setEditAssetData((prevData: any) => ({
  //       ...prevData,
  //       assetDetails: {
  //         ...prevData?.assetDetails,
  //         [tabName]: {
  //           ...prevData?.assetDetails[tabName],
  //           ...data?.tabsData,
  //         },
  //       },
  //     }));
  //   } else if (tab === "AssetInfo" && data && data?.assetInfo) {
  //     const assetInfoData = data.assetInfo;
  //     setEditAssetData((prevData: any) => ({
  //       ...prevData,
  //       assetInfo: { ...prevData.assetInfo, ...assetInfoData },
  //     }));
  //   }
  // };

  // const handleSubmit = () => {
  //   dispatch(updateAssets(editAssetData));
  // };


  return (
    <AppView>
          <Typography level="h3">Asset View</Typography>
          {assets && <ViewAssetInfo
            assets={assets}  id={id}        />}
          {/* <EditAssetDetails
            assetDetails={editAssetData?.assetDetails || {}}
            dataUpdater={dataUpdater}
          /> */}
    </AppView>
  );
};

export default EditAssets;
