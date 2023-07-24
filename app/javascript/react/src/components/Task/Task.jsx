import React, { useEffect, useState } from "react";
import apiClient from "../api";
import axios from "axios";
import TaskTable from "./TaskTable";

const Task = ({ isTaskAdded }) => {
  const [workers, setWorkers] = useState([]);
  const [employee, setEmployee] = useState([]);

  const [gotTags, setGotTags] = useState([]);
  const [tags, setTags] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [date, setDate] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/all_users")
      .then((res) => {
        const emp = res.data.filter((worker) => worker.role != 1);
        setWorkers(emp);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/all_tags")
      .then((res) => {
        setGotTags(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOptionEmployee = (email) => {
    // console.log(email);
    const addedEmp = [...employee, email];
    const setEmp = new Set(addedEmp);
    setEmployee([...setEmp]);
    // console.log(employee);
  };
  const handleOptionTags = (tag) => {
    // console.log(email);
    const addedtag = [...tags, tag];
    const setTag = new Set(addedtag);
    setTags([...setTag]);
    // console.log(employee);
  };

  // console.log("emp", employee);
  // console.log("tags", tags);

  const handleRemoveEmp = (email) => {
    // console.log(email);
    const emp = employee.filter((empl) => empl != email);
    setEmployee([...emp]);
  };
  const handleRemoveTag = (tag) => {
    // console.log(tag);s
    const tagss = tags.filter((t) => t != tag);
    setTags([...tagss]);
  };

  const handleForm = (e) => {
    e.preventDefault();
    const all_data = {
      title: title,
      Desc: desc,
      Emp: employee,
      Tags: tags,
      Date: date,
    };
    const authenticityToken = document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute("content");

    // console.log("auth toekn", authenticityToken);

    axios({
      method: "post",
      url: "http://localhost:3000/create_tasks",
      data: {
        task_data: {
          name: title,
          description: desc,
          tags: tags,
          employees: employee,
          date: date,
        },
      },
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": authenticityToken,
      },
    })
      .then(
        isTaskAdded(1),
        setTitle(""),
        setDesc(""),
        setEmployee([]),
        setTags([]),
        setDate("")
      )
      .catch((err) => console.log("err of post", err));
  };

  return (
    <div className="task">
      <form onSubmit={handleForm} action="" className="task_form">
        <input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          type="text"
          className="title"
          required
          placeholder="TITLE"
        />
        <textarea
          onChange={(e) => setDesc(e.currentTarget.value)}
          type="text"
          value={desc}
          required
          className="description"
          placeholder="Description"
        />

        <div className="date_input">
          <label htmlFor="">DEADLINE </label>
          <input
            type="date"
            value={date}
            required
            onChange={(e) => setDate(e.currentTarget.value)}
            className="date"
          />
        </div>

        <div className="assign_and_date">
          <div className="modal_mid_content">
            <label htmlFor="">ADD TAGS</label>

            <select
              required
              className="assign_to"
              name=""
              id=""
              onChange={(event) => {
                event.target.value != 0 && handleOptionTags(event.target.value);
              }}
            >
              {" "}
              <option value="0"> Select Tags </option>
              {gotTags.map((tag) => (
                <option key={tag.id} value={tag.name}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          <div className="modal_mid_content">
            <label htmlFor="">ASSIGN TO</label>
            <select
              className="assign_to"
              required
              name=""
              id=""
              onChange={(event) => {
                event.target.value != 0 &&
                  handleOptionEmployee(event.target.value);
              }}
            >
              {" "}
              <option value="0" key={0}>
                {" "}
                Select Employee{" "}
              </option>
              {workers.map((worker) => (
                <option key={worker.email} value={worker.email}>
                  {worker.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="add_div">
          {employee.length !== 0 ? (
            <>
              {employee.map((emp) => (
                <small key={emp}>
                  {emp}
                  <button
                    className="rem_btn"
                    onClick={() => handleRemoveEmp(emp)}
                  >
                    x
                  </button>
                </small>
              ))}
            </>
          ) : (
            <div className="nothing_selected">No Employee Is Assigned</div>
          )}
        </div>

        <div className="add_div">
          {tags.length !== 0 ? (
            <>
              {tags.map((tag) => (
                <small key={tag}>
                  {tag}
                  <button
                    className="rem_btn"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    x
                  </button>
                </small>
              ))}
            </>
          ) : (
            <div className="nothing_selected">No Tags</div>
          )}
        </div>

        <button className="add_task_btn">ADD TASK</button>
      </form>
    </div>
  );
};

export default Task;
