import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../Atom/Input/Input';
import Button from '../../Atom/Button/Button';
import TextArea from '../../Atom/TextArea/TextArea';
import { lists } from '../../Recoil/Data';
import { useRecoilState } from 'recoil';
import style from './HomePage.module.css';
export default function App() {
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [allList, setAllList] = useRecoilState(lists);
  const [favItem, setFavItem] = useState({});
  const navigate = useNavigate()
  // const [favItemList, setFavItemList] = useState([]);

  useEffect(() => {
    //with the help of setTimeout debouncing is added
    const getData = setTimeout(() => {
      fetch(`https://api.npms.io/v2/search?q=${search}`)
        //using Template literals
        .then((res) => res.json())
        .then((data) => {
          setAllList(data);
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
  }
  // console.log(favItem, '');
  function submit() {
    if (!text) {
      alert('please explain few words why is it favourite');
    } else {
      const selectFavItem = {
        name: favItem.package?.name,
        version: favItem.package?.version,
        description: favItem.package.description,
        yourText: text,
        isEdit: false,
      };
      console.log(selectFavItem, 'uuuy');
      //get all the data from local storage
      const favList = JSON.parse(localStorage.getItem('favList')) || [];
      //checking wether the choosed item is there in the local storage or not
      const findFavList = favList.find(
        (element) => element?.name === selectFavItem?.name
      );
      if (findFavList) {
        alert('this package is already in list');
      } else {
        const _favList = [selectFavItem, ...favList];
        localStorage.setItem('favList', JSON.stringify(_favList));
        setSearch('');
        setText('');
        setFavItem({});
      }
    }
  }
  return (
    <div>
     <Button className={style.navBtn} onClick={()=>navigate("/fav_list")} text = "Youe Favourite Packages" />
      <br />
      <span className={style.head}>Search Npm Package</span>
      <br />
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="lodash"
        value={search}
        type="text"
      />
      {list?.length ? (
        <>
          <h4>Results</h4>
          <div className={style.listDiv}>
            {list.map((item, index) => (
              <div onClick={() => handleClick(item)} key={index}>
                <Input name="package" id={item.package.name} type="radio" />
                <label htmlFor={item.name}>{item.package.name}</label>
              </div>
            ))}
          </div>{' '}
        </>
      ) : (
        <div>
          <h2>Search for the package</h2>
          <h2>Add to your Favourite List</h2>
        </div>
      )}

      <div>
        {favItem.package ? (
          <>
            <span>Why is this you favourite package?</span>
            <TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows="6"
              cols="50"
              placeholder="Please explain this in few words.. "
            />
            <br />
            <Button onClick={submit} text="Submit" />
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
