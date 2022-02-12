import "./App.css";
import MiniDrawerDash from "./pages/student/dashboardPage/DashboardDrawer";
import FeedsDrawer from "./pages/student/feedPage/FeedsDrawer";
import LibraryDrawer from "./pages/student/libPage/LibraryDrawer";
import { Switch, Route } from "wouter";
import SettingDrawer from "./pages/student/settingPage/SettingDrawer";
import AdminDashboardDrawer from "./pages/admin/dashboardPage/AdminDashboardDrawer";
import AddBookDrawer from "./pages/admin/addBook/AddBookDrawer";
import LibPage from "./pages/student/individualLibPage/LibPage";
import SignInStudent from "./pages/student/SignIn";
import SignUpStudent from "./pages/student/SignUp";
import SignInAdmin from "./pages/admin/SignIn";
import SignUpAdmin from "./pages/admin/SignUp";
import AdminSettingDrawer from "./pages/admin/settingPage/AdminSettingPage";
import PendingBooks from "./pages/student/dashboardPage/pendingBooks/PendingBooks";
import ReservedBooks from "./pages/student/dashboardPage/reservedBooks/ReservedBooks";
import RegisteredPage from "./pages/admin/dashboardPage/registeredPage/RegisteredPage";
import AddedBook from "./pages/admin/dashboardPage/addedBooks/AddedBook";
import StudentPage from "./pages/admin/studentPage/StudentPage";
import FinePage from "./pages/admin/studentPage/FinePage";
import AssignBookPage from "./pages/admin/studentPage/assignNewBook/AssignNewBook";
import TransitionAlert from "./components/student/Alert";
import Verify from "./pages/student/Verify";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { StudentLoad } from "./actions/student/auth";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import Store from "./Store";
import StudentRoute from "./routing/StudentRoute";
import VerifyAdmin from "./pages/admin/Verify";
import { AdminLoad } from "./actions/admin/auth";
import AdminRoute from "./routing/AdminRoute";

if (Cookies.get("li_at")) {
  setAuthToken(Cookies.get("li_at"));
}

if (Cookies.get("cs_at")) {
  setAuthToken(Cookies.get("cs_at"));
}

function App() {
  useEffect(() => {
    Store.dispatch(StudentLoad());
  }, []);

  useEffect(() => {
    Store.dispatch(AdminLoad());
  }, []);

  return (
    <>
      <TransitionAlert />
      <Switch>
        <Route exact path="/api/verify/:id">
          {(params) => <Verify id={params.id} />}
        </Route>
        <Route exact path="/api/verify/admin/:id">
          {(params) => <VerifyAdmin id={params.id} />}
        </Route>
        <Route exact path="/admin/signin">
          <SignInAdmin title="Library" />
        </Route>
        <Route exact path="/admin/signup">
          <SignUpAdmin title="Library" />
        </Route>
        <Route exact path="/student/signin">
          <SignInStudent title="Student" />
        </Route>
        <Route exact path="/student/signup">
          <SignUpStudent title="Student" />
        </Route>
        <StudentRoute
          exact
          path="/student/dashboard"
          component={MiniDrawerDash}
        />
        <StudentRoute
          exact
          path="/student/dashboard/pendingbooks"
          component={PendingBooks}
        />
        <StudentRoute
          exact
          path="/student/dashboard/reservedbooks"
          component={ReservedBooks}
        />
        <StudentRoute exact path="/student/feed" component={FeedsDrawer} />
        <StudentRoute exact path="/student/library" component={LibraryDrawer} />
        <AdminRoute
          exact
          path="/admin/dashboard"
          component={AdminDashboardDrawer}
        />
        <AdminRoute
          exact
          path="/admin/dashboard/registeredstudents"
          component={RegisteredPage}
        />
        <AdminRoute
          exact
          path="/admin/dashboard/addedbooks"
          component={AddedBook}
        />
        <AdminRoute
          exact
          path="/admin/dashboard/student/:id"
          component={StudentPage}
        />
        <AdminRoute
          exact
          path="/admin/dashboard/student/fine"
          component={FinePage}
        />
        <AdminRoute
          exact
          path="/admin/dashboard/student/assignbook"
          component={AssignBookPage}
        />
        <StudentRoute
          exact
          path="/student/library/learnmore/:id"
          component={LibPage}
        />
        <AdminRoute exact path="/admin/addbook" component={AddBookDrawer} />
        <StudentRoute exact path="/student/setting" component={SettingDrawer} />
        <AdminRoute
          exact
          path="/admin/setting"
          component={AdminSettingDrawer}
        />
      </Switch>
    </>
  );
}

App.propTypes = {
  userRegister: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  userRegister: state.userRegister,
});

export default connect(mapStateToProps)(App);
