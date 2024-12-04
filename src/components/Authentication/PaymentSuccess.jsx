import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionID = searchParams.get('sessionId');
    const Navigate = useNavigate();

    useEffect(() => {
      if (sessionID) {
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_PORT}/checkout/success?sessionId=${sessionID}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            Navigate("/login");
          })
          .catch((err) => {
            console.log(err);
            Navigate("/login");
          });
      }
    }, [Navigate, sessionID]);
    return (
      <div className="flex items-center justify-center h-60vg">
        <p className="text-xl text-blue-500 text-semibold">Loading...</p>
      </div>
    );
}

export default PaymentSuccess