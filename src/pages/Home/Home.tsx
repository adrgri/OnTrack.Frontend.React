import MainLayout from "../../components/layout/MainLayout";
import TasksDashboard from "../../components/TasksBoard/TasksBoard";
import TaskBoardNavigation from "../../components/TaskBoardNavigation/TaskBoardNavigation";

const Home = () => {
  return (
    <>
      <MainLayout>
        {/* <TaskBoardNavigation /> */}
        <TasksDashboard />
      </MainLayout>
    </>
  );
};

export default Home;
