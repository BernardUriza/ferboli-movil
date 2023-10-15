import { Badge } from "@tremor/react";
import { StatusOnlineIcon, ClockIcon, CogIcon, MinusCircleIcon, ShoppingCartIcon } from "@heroicons/react/outline";

const StatusBadge = ({ status }) => {
  let badgeColor = "green"; // Default color
  let badgeIcon = StatusOnlineIcon; // Default icon

  switch (status) {
    case "Pendiente":
      badgeColor = "yellow";
      badgeIcon = ClockIcon;
      break;
    case "Enviando":
      badgeColor = "blue";
      badgeIcon = CogIcon;
      break;
    case "No entregado":
      badgeColor = "red";
      badgeIcon = MinusCircleIcon;
      break;
    case "Activo":
      badgeColor = "green";
      badgeIcon = ShoppingCartIcon;
      break;
    default:
      badgeColor = "gray";
  }

  return (
    <Badge color={badgeColor} size="sm" icon={badgeIcon}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
