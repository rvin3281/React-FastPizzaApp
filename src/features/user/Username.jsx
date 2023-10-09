import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.username);

  // If no username then no need to render this component
  if (!username) return null;

  return <div className="text-sm font-semibold">{username}</div>;
}

export default Username;
