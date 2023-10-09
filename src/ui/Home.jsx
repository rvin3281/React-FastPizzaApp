import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";

function Home() {
  // 1. Read state from Redux -> 1. Need to use useSelector() hook
  // 2. Get access to the entire state
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-10 text-center">
      <h1 className="mb-8 text-xl font-semibold">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {/* Conditionally render based on the state that we read from the redux */}
      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue Ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
