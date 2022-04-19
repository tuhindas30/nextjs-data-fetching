import Loading from "../../public/Loading.svg";

const Loader = () => {
  return (
    <>
      <style jsx>
        {`
          .loader {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(5px);
          }
        `}
      </style>
      <div className="loader">
        <Loading />
      </div>
    </>
  );
};

export default Loader;
