import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";

export const UserInterface = () => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [data, setData] = useState([]);
  const [val, setVal] = useState();
  const [id, setId] = useState();
  const [page, setPage] = useState(1);
  const [len,setLen]=useState();

  const fetch_get = async () => {
    setLoading(true);
    try {
      let res = await fetch(`http://localhost:3000/todos?_page=${page}&_limit=2`).then((e) =>
        e.json()
      );
console.log(res)
      setData([...res]);
      setLoading(false);
    } catch (error) {
      setErr(true);
      setLoading(false);
    }
  };
  console.log(data)

  useEffect(() => {
    fetch_get();
  }, [page]);

  const HandleEdit = (id) => {
    setId(id);
    let modal = document.querySelector(".modal");
    modal.style.display = "block";
    modal.style.position = "sticky";
    let updatedValue = document.querySelector(".editmodal");
    setVal(updatedValue.value);
  };

  const HandleDelete = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Resource deleted successfully");
          fetch_get();
        } else {
          throw new Error("Failed to delete resource");
        }
      })
      .catch((error) => {
        console.error("Error deleting resource:", error);
      });
  };
  const handleModal = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/todos/id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(val),
    })
      .then((response) => response.json()) // Parse the response JSON
      .then((data) => {
        // Handle the response data here
        console.log("Update successful:", data);
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error updating:", error);
      });
    let modal = document.querySelector(".modal");
    modal.style.display = "none";
  };

  return (
    <div>
      <div
        style={{
          border: "1px solid green",
          width: "500px",
          height: "300px",
          margin: "auto",
          position: "static",
          display: "none",
        }}
        className="modal"
      >
        <input className="editmodal" />
        <button className="btn" onClick={handleModal}>
          Submit
        </button>
      </div>
      {loading ? (
        <h1>Loading...</h1>
      ) : err ? (
        <h1>Something went wrong</h1>
      ) : (
        data.map((el) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "50px",
            }}
            key={el.id}
          >
            <div
              style={{
                border: "1px solid yellow",
                backgroundColor: "orange",
                width: "100px",
              }}
            >
              {el.todo}
            </div>
            <button
              onClick={() => HandleEdit(el.id)}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Edit
            </button>
            <button
              onClick={() => HandleDelete(el.id)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
      <Pagination setPage={setPage} data={data} page={page} />
    </div>
  );
};
