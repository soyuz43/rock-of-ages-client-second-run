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
    const filteredRocks = location.pathname === '/mine' && currentUser
        ? rocks.filter(rock => {
            console.log("Checking rock:", rock.id, "Owner ID:", rock.user.id, "Current User ID:", currentUser.userId);
            return rock.user.id === currentUser.userId;
        })
        : rocks;

    console.log("Filtered Rocks:", filteredRocks);

    const displayRocks = () => {
        if (rocks && rocks.length) {
            // Use filteredRocks to map over since it will handle both cases
            return filteredRocks.map(rock => (
                <div
                    key={`key-${rock.id}`}
                    className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50"
                >
                    {rock.name} ({rock.type.label}) - Weight: {rock.weight} kg
                    {rock.user && (
                        <span> - Owner: {rock.user.first_name} {rock.user.last_name}</span>
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
