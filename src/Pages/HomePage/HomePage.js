import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Atom/Input/Input";
import Button from "../../Atom/Button/Button";
import TextArea from "../../Atom/TextArea/TextArea";
import { lists } from "../../Recoil/Data";
import { useRecoilState } from "recoil";
import Swal from 'sweetalert2';
import style from "./HomePage.module.css";
export default function App() {
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [allList, setAllList] = useRecoilState(lists);
  const [favItem, setFavItem] = useState({});
  const navigate = useNavigate();
  // const [favItemList, setFavItemList] = useState([]);

  useEffect(() => {
    //with the help of setTimeout debouncing is added
    const getData = setTimeout(() => {
      fetch(`https://api.npms.io/v2/search?q=${search}`)
        //using Template literals
        .then((res) => res.json())
        .then((data) => {
          setAllList(data?.results);
          setList(data?.results);
        });
    }, 1000);

    return () => clearTimeout(getData);
    //clear instance of useEffect we have do avoid memory leakage if our components get unmounted
  }, [search]);

  // console.log(favItem)

  function handleClick(item) {
    // console.log(item, 'click');
    setFavItem(item); 
    //maintaining click item state for conditional rendinering of text area
  }
  // console.log(favItem, '');
  function submit() {
    if (!text) {
      Swal.fire("Please explain few words why it is your favourite...!");
    } else {
      const selectFavItem = {
        name: favItem.package?.name,
        version: favItem.package?.version,
        description: favItem.package.description,
        yourText: text,
        isEdit: false,
      };
      // console.log(selectFavItem, "uuuy");
      //get all the data from local storage //beacause override occurs in localStorage 
      const favList = JSON.parse(localStorage.getItem("favList")) || [];
      //checking wether the choosed item is there in the local storage or not
      const findFavList = favList.find(
        (element) => element?.name === selectFavItem?.name
      );
      if (findFavList) {
        alert("this package is already in list");
      } else {
        const _favList = [selectFavItem, ...favList];
        localStorage.setItem("favList", JSON.stringify(_favList));
        setSearch("");
        setText("");
        setFavItem({});
      }
    }
  }
  return (
    <div>
      <Button
        className={style.navBtn}
        onClick={() => navigate("/fav_list")}
        text="Your Favourite Packages"
      />

      <p className={style.head}>Search For NPM Package</p>

      <Input
        className={style.input}
        onChange={(e) => {setSearch(e.target.value);setFavItem({})}}
        placeholder="React..."
        value={search}
        type="text"
      />
      
      {list?.length ? (
        <>
          <h4 className={style.result}>Results</h4>
          <div className={style.listDiv}>
            {list.map((item, index) => (
              <div
                className={style.option}
                onClick={() => handleClick(item)}
                key={index}
              >
                <Input
                  className={style.radio}
                  name="package"
                  id={item.package.name}
                  type="radio"
                />
                <label htmlFor={item.package.name}>{item.package.name}</label>
              </div>
            ))}
          </div>{" "}
        </>
      ) : (
        <>
          <div className={style.defin}>
            <h2>What is NPM?</h2>
            <p>
              NPM is a short form of Node Package Manager, which is the world's
              largest software registry. The open-source web project developers
              use it from the entire world to share and borrow packages. The npm
              also acts as a command-line utility for the Node.js project for
              installing packages in the project, dependency management, and
              even version management.
            </p>
          </div>
          <div className={style.wrapList}>
            <h2>The World's Largest Software Registry (Library)</h2>
            <ol>
              <li>NPM is the world's largest Software Registry.</li>

              <li>The registry contains over 800,000 code packages.</li>

              <li>Open-source developers use npm to share software.</li>

              <li>
                Many organizations also use npm to manage private development.
              </li>
              <li>NPM is free to use.</li>
              <li>NPM is installed with Node.js</li>
              <li>
                This means that you have to install Node.js to get npm installed
                on your computer.
              </li>
              <li>
                Download Node.js from the official Node.js web site: Node.Js ORG
              </li>
              <li>
                All npm packages are defined in files called package.json.
              </li>
              <li>
                NPM includes a CLI (Command Line Client) that can be used to
                download and install software:
              </li>
            </ol>
            </div>
            <p style={{textAlign :"center"}}>&copy; ASHAR 2023</p>
        </>
      )}

      <div >
        {favItem.package ? (
          <>
          <div className={style.textAreaDiv}>
            <span className={style.textAreaHead}>Why is this you favourite package?</span>
            <TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="6"
              cols="50"
              placeholder="Please explain this in few words.. "
            />
            <br />
            <Button   className={style.subBtn} onClick={submit} text="Submit" />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
