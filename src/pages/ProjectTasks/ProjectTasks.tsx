import { useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import TasksBoard from "../../components/TasksBoard/TasksBoard";

function ProjectTasks() {
  const { projectId } = useParams();

  return (
    <div>
      <MainLayout>
        <TasksBoard projectId={projectId} />
      </MainLayout>
    </div>
  );
}

export default ProjectTasks;
