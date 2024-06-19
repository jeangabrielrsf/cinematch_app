import { login } from "@/services/auth";
import { UserLoginData } from "@/utils/formUtils";
import { LoginDialogProps } from "@/utils/loginDialogUtils";
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

export default function LoginDialog({
    openDialog,
    setOpenDialog,
    setAuth,
    setAnchorEl = () => {},
}: LoginDialogProps) {
    const [loading, setLoading] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackStatus, setSnackStatus] = useState("");

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

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        handleOpenLoading();
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson: FormJsonData = Object.fromEntries(
            formData.entries()
        ) as unknown as FormJsonData;
        const data: UserLoginData = {
            username: formJson.email,
            password: formJson.password,
        };
        try {
            const response = await login(data);
            setAuth(response.access_token);
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
                        handleSubmit(event);
                    },
                }}
            >
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, entra com as informações abaixo para entrar.
                    </DialogContentText>
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
                    <Button type="submit">Entrar</Button>
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
                        Login efetuado com sucesso!
                    </Alert>
                ) : (
                    <Alert
                        severity="error"
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        Erro ao logar!
                    </Alert>
                )}
            </Snackbar>
        </>
    );
}
