import dataImages from "../assets/images";

const { logo, main } = dataImages;

const LandingPage = () => {
  return (
    <div className="md:mx-auto mx-4 select-none flex flex-col items-center md:justify-center justify-between pointer-events-none h-screen">
      <div className="relative">
        <div className="logo">
          <img src={logo} alt="logo" className="w-[200px]" />
        </div>
        <h2 className="text-[40px] font-semibold md:w-auto w-[60%]">
          Find out your English level!
        </h2>
        <img
          className="w-[7890px] md:hidden block absolute top-1/2 right-0"
          src={main}
          alt="main"
        />
      </div>
      <img className="w-[500px] md:block hidden" src={main} alt="main" />
      <button className="bg-[#FF6A00] py-2 text-white font-semibold rounded-3xl sm:max-w-[500px] w-full">
        Start
      </button>
    </div>
  );
};

export default LandingPage;
