import "./App.css";
import { useState, useEffect } from "react";

function App() {
  let [task, setTask] = useState("");
  let [todo, setToDo] = useState([
    {
      work: "Create theme",
      status: false,
    },
    {
      work: "Work on wordpress",
      status: false,
    },
    {
      work: "Organize office main department",
      status: false,
    },
    {
      work: "Error solve in HTML template",
      status: true,
    },
  ]);

  let [complete, setComplete] = useState(todo.filter((e) => e.status === true));

  let [incomplete, setIncomplete] = useState(
    todo.filter((e) => e.status === false)
  );

  let [display, setDisplay] = useState("all");

  let [data, setData] = useState(todo);

  useEffect(() => {
    if (display === "all") {
      setData(todo);
    } else if (display === "active") {
      setData(incomplete);
    } else {
      setData(complete);
    }
  });

  let handleChange = (e) => {
    let update = [...todo];
    let item = e;
    item.status = !e.status;
    update.splice(update.indexOf(e), 1, item);
    setToDo(update);
    setComplete(update.filter((e) => e.status === true));
    setIncomplete(update.filter((e) => e.status === false));
  };

  let add = (e) => {
    e.preventDefault();
    if (task) {
      let newArr = [...todo];
      newArr.push({
        work: task,
        status: false,
      });
      setTask("");
      setToDo(newArr);
      setIncomplete(newArr.filter((e) => e.status === false));
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="display-5">Organize your tasks</h1>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div className="card card-white">
              <div className="card-body">
                <form className="input-group">
                  <input
                    type="text"
                    className="form-control add-task"
                    placeholder="New Task..."
                    onChange={(e) => setTask(e.target.value)}
                  />
                  <button className="btn btn-success" onClick={(e) => add(e)}>
                    Create
                  </button>
                </form>

                <button
                  className="btn btn-light rounded-pill"
                  onClick={() => {
                    setData(todo);
                    setDisplay("all");
                  }}
                >
                  All
                </button>

                <button
                  className="btn btn-light rounded-pill"
                  onClick={() => {
                    setData(incomplete);
                    setDisplay("active");
                  }}
                >
                  Active
                </button>

                <button
                  className="btn btn-light rounded-pill"
                  onClick={() => {
                    setData(complete);
                    setDisplay("completed");
                  }}
                >
                  Completed
                </button>

                <div className="todo-list">
                  {data.map((each, i) => {
                    return (
                      <div className="todo-item" key={i}>
                        <div className="checker">
                          <span>
                            <input
                              type="checkbox"
                              checked={each.status}
                              onChange={() => handleChange(each)}
                            />
                          </span>
                        </div>
                        {each.status ? (
                          <span>
                            <s>{each.work}</s>
                          </span>
                        ) : (
                          <span>{each.work}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
