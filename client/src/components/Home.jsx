import immg from '../assets/rs.jpg';

const Home = () => {
  return (
    <>
      <style>
        {`
          html, body {
            height: 100%;
            margin: 0;
            overflow: hidden; /* Prevent scrolling */
          }
        `}
      </style>

      <div className="w-full text-white text-center relative h-[100vh]">
        <img
          className="w-full h-[100vh] object-cover rounded-lg"
          src={immg}
          alt="Banner background"
        />
        <h1 className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl md:text-6xl lg:text-8xl font-bold text-blue text-center w-full px-4">
          Your Home
        </h1>
        {/* <Search css={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-50% md:w-3/4 lg:w-1/2 px-4"}/> */}
      </div>
      <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
      </div>
    </>
  );
};

export default Home;