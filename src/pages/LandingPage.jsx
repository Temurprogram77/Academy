import dataImages from "../assets/images";

const { logo, main } = dataImages;

const LandingPage = () => {
  return (
    <div>
      <div className="logo max-w-[1000px] mx-auto">
        <img src={logo} alt="logo" />
      </div>
      <h2>Find out your English level!</h2>
      <img src={main} alt="main" />
      <button className="bg-[#FF6A00] sm:px-[80px] sm:py-2 text-white font-semibold rounded-3xl sm:w-fit w-full">Start</button>
    </div>
  )
}

export default LandingPage