"use client";
import TripCard from "@components/molecules/TripCard";
import UserCard from "@components/organisms/UserCard";
import { type IRootState, useAppSelector } from "@core/store";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";
import useHome from "./hooks/useHome";

const HomeView = () => {
  const user = useAppSelector((state: IRootState) => state.user.user);
  const { rankedDrivers, historyTripList, userType } = useHome();

  return (
    <div className="flex flex-col justify-center max-w-5xl mx-auto w-10/12 lg:w-auto">
      {/* TOP */}
      <div className="flex flex-col lg:flex-row justify-between mt-20">
        <div className="flex gap-4 items-center">
          <FaRegUserCircle size={120} className="hidden lg:block" />
          <FaRegUserCircle size={100} className="lg:hidden" />
          <p className="text-2xl lg:text-4xl font-bold">
            Hola, <br className="hidden lg:block" /> {user?.name}
          </p>
        </div>
        <Link
          href="/contracts"
          className="mt-5 lg:mt-0 lg:self-end text-xl text-[#0F15A3] font-semibold underline"
        >
          Ver Historial
        </Link>
      </div>
      {/* CENTER */}
      <div className="flex flex-col lg:flex-row justify-between mt-10 mb-20 gap-10 lg:gap-0">
        {/* Popular */}
        <div className="flex flex-col gap-10">
          <p className="text-3xl font-semibold border-l-2 pl-4">Popular</p>
          {rankedDrivers ? (
            rankedDrivers?.map((driver) => (
              <UserCard key={driver.id} user={driver} />
            ))
          ) : (
            <p>No hay conductores populares</p>
          )}
        </div>
        {/* Recent */}
        <div className="flex flex-col gap-10">
          <p className="text-3xl font-semibold border-l-2 pl-4">Recientes</p>
          {historyTripList ? (
            historyTripList?.map((trip) => (
              <TripCard key={trip.id} trip={trip} userType={userType} />
            ))
          ) : (
            <p>No hay contratos recientes</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
