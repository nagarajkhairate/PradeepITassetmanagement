import React, { useState } from "react";
import EditAssetInfo from "../../components/AssetSections/EditAsset/EditAssetInfo";
import EditAssetDetails from "../../components/AssetSections/EditAsset/EditAssetDetails";
import { useDispatch, useSelector } from "react-redux";
import {updateAsset} from "../../Redux/Features/assetSlice";


const EditAssets: React.FC = () => {
  const dispatch = useDispatch()
  const [editAssetData, setEditAssetData] = useState(useSelector((state:any)=>state.assets.data[0] || []));
  console.log("assetInfo", JSON.stringify(editAssetData));

  const dataUpdater = (data: any, tab: string)=>{       // data = { tabName :'name1', tabsData: {}, assetInfo:{} }
    if(tab === "AssetDetails" && data && data?.tabName){
      const tabName = data.tabName;
      setEditAssetData((prevData: any)=>({ ...prevData, assetDetails: {...prevData?.assetDetails, tabName: {...prevData?.assetDetails[data.tabName], ...data?.tabsData }  } }));
    }
    else if(tab === "AssetInfo" && data && data?.assetInfo){
      const assetInfoData = data.assetInfo;
      setEditAssetData((prevData: any)=>({...prevData, assetInfo:{ ...prevData.assetInfo,  ...assetInfoData}}));
    }
  }
  
const handleSubmit = ()=>{
  dispatch(updateAsset(editAssetData));
}

  return (
    <>
      <div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: "52px" }}>
          <EditAssetInfo assetInfo = {editAssetData?.assetInfo || []} dataUpdater={dataUpdater}/>
          <EditAssetDetails assetDetails ={editAssetData?.assetDetails || []} dataUpdater={dataUpdater}/>
        </div>
      </div>
    </>
  );
};

export default EditAssets;

const editAssetData ={
  "assetInfo":{},
  "assetDetails":{

  },
}