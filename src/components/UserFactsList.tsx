import {
    Container,
    Typography,
    Card,
    CardContent,
    Stack,
    Divider,
    IconButton,
    Box,
    Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useEffect } from "react";
import type { CustomFact } from "../types/types";
import { useNavigate } from "react-router-dom";

export const UserFactsList = () => {
    const [facts, setFacts] = useState<CustomFact[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const local = localStorage.getItem("customFacts");
        if (local) {
            const parsed = JSON.parse(local) as Record<string, string[]>;
            const entries: CustomFact[] = Object.entries(parsed).flatMap(([key, texts]) => {
                const [number, type] = key.split("-");
                return texts.map((text) => ({
                    key,
                    number,
                    type,
                    text,
                }));
            });
            setFacts(entries);
        }
    }, []);


    const deleteFact = (keyToDelete: string) => {
        const updatedFacts = facts.filter((f) => f.key !== keyToDelete);
        setFacts(updatedFacts);

        const local = JSON.parse(localStorage.getItem("customFacts") || "{}");
        delete local[keyToDelete];
        localStorage.setItem("customFacts", JSON.stringify(local));
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 6 }}>
            <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
                Мои факты
            </Typography>

            {facts.length === 0 ? (
                <Typography textAlign="center" sx={{ mt: 4 }}>
                    У вас пока нет добавленных фактов.
                </Typography>
            ) : (
                <Stack spacing={3} mt={4}>
                    {facts.map((fact) => (
                        <Card key={fact.key} elevation={3}>
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography fontWeight={600}>
                                        Число: {fact.number} Тип: ({fact.type})
                                    </Typography>
                                    <IconButton
                                        aria-label="Удалить"
                                        onClick={() => deleteFact(fact.key)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>

                                <Divider sx={{ my: 1 }} />

                                <Typography>{fact.text}</Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
            <Box mt={4} display="flex" justifyContent="center">
                <Button onClick={() => navigate(-1)} variant="outlined" size="large">
                    Назад
                </Button>
            </Box>
        </Container>
    );
};
