import { Box } from "@mui/joy";
import Img from '../../Assets/Maintainance.png';

export function Image(){
    return(
        <>

        <Box>
          <div style={{ width: "100%", background: "white" }}>
            <div style={{ margin: "52px" }}>
              <Box
                 
                sx={{
                  borderRadius: "16px",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  background: "white",
                  marginTop: "20px",
                  marginLeft: "10px",
                  padding: "90px",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                >
                    <img src={Img} alt="img"  
                    style={{
                      width: '440px',
                        height: '404px',
                        top:"165px",
                        left:"512px"
                        
                        }} 
                    /> 
              </Box>
            </div>
          </div>
        </Box>
        </>
    )
}

export default Image;