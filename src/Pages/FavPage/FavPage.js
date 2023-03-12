import React, { useEffect, useState } from 'react';
import Button from '../../Atom/Button/Button';
import { TbEye } from 'react-icons/tb';
import { BiEdit } from 'react-icons/bi';
import { GiConfirmed } from 'react-icons/gi';
import { GiCancel } from 'react-icons/gi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import style from './FavPage.module.css'
import Input from '../../Atom/Input/Input';
export default function FavPage() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');

  const navigate = useNavigate();
  useEffect(() => { //getting data from local storage
    const favList = JSON.parse(localStorage.getItem('favList'));
    setList(favList); 
    //after that the data comes then maintaining a state to render all the data
  }, []);

  function handleDelete(element) {
    console.log(element);
    Swal.fire({  //this is just a alert 3rd perty library
      title: 'Are you sure want to delete?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = JSON.parse(localStorage.getItem('favList'));  
        //to delete data from local storage
        const newList = data.filter((x) => x.name !== element.name);
        localStorage.setItem('favList', JSON.stringify(newList)); 
        //after delete again set the data in local storage
        setList(newList);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  function captureEdit(e) {
    setValue(e.target.value);
  }

  function handleEdit(element) {
    if (!element.isEdit) {
      element.isEdit = true;
      //there was a key is edit maintain for this purpose
      //just for conditional rendering of input box get open when click on edit btn
    } else {
      element.isEdit = false;
    }
    setList([...list]);
  }

  function handleEditConfirmed(element){
   let index = list.indexOf(element) //finding the index of the click element
   if(value === ""){  //if the edit input is empty then show alert
    Swal.fire({title : 'Either Update the Package or Cancel'})
   }else{
    //creating a new object for that array element to replace it
    const newItem = {
      name : value,  //giving new values to partuicual element
      version : element.version,  //restoring all the previous value of that particular element
      description : element.description,
      yourText :element.yourText,
      isEdit : false
    }
    list.splice(index,1,newItem)  // again setting the data in local storage to edit the data in local storage also
   localStorage.setItem("favList" , JSON.stringify(list))  //
     setList([...list]);
     setValue("")
   }
  
  }
  return (
    <>
    <Button   className={style.navBtn} onClick={() => navigate('/')} text="Add Packages In Favourite" />
      <h3 className={style.head}>Welcome to Favorite NPM package</h3>

      {list?.length > 0 ? (
        <div className={style.listBox}>
        <div className={style.listBoxTitle}>
        <h3>Package Name</h3>
        <h3>Action</h3>
        </div>
          {list.map((element , index) => (
            <div className={style.list} key={index}>
            <div>
              {element.isEdit ? (
                <Input className={style.input} onChange={captureEdit} />
              ) : (
                <p>{element.name}</p>
              )}

              <p>version : {element.version}</p>
              </div>
              <div className={style.actionBtn}>
              <TbEye className={style.btn} title={" Description :  " + element.description} />
              <span>
                {element.isEdit ? (
                  <>
                    <GiConfirmed className={style.btn}  onClick={()=>handleEditConfirmed(element)}/>
                    <GiCancel className={style.btn}  onClick={() => handleEdit(element)} />
                  </>
                ) : (
                  <BiEdit className={style.btn}  onClick={() => handleEdit(element)} />
                )}
              </span>
              <RiDeleteBin5Line className={style.btn}  onClick={() => handleDelete(element)} />
            </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={style.altBox}>
          <h3>You dont have favourite package yet Please add some...</h3>
          <Button  className={style.addBtn}  onClick={() => navigate('/')} text="Add Favourite" />
        </div>
      )}
      <p style={{textAlign :"center"}}>&copy; ASHAR 2023</p>
    </>
  );
}
