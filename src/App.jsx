import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./component/Header";
import TaskButtons from "./component/Tasksbuttons";
import Task01 from "./component/Task01";
import Task02 from "./component/Task02";
import Task03 from "./component/Task03";
import BookDetails from "./component/BookDetails";
import { Books } from "./utilis/MockData";
import Task05 from "./component/Task05";
import Task06 from "./component/Task06";
import { auth } from "../src/utilis/FirebaseData";
import { onAuthStateChanged } from "firebase/auth";
import TodoDashboard from "./component/TodoDashboard";
import PrivateRoute from "./component/PrivateRoute";

const App = () => {
  const [filteredBooks, setFilteredBooks] = useState(Books);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Current user from auth:", currentUser);
    });
    return () => unsubscribe();
  }, []);

  console.log("User state in App:", user);

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
          <Route path="/task05" element={<Task05 />} />
          <Route path="/task06" element={<Task06 setUser={setUser} />} />
          <Route 
            path="/TodoDashboard" 
            element={
              <PrivateRoute user={user}>
                <TodoDashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
