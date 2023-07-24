import React from "react";

const TaskTableAdmin = ({ tasks }) => {
  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th className="th_title" style={{ cursor: "pointer" }}>
              Title
            </th>
            <th className="assign">Status</th>
            <th className="">
              <div className="column_desc">Description</div>
            </th>
            <th className="assign">Assigned-To</th>
            <th className="assign">Tags</th>
            <th className="update_column">Update</th>
            <th className="">Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task,s_no) => 
            <tr>
              <td>{s_no + 1}</td>
              <td>{task.name}</td>
              <td style={{color: task.status == 'pending' ? 'red' : 'green'}}  >{task.status}</td>
              <td >{task.description}</td> 
              <td>{task.users.map(user => <span>{user.email} <br /></span>)}</td> 
              <td>{task.tags.map(tag => <span>{tag.name } <br /></span>)}</td> 
              <td>update</td>
              <td>delete</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTableAdmin;
