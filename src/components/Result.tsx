import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../app/store/store";
import {
    Container,
    Typography,
    Alert,
    Button,
    Box,
    Card,
    CardContent,
    Divider,
    Stack,
    TextField,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useState, useEffect } from "react";

export const Result = () => {
    const navigate = useNavigate();
    const fact = useSelector((state: RootState) => state.fact.value);

    const [showInput, setShowInput] = useState(false);
    const [customText, setCustomText] = useState("");
    const [customFacts, setCustomFacts] = useState<string[]>([]);

    const key = fact ? `${fact.number}-${fact.type}` : "";

    useEffect(() => {
        if (!fact) return;

        const local = JSON.parse(localStorage.getItem("customFacts") || "{}");
        if (local[key]) {
            setCustomFacts(local[key]);
        }
    }, [fact]);

    const handleSaveCustomFact = () => {
        if (!fact || !customText.trim()) return;

        const local = JSON.parse(localStorage.getItem("customFacts") || "{}");
        const existingFacts: string[] = local[key] || [];

        const updatedFacts = [...existingFacts, customText.trim()];
        local[key] = updatedFacts;

        localStorage.setItem("customFacts", JSON.stringify(local));
        setCustomFacts(updatedFacts);
        setCustomText("");
        setShowInput(false);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
                Результат
            </Typography>

            {!fact ? (
                <Alert
                    severity="info"
                    icon={<InfoIcon fontSize="inherit" />}
                    sx={{ mt: 4 }}
                >
                    Факт не найден. Вернитесь назад и попробуйте снова.
                </Alert>
            ) : (
                <Card elevation={4} sx={{ mt: 4, p: 2 }}>
                    <CardContent>
                        <Alert
                            severity={fact.found ? "success" : "warning"}
                            icon={
                                fact.found ? (
                                    <CheckCircleIcon fontSize="inherit" />
                                ) : (
                                    <WarningAmberIcon fontSize="inherit" />
                                )
                            }
                            sx={{ mb: 3 }}
                        >
                            {fact.text}
                        </Alert>

                        {customFacts.length > 0 && (
                            <Stack spacing={2} sx={{ mb: 2 }}>
                                <Typography fontWeight={500}>Добавленные вами факты:</Typography>
                                {customFacts.map((userFact, idx) => (
                                    <Alert key={idx} severity="info">
                                        {userFact}
                                    </Alert>
                                ))}
                            </Stack>
                        )}

                        <Divider />

                        <Stack spacing={1} mt={2}>
                            <Typography>
                                <strong>Число:</strong> {fact.number}
                            </Typography>
                            <Typography>
                                <strong>Тип:</strong> {fact.type}
                            </Typography>
                            {fact.date && (
                                <Typography>
                                    <strong>Дата:</strong> {fact.date}
                                </Typography>
                            )}
                        </Stack>

                        <Box mt={3}>
                            {!showInput ? (
                                <Button onClick={() => setShowInput(true)} variant="outlined">
                                    Добавить свой факт
                                </Button>
                            ) : (
                                <Stack spacing={2}>
                                    <TextField
                                        label="Ваш факт"
                                        value={customText}
                                        onChange={(e) => setCustomText(e.target.value)}
                                        multiline
                                        fullWidth
                                    />
                                    <Button
                                        onClick={handleSaveCustomFact}
                                        variant="contained"
                                        disabled={!customText.trim()}
                                    >
                                        Сохранить факт
                                    </Button>
                                </Stack>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            )}

            <Box mt={4} display="flex" justifyContent="center">
                <Button onClick={() => navigate(-1)} variant="outlined" size="large">
                    Назад
                </Button>
            </Box>
        </Container>
    );
};
