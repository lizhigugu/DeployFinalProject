// mui import

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"

//react import
import { useState } from "react";

const SetUpForm = ({open,setOpen}) => {

    //set state
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    return(
        <Dialog
            open={open}
            onClose={()=>{setOpen(false)}}
        >
            <DialogTitle>
                註冊帳號
            </DialogTitle>
            <DialogContent>
                <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="category_name"
                        label="使用者名稱"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="category_name"
                        label="使用者ID"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={id}
                        onChange={(e)=>{setId(e.target.value)}}
                    />
            </DialogContent>
            <DialogActions>
                <Button>
                    註冊帳號
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default SetUpForm;