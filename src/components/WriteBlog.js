import React, { useState, useContext, useEffect } from "react";
import "./styles/writeblog.css";
import { Link, Route } from "react-router-dom";
import firebase from "../firebase";
import { InputGroup, FormControl } from "react-bootstrap";
import { MdPublish } from "react-icons/md";
import { FaCheckSquare } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";
import { Context } from "./Context";
import { AuthContext } from "./Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WriteBlog() {
  const {blogId, setBlogId, blogContentFetch, setBlogContentFetch} = useContext(AuthContext);

  const titleStyle = {
    border: "1px white solid",
    background: "transparent",
    color: "white",
    fontSize: "30px",
    margin: "0, 100px, 0, 100px",
    textAlign: "center",
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateObj = new Date();
  const month = monthNames[dateObj.getMonth()];
  let day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();

  const output = month + " " + day + " " + year;

  const [publish, setPublish] = useState(false);
  const ContentText = {
    title: "",
    content: "",
    author: "",
    date: output,
  };
  const [blogInput, setBlogInput] = useState(ContentText);
  const [emptyInputTitle, setEmptyInputTitle] = useState("");
  const [emptyInputContent, setEmptyInputContent] = useState("");
  const [emptyInputAuthor, setEmptyInputAuthor] = useState("");
  const [errorStyle, setErrorStyle] = useState({});

  let submitHandler = (event) => {
    event.preventDefault();
    const blogsetup = firebase.database().ref("blogSpace");
    const blogStore = {
      title: capitalizeFirstLetter(blogInput.title),
      content: capitalizeFirstLetter(blogInput.content),
      author: capitalizeFirstLetter(blogInput.author),
      date: blogInput.date,
    };
    if (blogInput.title.trim() === "" && blogInput.content.trim() === "" && blogInput.author.trim() === "") {
      setEmptyInputTitle("Please Enter the Title of the Blog");
      setEmptyInputContent("Please Enter the Content for the Blog");
      setEmptyInputAuthor("Please Enter the Author Name of the Blog")
      setPublish(false);
      setErrorStyle({ borderColor: "red", fontSize: "15px"});
    } else if (blogInput.title.trim() === "") {
      setEmptyInputContent("Please Enter the Content for the Blog");
      setPublish(false);
      setEmptyInputContent("");
      setErrorStyle({ borderColor: "red" });
    } else if (blogInput.content.trim() === "") {
      setEmptyInputContent("Please Enter the Content for the Blog");
      setPublish(false);
      setEmptyInputTitle("");
      setErrorStyle({ borderColor: "red", color: "red" });
    } else if (blogInput.author.trim() === "") {
      setEmptyInputAuthor("Please Enter the Author Name of the Blog")
      setPublish(false);
      setEmptyInputTitle("");
      setErrorStyle({ borderColor: "red", color: "red" , fontSize: "15px"});
    } else {
      if (blogId === "") {
        blogsetup.push(blogStore);
        setEmptyInputTitle("");
        setPublish(true);
        setErrorStyle({ borderColor: "lightGreen", color: "lightGreen" });
        setEmptyInputContent("Congratulations Your Blog has been PUBLISHED!! ");
        toast.success('The Blog has been PUBLISHED!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      } else{
        firebase
          .database()
          .ref(`blogSpace/${blogId}`)
          .set(blogInput, setBlogId(''));
          setBlogId('') 
          setPublish(true)
          setErrorStyle({ borderColor: "lightBlue", color: "lightBlue" });
          setEmptyInputContent("Congratulations Your Blog has been UPDATED!! ");
          toast.info('The Blog has been UPDATED!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }}
  };

console.log(blogInput.content)

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  let changeHandler = (event) => {
    const { name, value } = event.target;
    setBlogInput({ ...blogInput, [name]: value });
  };

  useEffect(() => {
    if (blogId === "")
      setBlogInput({
        ...ContentText,
      });
    else
      setBlogInput({
        ...blogContentFetch[blogId],
      });
  }, [blogId, blogContentFetch]);
  

  return (
    <div className="my-5" style={{ paddingTop: "30px" }}>
      <form autoComplete="" onSubmit={submitHandler}>
        <h1
          style={{ letterSpacing: "2px" }}
          className="h1 text-center"
          id="pageHeaderTitle"
        >
          Write a Blogs
        </h1>
        <input
          type="text"
          style={errorStyle}
          autoComplete="none"
          placeholder="Enter Title"
          className="title my-3"
          name="title"
          value={blogInput.title}
          onChange={changeHandler}
        />
  
        <br />
        <small className="errorStyle">{emptyInputTitle}</small>
        <hr />
        <textarea
          placeholder="Blog Content"
          style={errorStyle}
          className="content my-5"
          name="content"
          value={blogInput.content}
          onChange={changeHandler}
        />
        <br />
        <small style={errorStyle}>{emptyInputContent}</small>
          <input
          type="text"
          style={errorStyle}
          autoComplete="none"
          placeholder="Author Name"
          className="author my-3"
          name="author"
          value={blogInput.author}
          onChange={changeHandler}
        />
        <br />
        <small className = 'author' style={errorStyle}>{emptyInputAuthor}</small>
        <hr />
        <br />
        <div className="buttonAligniment">
          {publish ? (
            <Link to="/Publishblog">
              <button className="noselect buttonStyle">
                <span className="text" style={{ transform: "translateX(5px)" }}>
                  Check Your Blog
                </span>
                <span className="icon">
                  <FaCheckSquare />
                </span>
              </button>
            </Link>
          ) : ( blogId === '' ?
            <button type="submit" className="noselect buttonStyle">
              <span className="text">Publish</span>
              <span className="icon">
                <MdPublish />
              </span>
            </button>
            :
            <button type="submit" className="noselect buttonStyle">
              <span className="text">Update</span>
              <span className="icon">
                <MdUpdate />
              </span>
            </button>
          )}
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}

export default WriteBlog;
