import React, { useState } from "react";
import { Alert, Button } from "@material-tailwind/react";

export function ConfirmAlert({ onConfirm, onCancel }) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    // Handle confirm logic here
    setOpen(false);
  };

  const handleCancel = () => {
    // Handle cancel logic here
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Confirm Alert</Button>
      <Alert
        open={open}
        onClose={() => setOpen(false)}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        variant="filled"
        color="blue"
      >
        <div className="text-lg">Are you sure?</div>
        <div className="mt-4 flex justify-end">
            <Button color="red" onClick={onCancel}>
            Cancel
            </Button>
            <Button color="blue" onClick={onConfirm}>
            Confirm
            </Button>
        </div>
      </Alert>
    </>
  );
}
