import { NumberForm } from "../components/Form";
import { Box } from "@mui/material";

const HomePage = () => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}
        >
            <NumberForm />
        </Box>

    );
};

export default HomePage;
