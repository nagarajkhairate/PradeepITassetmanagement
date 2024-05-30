import { Box } from "@mui/joy";
import Img from "../../Assets/Maintainance.png";

export function Image() {
  return (
    <>
      <div style={{ width: "100%", background: "#f9f9f9" }}>
       
          <Box
            sx={{
              borderRadius: "16px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              background: "#ffffff",
              // padding: { xs: "10px", sm: "0px" },
              flexGrow: 1,
              // marginLeft: { xs: "0px", sm: "0px" },
              marginTop: { xs: "10px", sm: "22px" },
              width: { xs: "100%", sm: "90%", md: "850px" },
              height: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}

            
          >
            <Box
              sx={{
                marginTop: { xs: "50px", sm: "100px" },
                width: { xs: "60%", sm: "40%", md: "20%" },
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={Img}
                alt="img"
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>
          </Box>
        </div>
    </>
  );
}

export default Image;
