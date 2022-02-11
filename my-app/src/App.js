import "./App.css";
import MiniDrawerDash from "./pages/student/dashboardPage/DashboardDrawer";
import FeedsDrawer from "./pages/student/feedPage/FeedsDrawer";
import LibraryDrawer from "./pages/student/libPage/LibraryDrawer";
import { Switch, Route } from "wouter";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SettingDrawer from "./pages/student/settingPage/SettingDrawer";
import AdminDashboardDrawer from "./pages/admin/dashboardPage/AdminDashboardDrawer";
import AddBookDrawer from "./pages/admin/addBook/AddBookDrawer";
import SingleBookAddingDrawer from "./pages/admin/addBook/SingleBookAddingDrawer";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/admin/signin">
          <SignIn title="Library" />
        </Route>
        <Route exact path="/admin/signup">
          <SignUp title="Library" />
        </Route>
        <Route exact path="/student/signin">
          <SignIn title="Student" />
        </Route>
        <Route exact path="/student/signup">
          <SignUp title="Student" />
        </Route>
        <Route exact path="/student/dashboard">
          <MiniDrawerDash />
        </Route>
        <Route exact path="/admin/dashboard">
          <AdminDashboardDrawer />
        </Route>
        <Route exact path="/student/feed">
          <FeedsDrawer />
        </Route>
        <Route exact path="/student/library">
          <LibraryDrawer />
        </Route>
        <Route exact path="/admin/addbook">
          <AddBookDrawer />
        </Route>
        <Route exact path="/student/setting">
          <SettingDrawer />
        </Route>
        <Route exact path="/admin/addbook/createbook">
          <SingleBookAddingDrawer />
        </Route>
      </Switch>
    </>
  );
}

export default App;
