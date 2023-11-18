import React from "react";
import { ClockIcon, UploadIcon, BanIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { BadgeBase } from "./BadgeBase";

const StatusBadge = ({ status }) => {
  let badgeColor = "green"; // Default color
  let badgeIcon = CheckCircleIcon; // Default icon

  switch (status) {
    case "Pendiente":
      badgeColor = "yellow";
      badgeIcon = ClockIcon;
      break;
    case "Enviando":
      badgeColor = "blue";
      badgeIcon = UploadIcon;
      break;
    case "No entregado":
      badgeColor = "red";
      badgeIcon = BanIcon;
      break;
    case "Activo":
      badgeColor = "green";
      badgeIcon = CheckCircleIcon;
      break;
    default:
      badgeColor = "gray";
  }

  return (
    <BadgeBase
      className="badge-base-instance"
      icon="dot"  // You might want to use the computed badgeIcon here
      text={status}
      textClassName="design-component-instance-node"
    />
  );
};

export default StatusBadge;
