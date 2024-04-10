import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {
  const { empid } = useParams();

  //const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/Blogs/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        namechange(resp.name);
        emailchange(resp.email);
        titlechange(resp.title);
        descriptionchange(resp.description);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [name, namechange] = useState("");
  const [email, emailchange] = useState("");
  const [title, titlechange] = useState("");
  const [description, descriptionchange] = useState("");
  const [validation, valchange] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = { name, email, title, description };

    fetch("http://localhost:8000/Blogs/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmit}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h2 className="text-center">Blog Edit</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        required
                        value={name}
                        onMouseDown={(e) => valchange(true)}
                        onChange={(e) => namechange(e.target.value)}
                        className="form-control"
                      ></input>
                      {name.length == 0 && validation && <span className="text-danger">Enter the name</span>}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Email</label>
                      <input value={email} onChange={(e) => emailchange(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Title</label>
                      <input value={title} onChange={(e) => titlechange(e.target.value)} className="form-control"></input>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Description</label>
                      <textarea value={description} onChange={(e) => descriptionchange(e.target.value)} className="form-control"></textarea>
                    </div>
                  </div>

                  <div className="col-lg-12 mt-3">
                    <div className="form-group">
                      <button className="btn btn-success me-5" type="submit">
                        Save
                      </button>
                      <Link to="/" className="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;
