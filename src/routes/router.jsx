import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import HomePage from "../pages/HomePage/HomePage";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound";
import DpsOpeningForm from "../pages/Dps/DpsOpeningForm";
import WebDashboard from "../pages/WebDashboard";
import Table from "../shared/Table/Table";
import MemberShipForm from "../pages/Dps/MemberShipForm";
import PendingMemberShip from "../pages/WebDashboard/Membership/Pending";
import ApprovedMemberShip from "../pages/WebDashboard/Membership/Approved";
import RejectedMemberShip from "../pages/WebDashboard/Membership/Rejected";
import PrivateRoute from "./PrivateRoutes";
import Services from "../pages/WebDashboard/Services";
import AddService from "../pages/WebDashboard/Services/AddService";
import EditService from "../pages/WebDashboard/Services/components/EditService";
import News from "../pages/WebDashboard/News";
import AddNews from "../pages/WebDashboard/News/AddNews";
import EditNews from "../pages/WebDashboard/News/components/EditNews";
import Media from "../pages/WebDashboard/Media";
import AddMedia from "../pages/WebDashboard/Media/AddMedia";
import EditMedia from "../pages/WebDashboard/Media/components/EditMedia";
import AddOurConcern from "../pages/WebDashboard/OurConcern/AddOurConcern";
import OurConcern from "../pages/WebDashboard/OurConcern";
import AboutUs from "../pages/WebDashboard/AboutUs";
import AddAboutUs from "../pages/WebDashboard/AboutUs/AddAboutUs";
import JobCircular from "../pages/WebDashboard/GetInTouch/JobCircular";
import AddJobCircular from "../pages/WebDashboard/GetInTouch/JobCircular/AddJobCircular";
import EditJobCircular from "../pages/WebDashboard/GetInTouch/JobCircular/components/EditJobCircular";
import Notice from "../pages/WebDashboard/GetInTouch/Notice";
import AddNotice from "../pages/WebDashboard/GetInTouch/Notice/AddNotice";
import EditNotice from "../pages/WebDashboard/GetInTouch/Notice/components/EditNotice";
import CsrPage from "../pages/WebDashboard/GetInTouch/Csr";
import AddCsrPage from "../pages/WebDashboard/GetInTouch/Csr/AddCsr";
import ContactUs from "../pages/WebDashboard/GetInTouch/Contact";
import AppliedServices from "../pages/WebDashboard/Services/components/AppliedServices";
import DpsHistory from "../pages/Dps/DpsHistory";
import DpsCollection from "../pages/Dps/DpsCollection";
import DpsReturn from "../pages/Dps/DpsReturn";
import CreateMembership from "../pages/WebDashboard/Membership/CreateMembership";
import LoanDashboard from "../pages/Loan";
import FdrScheme from "../pages/FDR/FdrScheme";
import FdrSingleScheme from "../pages/FDR/FdrOpeningForm/FdrSingleScheme";
import FdrDoubleScheme from "../pages/FDR/FdrOpeningForm/FdrDoubleScheme";
import FdrHistory from "../pages/FDR/FdrHistory";
import FdrWithdraw from "../pages/FDR/FdrWithdraw";
import FDR from "../pages/FDR";
import Dps from "../pages/Dps";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        {" "}
        <MainLayout />{" "}
      </PrivateRoute>
    ),

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      // DPS Start
      {
        path: "/dps",
        element: <Dps />,
        children: [
          {
            path: "/dps/opening-form",
            element: <DpsOpeningForm />,
          },
          {
            path: "/dps/history",
            element: <DpsHistory />,
          },
          {
            path: "/dps/collection",
            element: <DpsCollection />,
          },
          {
            path: "/dps/withdraw",
            element: <DpsReturn />,
          },
        ],
      },

      // FDR Start
      {
        path: "/fdr",
        element: <FDR />,
        children: [
          {
            path: "/fdr",
            element: <FdrScheme />,
          },
          {
            path: "/fdr/scheme",
            element: <FdrScheme />,
          },
          {
            path: "/fdr/single-scheme",
            element: <FdrSingleScheme />,
          },
          {
            path: "/fdr/double-scheme",
            element: <FdrDoubleScheme />,
          },
          {
            path: "/fdr/history",
            element: <FdrHistory />,
          },
          {
            path: "/fdr/withdraw-amount",
            element: <FdrWithdraw />,
          },
        ],
      },

      {
        path: "/table",
        element: <Table />,
      },
      {
        path: "/membership",
        element: <MemberShipForm />,
      },
      {
        path: "/loan",
        element: <LoanDashboard />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
  {
    path: "/web",
    element: (
      <PrivateRoute>
        {" "}
        <WebDashboard />{" "}
      </PrivateRoute>
    ),
    children: [
      {
        path: "/web/membership/pending",
        element: <PendingMemberShip />,
      },
      {
        path: "/web/membership/approved",
        element: <ApprovedMemberShip />,
      },
      {
        path: "/web/membership/rejected",
        element: <RejectedMemberShip />,
      },
      {
        path: "/web/membership/create",
        element: <CreateMembership />,
      },
      {
        path: "/web/service",
        element: <Services />,
      },
      {
        path: "/web/service/add",
        element: <AddService />,
      },
      {
        path: "/web/service/applied",
        element: <AppliedServices />,
      },
      {
        path: "/web/service/:id",
        element: <EditService />,
      },
      {
        path: "/web/news",
        element: <News />,
      },
      {
        path: "/web/news/add",
        element: <AddNews />,
      },
      {
        path: "/web/news/:id",
        element: <EditNews />,
      },
      {
        path: "/web/media",
        element: <Media />,
      },
      {
        path: "/web/media/add",
        element: <AddMedia />,
      },
      {
        path: "/web/media/:id",
        element: <EditMedia />,
      },
      {
        path: "/web/concern",
        element: <OurConcern />,
      },
      {
        path: "/web/concern/add",
        element: <AddOurConcern />,
      },
      {
        path: "/web/concern/:id",
        element: <EditMedia />,
      },
      {
        path: "/web/about-us",
        element: <AboutUs />,
      },
      {
        path: "/web/about-us/add",
        element: <AddAboutUs />,
      },
      {
        path: "/web/about-us/:id",
        element: <EditMedia />,
      },

      // get in touch
      {
        path: "/web/get-in-touch/job-circular",
        element: <JobCircular />,
      },
      {
        path: "/web/get-in-touch/job-circular/add",
        element: <AddJobCircular />,
      },
      {
        path: "/web/get-in-touch/job-circular/:id",
        element: <EditJobCircular />,
      },

      // get in touch notice
      {
        path: "/web/get-in-touch/notice",
        element: <Notice />,
      },
      {
        path: "/web/get-in-touch/notice/add",
        element: <AddNotice />,
      },
      {
        path: "/web/get-in-touch/notice/:id",
        element: <EditNotice />,
      },
      // get in touch csr
      {
        path: "/web/get-in-touch/csr",
        element: <CsrPage />,
      },
      {
        path: "/web/get-in-touch/csr/add",
        element: <AddCsrPage />,
      },
      {
        path: "/web/get-in-touch/csr/:id",
        element: <AddCsrPage />,
      },
      // get in touch contact us
      {
        path: "/web/get-in-touch/contact-us",
        element: <ContactUs />,
      },
    ],
  },
]);
