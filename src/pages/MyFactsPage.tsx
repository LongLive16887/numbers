import { Box } from "@mui/material";
import { UserFactsList } from "../components/UserFactsList";

const MyFactsPage = () => {
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
            <UserFactsList />
        </Box>

    );
};

export default MyFactsPage;
