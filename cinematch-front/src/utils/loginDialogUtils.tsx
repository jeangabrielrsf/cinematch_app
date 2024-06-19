export interface LoginDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    setAuth: (token: string) => void;
    setAnchorEl?: (el: HTMLElement | null) => void;
}
