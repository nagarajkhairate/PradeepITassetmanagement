import React, { useState } from "react";
import { Typography, Box, Button, Grid, Checkbox, Modal, Input, Table } from "@mui/joy";
import SearchIcon from "../../Assets/search.svg";
import EmptyContainer from "../../components/Common/EmptyContainer";

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

const Maintenance: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

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
    // Add the selected assets to the state and close the modal
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
          Maintenance
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

      <EmptyContainer title="Keep track of your assets within your organization and create an even more detailed history of them."
    //    selectedAssets={selectedAssetData}
       />
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
            <Table sx={{ marginBottom: 2, fontWeight: 'bold', border: "1px solid #f2f2f2", width: "100%" }}>
            <thead>
        <tr>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2", width:"20px",background: "#fff8e6" }}><Checkbox /></th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Asset Tag ID</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Description</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Status</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Assigned to</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Site</th>
            <th style={{ padding: "8px", border: "1px solid #f2f2f2" ,background: "#fff8e6" }}>Location</th>
          </tr>
        </thead>

            </Table>
            {filteredAssets.map((asset, index) => (
              <tr key={index}>
                <td  style={{ padding: "8px", border: "1px solid #f2f2f2" , width:"20px"}} color="#FFFFFF33">
                  <Checkbox
                    checked={selectedAssets.includes(asset.id)}
                    onChange={() => handleCheckboxChange(asset.id)}
                  />
                </td>
                <td style={{ padding: "8px", border: "1px solid #f2f2f2" }} color="#4880FF">{asset.id}</td>
                <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.description}</td>
                <td  style={{ padding: "8px", border: "1px solid #f2f2f2" }} color="#13B457">{asset.status}</td>
                <td  style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.assignedTo}</td>
                <td  style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.site}</td>
                <td style={{ padding: "8px", border: "1px solid #f2f2f2" }}>{asset.location}</td>
              </tr>
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

export default Maintenance;
