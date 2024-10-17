import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import axios from 'axios';

export default function VerifyEmailPopup({ open, setOpen, email }) {
    const handleClose = () => {
        setOpen(false);
    };
    const resendEmail = () => {
        try {
            axios.post(`${process.env.REACT_APP_BACKEND_PORT}/auth/email`, {email: email}, {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => {
                alert("Email sent")
            })
        } catch (error) {
            console.error("Error sending email");
        }
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='rounded-lg shadow-xl'
            >
                <DialogContent>
                    <div className="flex flex-col items-center px-7 pt-5 pb-4 text-center bg-white max-w-[355px]">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ef5d04205aedba434e83ebdc4f230805a5cd1a86f3aad9cc39d1311d68301a81?apiKey=cf358c329e0d49a792d02d32277323ef&"
                            className="w-12 aspect-square"
                            alt=""
                        />
                        <div className="flex flex-col justify-center self-stretch p-2.5 mt-2.5 text-base leading-5 text-black">
                            <div className="flex flex-col">
                                <div className="text-lg font-medium text-zinc-800">
                                    Verify your email address
                                </div>
                                <div className="mt-2 leading-5">
                                    We have sent a verification link to{" "}
                                    <span className="text-black font-semibold">{email}</span>
                                </div>
                                <div className="mt-2 leading-5">
                                    Click on the link to complete the verification process.You may need
                                    to <span className="text-black font-semibold">check your spam folder</span>
                                </div>
                                <div className="mt-2 text-zinc-600">Still can’t find the email?</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center mt-2.5 max-w-full text-base font-medium tracking-normal leading-6 text-white w-[152px]">
                            <button onClick={()=>{resendEmail("apshaiderbukhari786@gmail.com")}} className="justify-center px-6 py-3 bg-indigo-400 rounded-md border border-gray-300 border-solid">
                                Resend Email
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}