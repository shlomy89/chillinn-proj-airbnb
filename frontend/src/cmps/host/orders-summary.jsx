import { HostPieDetails } from "./host-pie-details";
import { useSelector } from "react-redux";
import { Summary } from "./summary";

export const OrdersSummary = () => {
  const orders = useSelector((state) => state.orderModule.orders);

  return (
    <Summary
      header={"Orders Summary"}
      secondaryHeader={`Total Orders: ${orders.length}`}
      Chart={() => <HostPieDetails />}
    />
  );
};
