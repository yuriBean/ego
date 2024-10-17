import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from 'react-router-dom';
import blockedIcon from '../assets/blocked.png'

export default function ReviewModel({ reviewModel2, setReviewModel2, url, followOrReview }) {
    const Navigate = useNavigate()

    return (
        <React.Fragment>
            <Dialog
                open={reviewModel2}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='rounded-lg shadow-xl'
            >
                <DialogContent>
                    <div className="flex flex-col items-center px-7 pt-5 pb-4 text-center bg-white max-w-[355px]">
                        <img
                            loading="lazy"
                            src={blockedIcon}
                            className="w-12 aspect-square"
                            alt=""
                        />
                        <div className="flex flex-col justify-center self-stretch p-2.5 mt-2.5 text-base leading-5 text-black">
                            <div className="flex flex-col">
                                <div className="text-lg font-medium text-zinc-800">
                                    {followOrReview === 'instagram' ? (
                                        <p>Suivez la page Instagram, vous pourrez alors faire tourner la roue</p>
                                    ): (
                                        <p>Déposez l'avis sur Google, vous pourrez alors faire tourner la roue</p>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center mt-2.5 max-w-full text-base font-medium tracking-normal leading-6 text-white w-[252px]">
                            <button onClick={() => {
                                window.open(url, '_blank');
                                setReviewModel2(false)
                            }} className="justify-center px-6 py-3 bg-indigo-400 rounded-md border border-gray-300 border-solid">
                                <label className="cursor-pointer" >{`${followOrReview === 'instagram' ? 'Follow' : 'Review'}`}</label>
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}