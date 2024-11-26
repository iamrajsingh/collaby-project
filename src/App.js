import React, { Component } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import { LoginSocialLinkedin } from "reactjs-social-login";
//import { LinkedinLoginButton } from "react-social-login-buttons";
import ProtectedRoute from "./utils/ProtectedRoute";
import FrontendProtectedRoute from "./utils/FrontendProtectedRoute";
import AdminLogin from "./admin-side/Pages/Dashboard/AdminLogin";
import AdminDashboard from "./admin-side/Pages/Dashboard/AdminDashboard";
import AdminAdd from "./admin-side/Pages/Blog/AdminAdd";
import AdminListing from "./admin-side/Pages/Blog/AdminListing";
import AdminEdit from "./admin-side/Pages/Blog/AdminEdit";
import ProjectAdd from "./admin-side/Pages/Project/ProjectAdd";
import ProjectEdit from "./admin-side/Pages/Project/ProjectEdit";
import ProjectListing from "./admin-side/Pages/Project/ProjectListing";
import PricingAdd from "./admin-side/Pages/Pricing/PricingAdd";
import PartnerAdd from "./admin-side/Pages/Partner/PartnerAdd";
import PartnerEdit from "./admin-side/Pages/Partner/PartnerEdit";
import PartnerListing from "./admin-side/Pages/Partner/PartnerListing";
import TeamAdd from "./admin-side/Pages/Team/TeamAdd";
import TeamEdit from "./admin-side/Pages/Team/TeamEdit";
import TeamListing from "./admin-side/Pages/Team/TeamListing";
import PricingEdit from "./admin-side/Pages/Pricing/PricingEdit";
import PricingListing from "./admin-side/Pages/Pricing/PricingListing";
import Contact from "./admin-side/Pages/Contact/ContactListing";
import Project from "./frontend-side/Pages/Project";
import RoadMap from "./frontend-side/Pages/RoadMap";
import Team from "./frontend-side/Pages/Team";
import Partner from "./frontend-side/Pages/Partner";
import AboutUs from "./frontend-side/Pages/About";
import Contacts from "./frontend-side/Pages/Contacts";
import KeywordListing from "./admin-side/Pages/Keyword/KeywordListing";
import Register from "./frontend-side/Pages/Register";
import Profile from "./frontend-side/Pages/Profile";
import KeywordAdd from "./admin-side/Pages/Keyword/KeywordAdd";
import KeywordEdit from "./admin-side/Pages/Keyword/KeywordEdit";
import Slider1Listing from "./admin-side/Pages/Slider1/Slider1Listing";
import Slider1Edit from "./admin-side/Pages/Slider1/Slider1Edit";
import Slider1Add from "./admin-side/Pages/Slider1/Slider1Add";
import Slider2Listing from "./admin-side/Pages/Slider2/Slider2Listing";
import Slider2Edit from "./admin-side/Pages/Slider2/Slider2Edit";
import Slider2Add from "./admin-side/Pages/Slider2/Slider2Add";
import Slider3Listing from "./admin-side/Pages/Slider3/Slider3Listing";
import Slider3Edit from "./admin-side/Pages/Slider3/Slider3Edit";
import Slider3Add from "./admin-side/Pages/Slider3/Slider3Add";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import Pricing from "./frontend-side/Pages/Pricing";
import LinkedinCallbackPage from "./frontend-side/Pages/LinkedinCallbackPage";
import CSV from "./frontend-side/Components/CSV";
import PNF from "./utils/PNF";
//import LinkedInOAuth from "./LinkedInOAuth";
// import LinkedInOAuth from "./frontend-side/Components/LinkedInOAuth";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Project />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/roadmaps" element={<RoadMap />} />
          <Route path="/teams" element={<Team />} />
          <Route path="/partners" element={<Partner />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/linkedin" element={<LinkedinCallbackPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/csv" element={<CSV />} />
          <Route
            path="/profile"
            element={
              <FrontendProtectedRoute>
                <Profile />
              </FrontendProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/blogs/add"
            element={
              <ProtectedRoute>
                <AdminAdd />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/blogs"
            element={
              <ProtectedRoute>
                <AdminListing />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/blogs/edit/:Id"
            element={
              <ProtectedRoute>
                <AdminEdit />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/project/add"
            element={
              <ProtectedRoute>
                <ProjectAdd />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/project/edit/:Id"
            element={
              <ProtectedRoute>
                <ProjectEdit />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/partner/add"
            element={
              <ProtectedRoute>
                <PartnerAdd />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/partner/edit/:Id"
            element={
              <ProtectedRoute>
                <PartnerEdit />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/team/add"
            element={
              <ProtectedRoute>
                <TeamAdd />
              </ProtectedRoute>
            }
          />
          {/* <Route exact path="/admin/edit/:Id" element={<ProtectedRoute><TeamEdit /></ProtectedRoute>} /> */}
          <Route
            exact
            path="/admin/team/listing"
            element={
              <ProtectedRoute>
                <TeamListing />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/slider1/listing"
            element={
              <ProtectedRoute>
                <Slider1Listing />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/slider2/listing"
            element={
              <ProtectedRoute>
                <Slider2Listing />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/slider3/listing"
            element={
              <ProtectedRoute>
                <Slider3Listing />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/slider1/edit/:Id"
            element={
              <ProtectedRoute>
                <Slider1Edit />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/slider2/edit/:Id"
            element={
              <ProtectedRoute>
                <Slider2Edit />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/slider3/edit/:Id"
            element={
              <ProtectedRoute>
                <Slider3Edit />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/slider1/add"
            element={
              <ProtectedRoute>
                <Slider1Add />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/slider2/add"
            element={
              <ProtectedRoute>
                <Slider2Add />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/slider3/add"
            element={
              <ProtectedRoute>
                <Slider3Add />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/pricing/add"
            element={
              <ProtectedRoute>
                <PricingAdd />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/pricing/edit/:Id"
            element={
              <ProtectedRoute>
                <PricingEdit />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/pricing/listing"
            element={
              <ProtectedRoute>
                <PricingListing />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/team/edit/:t_id"
            element={
              <ProtectedRoute>
                <TeamEdit />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/admin/team/edit/:t_id"
            element={
              <ProtectedRoute>
                render={(props) => <TeamEdit {...props} />}
              </ProtectedRoute>
            }
          /> */}
          <Route
            exact
            path="/admin/partner/listing"
            element={
              <ProtectedRoute>
                <PartnerListing />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/keyword/listing"
            element={
              <ProtectedRoute>
                <KeywordListing />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/keyword/add"
            element={
              <ProtectedRoute>
                <KeywordAdd />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/keyword/edit/:Id"
            element={
              <ProtectedRoute>
                <KeywordEdit />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/project/listing"
            element={
              <ProtectedRoute>
                <ProjectListing />
              </ProtectedRoute>
            }
          />

          <Route
            exact
            path="/admin/contact/listing"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
            />
            <Route path="/*" element={<PNF />} />

        </Routes>
      </Router>
    );
  }
}

export default App;
