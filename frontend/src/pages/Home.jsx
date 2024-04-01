import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section>
      <div className="section-container">
        {currentUser && (
          <h1 className="text-3xl md:text-4xl font-bold my-4">
            Hello{" "}
            <span className="text-main capitalize">{currentUser.username}</span>
          </h1>
        )}
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Home Page</h2>
        <p className="mb-4 text-slate-300 my-3">
          This is a MERN (MongoDB, Express, React, Node.js) stack application
          with authentication. It allows users to sign up, log in, and log out,
          and provides access to protected routes only for authenticated users.
        </p>
        <p className="mb-4 text-slate-300 my-3">
          The front-end of the application is built with React and uses React
          Router for client-side routing. The back-end is built with Node.js and
          Express, and uses MongoDB as the database. Authentication is
          implemented using JSON Web Tokens (JWT).
        </p>
        <p className="mb-4 text-slate-300 my-3">
          This application is intended as a starting point for building
          full-stack web applications with authentication using the MERN stack.
          Feel free to use it as a template for your own projects!
        </p>
      </div>
    </section>
  );
};

export default Home;
