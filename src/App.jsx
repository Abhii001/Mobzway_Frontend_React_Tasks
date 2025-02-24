import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import TaskButtons from "./component/Tasksbuttons";
import Task01 from "./component/Task01";
import Task02 from "./component/Task02";

const App = () => {
  return (
    <>
      <Header />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<TaskButtons />}/>
          <Route path="/task01" element={<Task01 />} />
          <Route path="/task02" element={<Task02 />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
