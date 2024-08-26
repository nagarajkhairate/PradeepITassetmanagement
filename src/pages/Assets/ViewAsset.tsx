import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { Box, Typography } from '@mui/joy'
import AppView from '../../components/Common/AppView'
import ViewAssetInfo from './ViewAssetInfo'
import { RootState } from '../../redux/store'
import { fetchAssetsById, updateAssets } from '../../redux/features/AssetSlice'
import EditAssetDetails from '../../components/AssetSections/EditAsset/EditAssetDetails'

const ViewAsset: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const[editAssetData,setEditAssetData]=useState()
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch()
  const assets = useSelector((state: RootState) =>
    state.assets.data.find((asset: any) => asset.id.toString() === id),
  ) as any

  useEffect(() => {
    dispatch(fetchAssetsById(id))
  }, [id])

  useEffect(() => {
    if (assets) {
      setEditAssetData(assets);
    }
  }, [assets]);

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
      <Box sx={{ mb: 1 }}>
      {assets && <ViewAssetInfo assets={assets} id={id} />}
      </Box>
      <Box sx={{ mt: 1 }}>
      <EditAssetDetails
            assetDetails={editAssetData?.assetDetails || {}}
            dataUpdater={dataUpdater}
          />
           </Box>
    </AppView>
  )
}

export default ViewAsset
