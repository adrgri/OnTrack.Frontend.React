import GanttChart from "../../components/GanttChart/GanttChart";
import TaskBoardNavigation from "../../components/TaskBoardNavigation/TaskBoardNavigation";
import MainLayout from "../../components/layout/MainLayout";

export default function Tablica() {
  return (
    <>
      <MainLayout>
        <TaskBoardNavigation />
        <GanttChart />
      </MainLayout>
    </>
  );
}
