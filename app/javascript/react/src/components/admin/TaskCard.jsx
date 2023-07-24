import React from "react";
import axios from "axios";
const TaskCard = ({ tasks, isDeleted }) => {
  const data = localStorage.getItem("accessToken");
  const user = JSON.parse(data);
  const role = user.role;
  console.log(tasks);

  const handleDelete = (task_id) => {
    console.log(task_id);

    const authenticityToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    axios({
      method: "delete",
      url: `/delete_task/${task_id}`,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": authenticityToken,
      },
    });

    isDeleted(task_id);
  };

  const handleStatus = (id,status) => {
    // console.log(id);

    const authenticityToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");
    axios({
      method: "put",
      url: `/task_status/${id}`,
      data:{
        status:status
      },
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": authenticityToken,
      },
    }
    )
    isDeleted(id);
  }

  return (
    <div className="card_box">
      {tasks.map((task, s_no) => (
        <div key={task.id} className="card">
          <div className="card_title">
            <h2>{task.name}</h2>
          </div>

          <div className="card_desc">
            <strong>Description</strong>
            <p className="card_desc_p">{task.description}</p>
          </div>

          <div className="card_deadline">
            <strong>Deadline</strong>{" "}
            <span className="span">{task.deadline.substring(0, 10)}</span>
          </div>

          <div className="card_status">
            <strong>Status</strong>{" "}
            <span className="span">
              <button
              onClick={() => handleStatus(task.id,task.status)}
                style={{ color: task.status == "pending" ? "red" : "green" }}
                className="status_btn"
              >
                {task.status}
              </button>
            </span>
          </div>

          <div className="card_tags">
            <strong className="card_tag">Assigned</strong>
            <div className="child">
              {task.users.length !== 0 ? (
                task.users.map((user) => (
                  <span className="child_span">
                    {user.email} <br />
                  </span>
                ))
              ) : (
                <span className="child_span">
                  No Employee Is Assigned
                  <br />
                </span>
              )}
            </div>
          </div>

          <div className="card_tags">
            <strong className="card_tag">Tags</strong>
            <div className="child">
              {task.tags.length !== 0 ? (
                task.tags.map((tag) => (
                  <span className="child_span" key={tag.id}>
                    {tag.name}
                    <br />
                  </span>
                ))
              ) : (
                <span className="child_span">
                  No Tags Assigned
                  <br />
                </span>
              )}
            </div>
          </div>

          {role == 1 && (
            <div className="buttons">
              {/* <button className="action-btns" id="update">
                UPDATE
              </button> */}
              <button
                onClick={() => handleDelete(task.id)}
                className="action-btns"
                style={{width:'100%'}}
              >
                DELETE
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
