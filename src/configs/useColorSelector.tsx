import { colors } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const useColorSelector = () => {
  const darkMode: boolean = useSelector((state: RootState) => state.mode.value === 'light');

  const styleConfigs = {
      bg: darkMode ? "#101418" : "#fff", 
      color: darkMode ? "#ccc" : "#000", 
      hoverBg: darkMode ? "#404040" : "#000000", 
      activeBg: darkMode ? "#f3f4f6" : "#404040", 
      headerBg: darkMode ? "#fcd14f" : "#404040" ,
      backgroundColor:darkMode ?  "#f3f4f6" : "" ,
      backgroundColorWhite:darkMode ?  "#FFF" : "" ,
      mainBg: darkMode ? colors.grey["900"] : colors.grey["100"] // Adjust main background color
  };


  return styleConfigs;
}

export default useColorSelector;