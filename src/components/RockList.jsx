//RockList.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const RockList = ({ rocks, fetchRocks, currentUser }) => {
  const location = useLocation();
  useEffect(() => {
    fetchRocks();
    console.log("Rocks Set");
  }, []);

  // Check if currentUser exists before filtering rocks
  const filteredRocks =
    location.pathname === "/mine" && currentUser
      ? rocks.filter((rock) => {
          console.log(
            "Checking rock:",
            rock.id,
            "Owner ID:",
            rock.user.id,
            "Current User ID:",
            currentUser.userId
          );
          return rock.user.id === currentUser.userId;
        })
      : rocks;

  console.log("Filtered Rocks:", filteredRocks);
  const handleDeleteRock = async (rockId) => {
    const response = await fetch(`http://localhost:8000/rocks/${rockId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${
          JSON.parse(localStorage.getItem("rock_token")).token
        }`,
      },
    });
    if (response.ok) {
      // Remove the rock from the state
      fetchRocks(); // Refresh the list of rocks after deletion
      alert("Rock deleted successfully!");
    } else {
      alert("Failed to delete the rock.");
    }
  };

  const displayRocks = () => {
    if (rocks && rocks.length) {
      // Use filteredRocks to map over since it will handle both cases
      return filteredRocks.map((rock) => (
        <div
          key={`key-${rock.id}`}
          className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50"
        >
          {rock.name} ({rock.type.label}) - Weight: {rock.weight} kg
          {rock.user && (
            <span>
              {" "}
              - Owner: {rock.user.first_name} {rock.user.last_name}
            </span>
          )}
          {currentUser && rock.user.id === currentUser.userId && (
            <button
              onClick={() => handleDeleteRock(rock.id)}
              className="ml-4 py-1 px-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded"
            >
              Delete
            </button>
          )}
        </div>
      ));
    }

    return <h3>Loading Rocks...</h3>;
  };

  return (
    <>
      <h1 className="text-3xl">Rock List</h1>
      {displayRocks()}
    </>
  );
};
