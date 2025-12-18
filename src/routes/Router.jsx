import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DonationDetails from "../pages/Requests/DonationDetails";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import DonorHome from "../pages/Dashboard/DonorHome";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest";
import DonateForm from "../pages/Donate/DonateForm";
import MyDonationRequestView from "../pages/Dashboard/MyDonationRequestView";
import BloodDonationRequests from "../pages/Requests/BloodDonationRequests";
import DonateSuccess from "../pages/Donate/DonateSuccess";
import DonateCancel from "../pages/Donate/DonateCancel";
import HomeAdmin from "../pages/Dashboard/HomeAdmin";
import AllUsers from "../pages/Dashboard/AllUsers";
import AllBloodDonationRequests from "../pages/Dashboard/AllBloodDonationRequests";
import RoleBasedDashboardHome from "../pages/Dashboard/RoleBasedDashboardHome";
import HomeVolunteer from "../pages/Dashboard/HomeVolunteer";
import VolunteerDonationRequests from "../pages/Dashboard/VolunteerDonationRequests";
import Profile from "../pages/Dashboard/Profile"; // ✅ import profile page
import SearchDonors from "../components/SearchDonors";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "donations", element: <BloodDonationRequests /> },
      { path: "search", element: <SearchDonors /> },
      {
        path: "blood-donation-requests/:id",
        element: (
          <PrivateRoute>
            <DonationDetails />
          </PrivateRoute>
        ),
      },
      { path: "donate", element: <DonateForm /> },
      { path: "donate-success", element: <DonateSuccess /> },
      { path: "donate-cancel", element: <DonateCancel /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <RoleBasedDashboardHome /> },
      { path: "my-donation-requests", element: <MyDonationRequests /> },
      { path: "create-donation-request", element: <CreateDonationRequest /> },
      {
        path: "/dashboard/donor/donation/:id",
        element: <MyDonationRequestView isAdmin={false} />,
      },
      // Profile page for all roles
      { path: "profile", element: <Profile /> }, // ✅ added profile route

      // Admin routes
      { path: "admin", element: <HomeAdmin /> },
      { path: "all-users", element: <AllUsers /> },
      {
        path: "/dashboard/admin/donation/:id",
        element: <MyDonationRequestView isAdmin={true} />,
      },
      {
        path: "all-blood-donation-request",
        element: <AllBloodDonationRequests />,
      },

      // Volunteer routes
      { path: "volunteer", element: <HomeVolunteer /> },
      {
        path: "volunteer/all-blood-donation-request",
        element: <VolunteerDonationRequests />,
      },
      {
        path: "/dashboard/volunteer/donation/:id",
        element: <MyDonationRequestView isAdmin={false} />,
      },
      {
        path: "volunteer/create-donation-request",
        element: <CreateDonationRequest />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
