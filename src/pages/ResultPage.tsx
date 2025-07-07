import { Result } from "../components/Result";
import { Box } from "@mui/material";

const ResultPage = () => {
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
            <Result />
        </Box>
    );
};

export default ResultPage;