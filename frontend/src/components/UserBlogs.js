import axios from "axios";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://127.0.0.1:5000/blogs/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  console.log(user);

  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            key={index}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
