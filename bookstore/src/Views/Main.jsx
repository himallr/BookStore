import React, { useEffect, useState } from "react";
import Bookcard from "../Component/Books/Bookcard";
import Types from "../Component/Books/Types";
import "./Style.css";
import { getUserById } from "../Services/Apihelpers";
import Skeleton from "../Loading/Skeleton";

const Main = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("UserID");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserById(id)
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <div style={{ marginTop: "10px" }}>
          <Skeleton width="300px" height="50px" marginLeft="40%" />
        </div>
      ) : (
        <h1 className="font-weight-bold text-success text-center mb-5 mt-3">
          Welcome {user && user.Name}!
        </h1>
      )}
      {isLoading ? (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
          }}
        >
          <Skeleton width="500px" height="250px" marginLeft="5%" count={3} />
        </div>
      ) : (
        <Bookcard />
      )}
      <Types />
    </div>
  );
};

export default Main;
