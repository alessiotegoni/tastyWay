import Navbar from "@/components/shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="hero">
      <Navbar pageNum={0} />
      <main className="home">
        <div className="container">
          <div className="w-full text-center mb-10">
            <div className="title">
              <h1 className="text-[25px] sm:text-[44px] text-primary">
                Il tuo cibo preferito
              </h1>
              <h1 className="text-[25px] -mt-2 sm:text-[44px] leading-[53px]">
                consegnato in un attimo.
              </h1>
            </div>
            <p
              className="text-[13px] max-w-[280px] sm:text-[15px] w-full mx-auto
              font-medium mt-2 md:mt-[17px] sm:max-w-[430px] leading-6"
            >
              Con
              <span className="text-primary"> TastyWay</span>, puoi esplorare i
              migliori ristoranti della tua città e ricevere i tuoi piatti
              preferiti direttamente a casa tua, sempre freschi e deliziosi.
            </p>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default HomeLayout;
