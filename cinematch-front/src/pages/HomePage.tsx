import LoginDialog from "@/components/LoginDialog";
import UserTokenContext from "@/contexts/authContext";
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    Step,
    StepButton,
    Stepper,
    Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [completed] = useState<{ [k: number]: boolean }>({});
    const [openDialog, setOpenDialog] = useState(false);
    const { userToken, setUserToken } = useContext(UserTokenContext);

    const steps = [
        "Navegue entre os conteúdos mais populares",
        "Adicione conteúdos que você gostou em sua lista de favoritos",
        "Recomendaremos conteúdos de acordo com o seu gosto!",
    ];

    function handleClickButton() {
        if (!userToken) {
            setOpenDialog(true);
        } else {
            navigate("/recomendacoes");
        }
    }

    function handleStep(step: number) {
        setActiveStep(step);
    }

    return (
        <Box
            sx={{
                alignItems: "center",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Typography variant="h3" sx={{ color: "#fff" }}>
                Cansou de perder tempo pensando no que assistir?
            </Typography>
            <Typography variant="h3" sx={{ color: "#fff" }}>
                Deixa com a gente!
            </Typography>

            <Typography></Typography>
            <Stack direction="row" spacing={2} margin={"50px"}>
                <Card>
                    <CardContent>
                        <Stepper
                            activeStep={activeStep}
                            nonLinear
                            sx={{ color: "orange" }}
                        >
                            {steps.map((label, index) => (
                                <Step key={label} completed={completed[index]}>
                                    <StepButton
                                        onClick={() => handleStep(index)}
                                        color="#000"
                                    >
                                        <Typography>{label}</Typography>
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                    </CardContent>
                </Card>
            </Stack>

            <Typography variant="h5" sx={{ color: "#fff" }}>
                Clique no botão abaixo e veja recomendações personalizadas com
                base no seu conteúdo favoritado
            </Typography>
            <Box
                sx={{
                    mx: "auto",
                    display: "flex",
                    width: "30%",
                    justifyContent: "center",
                    padding: "10px",
                }}
            >
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleClickButton}
                    size="large"
                    sx={{
                        backgroundColor: "#FB8500",
                        ":hover": {
                            backgroundColor: "#FB8500",
                            transform: "scale(1.2)",
                        },
                    }}
                >
                    O que assistir?
                </Button>
            </Box>
            <LoginDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                setAuth={setUserToken}
            />
        </Box>
    );
}
