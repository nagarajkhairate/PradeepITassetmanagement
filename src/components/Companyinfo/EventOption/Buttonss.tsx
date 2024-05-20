import { Box, Button } from "@mui/joy";
import { Link } from "react-router-dom";
import { MouseEventHandler } from "react";

interface ButtonsProps {
    handleSubmit: MouseEventHandler<HTMLAnchorElement>;
  }

export function Buttonss({ handleSubmit }: ButtonsProps){
    return(
       
              <Box sx={{ mr: "20px" }}>
                <Box sx={{ mr: "20px" }}>
                <Button
                  sx={{
                    background: "white",
                    border: "1px solid black",
                    color: "black",
                    borderRadius: "15px",
                    marginLeft: "80%",
                    "@media (max-width: 600px)": {
                      marginLeft: 0,
                      marginRight: "auto",
                    },
                    "&:hover": { background: "#f0f0f0" },
                  }}
                >
                  <Link to="/database"  style={{
                      textDecoration: "none",
                      color: "inherit",
                      
                      
                    }}>Cancel</Link>
                </Button>
                <Button
                  sx={{
                    ml: "10px",
                    background: "#FABC1E",
                    color: "black",
                    borderRadius: "15px",
                 
                    "&:hover": { background: "#E1A91B" },
                  }}
                  onClick={handleSubmit}
                >
                  Finish
                </Button>
              </Box>
              </Box>
    )
}
export default Buttonss;