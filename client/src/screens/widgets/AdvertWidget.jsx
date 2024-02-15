import { Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
        <FlexBetween>
            <Typography color={dark} variant="h5" fontWeight="500">
                Sponsored
            </Typography>
            <Typography color={medium}>Create Ad</Typography>
        </FlexBetween>
        <img
         width="100%"
         height="auto"
         src="http://localhost:3001/assets/info4.jpeg" 
         alt="advert"
         style={{ borderRadius: "0.75rem", margin: "0.75rem" }}
         />
         <FlexBetween>
            <Typography color={main}>ATL Ghana</Typography>
            <Typography color={main}>atlghana.com</Typography>
         </FlexBetween>
         <Typography color={medium} m="0.5rem 0">
            Your pathway to a stunning and immaculate clothing brand made Sure
            it is pleasing to the eyes
         </Typography>
    </WidgetWrapper>
  )
}

export default AdvertWidget;
