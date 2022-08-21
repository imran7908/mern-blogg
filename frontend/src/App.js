import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

const App = () => {
  const URL = "https://blogg-mern.herokuapp.com";
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);

  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <Route URL={URL} path="/auth" element={<Auth />} />
          ) : (
            <>
              <Route URL={URL} path="/blogs" element={<Blogs />} />
              <Route URL={URL} path="/myBlogs" element={<UserBlogs />} />
              <Route URL={URL} path="/myBlogs/:id" element={<BlogDetail />} />
              <Route URL={URL} path="/blogs/add" element={<AddBlog />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
};

export default App;
