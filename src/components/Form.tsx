import {
    Container,
    Typography,
    TextField,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Button,
    Alert,
    Box,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useForm, Controller } from "react-hook-form";
import { useLazyGetFactQuery } from "../api/NumbersApi";
import { useDispatch } from "react-redux";
import { setFact } from "../app/store/factSlice";
import { useNavigate } from "react-router-dom";
import type { FormValues } from "../types/types";

const types = ["trivia", "math", "date" , "year"];

export const NumberForm = () => {
    const {
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            type: "trivia",
            number: "",
            isRandom: false,
        },
    });

    const isRandom = watch("isRandom");

    const navigate = useNavigate()

    const [fetchFact, { error, isFetching }] = useLazyGetFactQuery();

    const dispatch = useDispatch();

    const onSubmit = async (formData: FormValues) => {
        const path = formData.isRandom
            ? `random/${formData.type}`
            : `${formData.number}/${formData.type}`;

        const result = await fetchFact(path).unwrap();

        dispatch(setFact(result));
        reset();
        navigate("/result");
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
                Факты о числах
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
            >
                <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                        <TextField select label="Тип информации" {...field}>
                            {types.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                />

                {!isRandom && (
                    <Controller
                        name="number"
                        control={control}
                        rules={{
                            required: "Введите число",
                            pattern: {
                                value: /^\d+$/,
                                message: "Число должно быть в виде цифры",
                            },
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Введите число"
                                error={!!errors.number}
                                helperText={errors.number?.message}
                            />
                        )}
                    />
                )}

                <Controller
                    name="isRandom"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel
                            control={<Checkbox {...field} checked={field.value} />}
                            label="Использовать случайное число"
                        />
                    )}
                />

                <Button type="submit" variant="contained" disabled={isFetching}>
                    {isFetching ? "Загрузка..." : "Показать факт"}
                </Button>

                <Button
                    onClick={() => navigate("/my-facts")}
                    variant="outlined"
                    startIcon={<ListAltIcon />}
                >
                    Мои факты
                </Button>

                {error && <Alert severity="error">Ошибка загрузки xD</Alert>}
            </Box>
        </Container>
    );
};
