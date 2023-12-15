import React, { useState } from "react";
import { Alert, Button } from "@material-tailwind/react";

export function ConfirmAlert({ open, onConfirm, onCancel }) {
  return (
    <div className={open?"fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50":"d-none"}>
      <Alert
        open={open}
        onClose={onCancel}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        variant="filled"
        color="blue"
        className=""
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
    </div>
  );
}
