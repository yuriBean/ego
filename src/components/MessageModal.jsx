import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

export default function BlockPopup({ open, setOpen, message, ButtonText, link }) {
    const Navigate = useNavigate()
    const handleClose = () => {
        setOpen(false);
    };


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
                        <InfoIcon style={{ fontSize: 48, color: '#3f51b5' }} />

                        <div className="flex flex-col justify-center self-stretch p-2.5 mt-2.5 text-base leading-5 text-black">
                            <div className="flex flex-col">
                                <div className="text-lg font-medium text-zinc-800">
                                    {message}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center mt-2.5 max-w-full text-base font-medium tracking-normal leading-6 text-white w-[252px]">
                            <button onClick={() => { Navigate(`${link}`); setOpen(false)}} className="justify-center px-6 py-3 bg-indigo-400 rounded-md border border-gray-300 border-solid">
                                {ButtonText}
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}