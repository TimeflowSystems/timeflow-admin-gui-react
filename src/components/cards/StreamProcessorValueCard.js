import React, { useState } from "react";
import ReplicaInfo from "../managestream/ReplicaInfo";
import { notification } from "antd";
import api from "../../api";
import DragIcon from "../../assets/drag-icon.svg";

const StreamProcessorStatus = {
  notDeployed: "not_deployed",
  running: "running",
  stopped: "stopped",
};

const StreamProcessorValueCard = ({ post: item, isDragging }) => {
  const [state, setState] = useState(item.state);

  const handleAction = (action) => {
    return api.post(`streamprocessor_action/${action}`, {
      project_id: item.project?.id || item.project,
      streamprocessor_id: item.id,
    });
  };
  const handleRun = () => {
    handleAction("run")
      .then((response) => {
        setState(StreamProcessorStatus.running);
      })
      .catch(() => {
        notification.error({
          message: "Stream Processor deployment failed.",
        });
      });
  };

  const handleStop = () => {
    handleAction("stop")
      .then((response) => {
        setState(StreamProcessorStatus.stopped);
        notification.success({
          message: "Stream Processor stopped",
        });
      })
      .catch(() => {
        notification.error({
          message: "Stream Processor stop failed.",
        });
      });
  };

  return (
    <div className="Valuecard">
      <h2 className="valueHeader handle">{item.name}</h2>
      <div className="cardBody">
        {isDragging && (
          <div className="stream__dragging">
            <img src={DragIcon} alt="" />
          </div>
        )}
        <ReplicaInfo
          eventId={item.id}
          projectId={item.project?.id || item.project}
          userId={item.owning_user?.id || item.owning_user}
          requestedReplicas={item.replicas}
          eventType={"streamprocessor"}
          state={state}
        />
      </div>
      <div className="cardFooter">
        <a
          href={`/react/projects/${
            item.project?.id || item.project
          }/streamprocessors/${item.id}/edit/`}
          className="edit"
        >
          {/*EDIT - Needs to go to - /projects/2/streamprocessors/3/edit/ -->*/}
          <span className="helper">Edit</span>
        </a>
        <a
          href={`/projects/${
            item.project?.id || item.project
          }/streamprocessors/${item.id}/duplicate/`}
          className="duplicate"
        >
          {/*DUPLICATE -  Needs to go to - /projects/2/streamprocessors/3/duplicate/-->*/}
          <span className="helper">Duplicate</span>
        </a>
        <button onClick={handleRun} className="deploy">
          {/*DEPLOY - Needs to go to - /projects/2/streamprocessors/3/run/ -->*/}
          <span className="helper">Deploy</span>
        </button>
        <button className="pause" onClick={handleStop}>
          {/*STOP - Needs to go to - /projects/2/streamprocessors/3/stop/ -->*/}
          <span className="helper">Stop</span>
        </button>
        <a
          href={`/react/projects/${
            item.project?.id || item.project
          }/streamprocessors/${item.id}/monitor/`}
          className="monitor"
        >
          {/*MONITOR - Needs to go to - /projects/2/streamprocessors/3/monitor/ -->*/}
          <span className="helper">Monitor</span>
        </a>
        <a
          href={`/projects/${
            item.project?.id || item.project
          }/streamprocessors/${item.id}/delete/`}
          className="delete"
        >
          {/*DELETE  Needs to go to - /projects/2/streamprocessors/3/delete/ -->*/}
          <span className="helper">Delete</span>
        </a>
      </div>
    </div>
  );
};

export default StreamProcessorValueCard;
