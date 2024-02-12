import MainLayout from "../../components/layout/MainLayout";
import TasksDashboard from "../../components/TasksBoard/TasksBoard";

const Home = () => {
  return (
    <>
      <MainLayout>
        <TasksDashboard />
      </MainLayout>
    </>
  );
};

export default Home;
