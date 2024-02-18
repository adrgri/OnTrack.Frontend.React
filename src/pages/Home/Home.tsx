import MainLayout from "../../components/layout/MainLayout";
import TasksBoard from "../../components/TasksBoard/TasksBoard";

const Home = () => {
  return (
    <>
      <MainLayout>
        <TasksBoard />
      </MainLayout>
    </>
  );
};

export default Home;
