import Navbar from "../../shared/Navbar/Navbar";
import HomeWidget from "../../widgets/HomeWidget";

const Home = () => {
  return (
    <section className="bg-home">
      <Navbar pageNum={0} />
      <main className="mt-20 flex flex-col gap-[30px] md:gap-[40px] items-center mx-auto md:w-[600px] md:mt-[10px]">
        <div className="w-full md:max-w-[540px] flex flex-col items-center text-center">
          <div className="title">
            <h1 className="text-[25px] sm:text-[44px] text-primary">
              Il tuo cibo preferito
            </h1>
            <h1 className="text-[25px] -mt-2 sm:text-[44px] leading-[53px]">
              consegnato in un attimo.
            </h1>
          </div>
          <p className="text-[13px] max-w-[280px] sm:text-[15px]
          font-medium mt-2 md:mt-[17px] sm:max-w-[430px] leading-6">
            Con
            <span className="text-primary"> TastyWay</span>, puoi esplorare i
            migliori ristoranti della tua città e ricevere i tuoi piatti
            preferiti direttamente a casa tua, sempre freschi e deliziosi.
          </p>
        </div>
        <HomeWidget />
      </main>
    </section>
  );
};
export default Home;
