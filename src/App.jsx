import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import TaskButtons from "./component/Tasksbuttons";
import Task01 from "./component/Task01";
import Task02 from "./component/Task02";
import Task03 from "./component/Task03";
import BookDetails from "./component/BookDetails";
import { Books } from "./utilis/MockData";

const App = () => {
  const [filteredBooks, setFilteredBooks] = useState(Books);

  return (
    <>
      <Header />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<TaskButtons />} />
          <Route path="/task01" element={<Task01 />} />
          <Route path="/task02" element={<Task02 />} />
          <Route path="/task03" element={<Task03 bookData={filteredBooks} setFilteredBooks={setFilteredBooks} />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
