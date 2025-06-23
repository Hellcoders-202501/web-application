"use client";
import DriverProfileView from "@views/App/DriverProfile";
import { useParams } from "next/navigation";

const DriverPage = () => {
  const params = useParams();
  const userId = params.id ? Number(params.id) : undefined;

  return <DriverProfileView userId={userId as number} />;
};

export default DriverPage;
