import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase";
import "./styles/publishCard.css";
import { FaCalendarAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdUpdate } from "react-icons/md";
import { HiFilter } from "react-icons/hi";
import { AiOutlineSortAscending } from "react-icons/ai";
import { Context } from "./Context";
import { AuthContext } from "./Auth";
import { Link, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from './Pagination';

function Publishblog() {
  const [blogLayout, setBlogLayout] = useState({});
  const [filterSearch, setFilterSearch] = useState('')
  const {blogId, setBlogId, blogContentFetch, setBlogContentFetch} = useContext(AuthContext);
  const [updateBlog, setUpdateBlog] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  let filter = Object.keys(blogLayout).filter(id => {
    return(blogLayout[id].title.toLowerCase().includes(filterSearch.toLocaleLowerCase()))
  })

  let filterChangeHandler = (e) => {
    setFilterSearch(e.target.value)
  }

  useEffect(() => {
    firebase
      .database()
      .ref("blogSpace")
      .on("value", (snapShot) => {
        if (snapShot.val() != null) {
          setBlogLayout({ ...snapShot.val() });
          setUpdateBlog(false);
        } else {
          setBlogLayout({});
        }
        console.log(blogLayout)
      });
  }, []);


  function onDelete(id) {
    if (window.confirm("Are you sure to delete this Blog?")) {
      firebase
        .database()
        .ref(`blogSpace/${id}`)
        .remove((err) => {
          if (err) console.log(err);
          else setBlogId("");
        });
        toast.success('Blog has been Deleted Successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
    }
  }

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filter.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page

    const paginate = pageNumber => setCurrentPage(pageNumber);

  if (updateBlog) {
    return <h1 style={{ color: "white" }}>Loading ....</h1>;
  } else {
    return (
      <section className="dark" style={{ paddingTop: "80px", paddingBottom : '20px' }}>
        <h1
          style={{ letterSpacing: "3px" }}
          className="h1 text-center"
          id="pageHeaderTitle"
        >
          Published Blogs
        </h1>
        <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filter.length}
        paginate={paginate}
      />
        <input
          type="text"
          autoComplete="none"
          placeholder= 'Filter Blogs'
          className="filterBox my-3"
          name="filterSearch"
          value={filterSearch}
          onChange={filterChangeHandler}
        />
         <HiFilter className = 'filterIcon'/>
        <br />
        {currentPosts.map((id) => {
          return (
            <div className="container py-4" key={id}>
              <article className="postcard dark blue">
                <a className="postcard__img_link" href="#">
                  <img
                    className="postcard__img"
                    src="https://picsum.photos/1000/1000"
                    alt="Image Title"
                  />
                </a>
                <div className="postcard__text">
                  <h1 className="postcard__title blue">
                    <a href="#">{blogLayout[id].title}</a>
                  </h1>
                  <div className="postcard__subtitle small">
                    <time >
                      <FaCalendarAlt style={{ marginRight: "10px" }} />
                      {blogLayout[id].date}
                    </time>
                  </div>
                  <div className="postcard__bar"></div>
                  <div className="postcard__preview-txt">
                    {blogLayout[id].content}
                    <br />
                    <br />
                    <div className = 'authorDisplay'>
                    <br />
                   <span>- &nbsp;</span> {blogLayout[id].author}
                    </div>
                  </div>
                  <ul className="postcard__tagbox">
                    <li className="tag__item play blue"  onClick={() => { return( setBlogId(id), setBlogContentFetch(blogLayout))}}>
                      <Link to="/writeblog">
                        <MdUpdate /> Update Blog{" "}
                      </Link>
                    </li>
                    <li className="tag__item play red" onClick={() => onDelete(id)}>
                      <MdDeleteForever /> Delete Blog
                    </li>
                  </ul>
                  <ToastContainer />
                </div>
              </article>
            </div>
          );
        })}
        <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filter.length}
        paginate={paginate}
      />
      </section>

    );
  }
}

export { Publishblog };
