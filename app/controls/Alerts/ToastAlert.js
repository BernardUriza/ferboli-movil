import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function ToastAlert() {
    return (
        <Toaster
        position="top-center"
        gutter={8}
            toastOptions={{
                duration: 3000,
                style: {
                    background: '#52d852',
                    color: '#fff'
                },
            }}
        >           
        </Toaster>
    );
}