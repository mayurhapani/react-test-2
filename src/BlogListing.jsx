import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const BlogListing = () => {
  const [blogData, setBlogdata] = useState(null);
  const navigate = useNavigate();

  const LoadEdit = (id) => {
    navigate("/blogEdit/" + id);
  };
  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/Blogs/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/Blogs")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setBlogdata(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2 className="text-center">Blog Cards</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="/blogCreate" className="btn btn-success">
              Add New (+)
            </Link>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {blogData &&
            blogData.map((item, index) => (
              <div key={index} className="col-4">
                <div className="cardOuter">
                  <div className="card">
                    <div className="card-body">
                      <img
                        className="img"
                        src="https://thumbs.dreamstime.com/z/blog-magnifying-glass-focused-word-30560783.jpg?ct=jpeg"
                        alt=""
                      />
                      <h3 className="text-center font-italic mt-4">{item.title}</h3>
                      <h6 className="card-title">
                        <b>Name :</b>
                        {item.name}
                      </h6>
                      <span className="text-center font-italic cardEmail ">
                        <b className="text-dark">Email :</b>
                        {item.email}
                      </span>
                      <p className=" font-italic border p-2 mt-3">
                        <b>Description :</b> {item.description}
                      </p>

                      <div className="d-flex justify-content-around">
                        <button
                          onClick={() => {
                            LoadEdit(item.id);
                          }}
                          className="btn btn-success"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            Removefunction(item.id);
                          }}
                          className="btn btn-danger"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListing;
