import React from "react";
import { Alert, Button } from "@material-tailwind/react";

export function LoadingAlert({ open, text }) {
  return (
    <div className={open ? "fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50" : "d-none"}>
      <Alert
        open={open}
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        className="w-max"
      >
        <div className="text-lg">{text}</div>
        <div className="mt-4 flex justify-end">
          <Button color="gray" disabled>
            Loading...
          </Button>
        </div>
      </Alert>
    </div>
  );
}
