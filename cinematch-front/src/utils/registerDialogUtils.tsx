export interface SignupDialogProps {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    setAnchorEl: (el: HTMLElement | null) => void;
}
