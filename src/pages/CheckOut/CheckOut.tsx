import React, { useState } from "react";
import { Typography, Box, Button, Grid, Checkbox, Modal, Input } from "@mui/joy";
import SearchIcon from "../../Assets/search.svg";
import EmptyContainer from "../../components/Common/EmptyContainer";
import CheckOutForm from "./CheckOutForm";

const assets = [
  {
    id: 'BBC-BLR-BKS-1000',
    description: '12th Gen, Intel Core i3-N305 Processor 8/18 GHz (8MB Cache, up to 3.8 GHz Turbo boost, 8 cores, 8 threads)',
    status: 'Checked Out',
    assignedTo: 'Sanjana H',
    site: 'Hubli',
    location: 'Gokul RD/hubli',
    leaseTo: ''
  },
  {
    id: 'BBC-BLR-BKS - 1001',
    description: '12th Gen, Intel Core i3-N305 Processor 1.8 GHz (6MB Cache, up to 3.8 GHz turbo boost, 8 cores, 8 threads)',
    status: 'Checked Out',
    assignedTo: 'Kavita G',
    site: 'Hubli',
    location: 'Gokul RD',
    leaseTo: ''
  },
  {
    id: 'BBC-BLR-BKS-1002',
    description: '12th Gen, Intel Core i3-N305 Processor 8/18 GHz (8MB Cache, up to 3.8 GHz Turbo boost, 8 cores, 8 threads)',
    status: 'Checked Out',
    assignedTo: 'Shruti K',
    site: 'Bagalkot',
    location: 'Old Bagalkot',
    leaseTo: ''
  },
];

const CheckOut: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [remainingAssets, setRemainingAssets] = useState(assets);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedAssets((prevSelectedAssets) =>
      prevSelectedAssets.includes(id)
        ? prevSelectedAssets.filter((assetId) => assetId !== id)
        : [...prevSelectedAssets, id]
    );
  };

  const handleAddToList = () => {
    const addedAssets = remainingAssets.filter(asset => selectedAssets.includes(asset.id));
    setRemainingAssets(remainingAssets.filter(asset => !selectedAssets.includes(asset.id)));
    handleClose();
  };

  const filteredAssets = assets.filter((asset) =>
    asset.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const selectedAssetData = assets.filter(asset => selectedAssets.includes(asset.id));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: "52px" }}>
        <Typography
          level="h3"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Check-Out
        </Typography>
        
        <Button
          onClick={handleOpen}
          sx={{
            backgroundColor: "#13B457",
            color: "white",
            "&:hover": { backgroundColor: "darkgreen" },
          }}
        >
          + Select Assets
        </Button>
      </Box>

    
      {selectedAssetData.length > 0 ? (
        <CheckOutForm selectedAssets={selectedAssetData} />
      ) : (
        <EmptyContainer title="Keep track of your assets within your organization and create an even more detailed history of them."/>
      )}
         
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ background: '#fff', padding: 3, borderRadius: "16px", margin: "auto", marginTop: "5%", width: "50%" }}>
          <Typography level="h4" sx={{ marginBottom: 2 }}>Select Assets</Typography>
          <Box sx={{ position: "relative", display: "flex", alignItems: "center", marginRight: "20px", marginBottom: "20px" }}>
            <Input
              placeholder="Search type of keywords"
              value={searchKeyword}
              onChange={handleSearchChange}
              sx={{
                width: "300px",
                paddingLeft: "40px",
                height: "30px",
                borderColor: "#7676764D",
                lineHeight: "24px",
                fontSize: '12px',
                border: "1px solid #7676764D"
              }}
            />
            <Box
              component="img"
              src={SearchIcon}
              alt="Search Icon"
              sx={{
                position: "absolute",
                left: "10px",
                width: "20px",
                height: "20px"
              }}
            />
          </Box>
          <Box>
            <Grid container spacing={1} sx={{ marginBottom: 2, fontWeight: 'bold', padding: "0 20px" }} color="#767676">
              <Grid xs={1}><Checkbox /></Grid>
              <Grid xs={2}>Assets Tag ID</Grid>
              <Grid xs={4}>Description</Grid>
              <Grid xs={1}>Status</Grid>
              <Grid xs={2}>Assigned to</Grid>
              <Grid xs={1}>Site</Grid>
              <Grid xs={1}>Location</Grid>
            </Grid>
            {filteredAssets.map((asset, index) => (
              <Grid container spacing={3} key={index} sx={{ padding: "0 20px" }}>
                <Grid xs={1} color="#FFFFFF33">
                  <Checkbox
                    checked={selectedAssets.includes(asset.id)}
                    onChange={() => handleCheckboxChange(asset.id)}
                  />
                </Grid>
                <Grid xs={2} color="#4880FF">{asset.id}</Grid>
                <Grid xs={4}>{asset.description}</Grid>
                <Grid xs={1} color="#13B457">{asset.status}</Grid>
                <Grid xs={2}>{asset.assignedTo}</Grid>
                <Grid xs={1}>{asset.site}</Grid>
                <Grid xs={1}>{asset.location}</Grid>
              </Grid>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} sx={{ marginRight: 2, background: "#000000", width: "100px" }}>Cancel</Button>
            <Button onClick={handleAddToList} sx={{ background: "#FBC21E" }}>Add to List</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default CheckOut;
