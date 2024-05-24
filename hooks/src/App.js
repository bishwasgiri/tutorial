import Form from "./Components/Form";
import { useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <header className="bg-blue-300 text-3xl p-3 text-white flex items-center justify-between">
        <span className="text-2xl">Heading</span>
        {isLoggedIn && (
          <span className="text-2xl cursor-pointer" onClick={handleLogout}>
            Logout
          </span>
        )}
      </header>
      {/* <Form  /> */}
      {!isLoggedIn ? (
        <Form onLoggedIn={handleLogin} />
      ) : (
        <div className="text-3xl mt-20  mx-auto w-3/5 flex flex-col items-center shadow-lg">
          Welcome Back
        </div>
      )}
    </div>
  );
}

export default App;
