import { register } from "@/services/auth";
import { UserRegisterData } from "@/utils/formUtils";
import { SignupDialogProps } from "@/utils/registerDialogUtils";
import { FormJsonData } from "@/utils/types";
import {
    Alert,
    Backdrop,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";

export default function SignupDialog({
    openDialog,
    setOpenDialog,
    setAnchorEl,
}: SignupDialogProps) {
    const [loading, setLoading] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackStatus, setSnackStatus] = useState<string>("");

    function handleCloseDialog() {
        setOpenDialog(false);
    }

    function handleOpenLoading() {
        setLoading(true);
    }

    function handleCloseLoading() {
        setLoading(false);
    }

    function handleSnackBarOpen(status: string) {
        setSnackStatus(status);
        setOpenSnack(true);
    }

    function handleSnackBarClose() {
        setOpenSnack(false);
    }

    async function handleRegisterSubmit(event: FormEvent<HTMLFormElement>) {
        handleOpenLoading();
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const formJson: FormJsonData = Object.fromEntries(
            formData.entries()
        ) as unknown as FormJsonData;
        const data: UserRegisterData = {
            username: formJson.username,
            email: formJson.email,
            password: formJson.password,
        };
        try {
            await register(data);
            handleSnackBarOpen("success");
        } catch (error) {
            console.error(error);
            handleSnackBarOpen("error");
        }
        handleCloseLoading();
        handleCloseDialog();
        setAnchorEl(null);
    }

    return (
        <>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                PaperProps={{
                    component: "form",
                    onSubmit: (event: FormEvent<HTMLFormElement>) => {
                        handleRegisterSubmit(event);
                    },
                }}
            >
                <DialogTitle>Cadastra-se</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, entre com as informações abaixo para se
                        cadastrar.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        id="username"
                        name="username"
                        label="Nome de usuário"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        id="password"
                        name="password"
                        label="Senha"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button type="submit">Cadastrar</Button>
                </DialogActions>
            </Dialog>
            <Backdrop open={loading}>
                <CircularProgress />
            </Backdrop>
            <Snackbar
                open={openSnack}
                autoHideDuration={5000}
                onClose={handleSnackBarClose}
            >
                {snackStatus === "success" ? (
                    <Alert
                        severity="success"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        Cadastro efetuado com sucesso!
                    </Alert>
                ) : (
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        Erro ao cadastrar!
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}
