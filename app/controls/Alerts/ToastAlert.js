import React from 'react';
import { ToastBar, Toaster } from 'react-hot-toast';

export default function ToastAlert() {
    return (
        <Toaster
            position="top-center"
            gutter={8}
            toastOptions={{
                duration: 3000,
                success: {
                    style: {
                        background: '#52d852',
                        color: '#fff',
                        border: '1px solid black',
                        opacity: .95
                    }
                },
            }}
        >
            {(t) => (
                <ToastBar
                    toast={t}
                    style={{
                        ...t.style,
                        animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
                    }}
                />
            )}
        </Toaster>
    );
}