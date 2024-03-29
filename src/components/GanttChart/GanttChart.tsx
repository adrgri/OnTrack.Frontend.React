import Gantt, {
  Tasks,
  Dependencies,
  Resources,
  ResourceAssignments,
  Column,
  Editing,
  Validation,
} from "devextreme-react/gantt";

import { tasks, dependencies, resources, resourceAssignments } from "./data.ts";
import BoardNavigation from "../BoardNavigation/BoardNavigation.tsx";

function App() {
  return (
    <>
      <BoardNavigation
        leftButtonLabel="Moje zadania"
        rightButtonLabel="Tablica"
        leftButtonLink="/home"
        rightButtonLink="/tablica"
      />
      <Gantt taskListWidth={500} scaleType="weeks" height={700}>
        <Tasks dataSource={tasks} />
        <Dependencies dataSource={dependencies} />
        <Resources dataSource={resources} />
        <ResourceAssignments dataSource={resourceAssignments} />

        <Column dataField="title" caption="Subject" width={300} />
        <Column dataField="start" caption="Start Date" />
        <Column dataField="end" caption="End Date" />

        <Validation autoUpdateParentTasks />
        <Editing enabled />
      </Gantt>
    </>
  );
}

export default App;
