import { Typography } from "@mui/joy";
import { Box } from "victory";


export function EmptyPage(){
    return (
        <>
        <div style={{ width: "100%", background: "#f9f9f9" }}>
        <div style={{ margin: "52px" }}>
          <Typography level="h3">List Of Assets</Typography>
          <Box
          style={{
            borderRadius: "16px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            background: "#ffffff",
            margin: {
              xs: "4px",
              md: "52px",
            },
          }}
        ></Box>
          </div>
          </div>
        </>
    )
}

export default EmptyPage;