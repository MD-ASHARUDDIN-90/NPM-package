import React, { useEffect, useState } from 'react';
import Button from '../../Atom/Button/Button';
import { TbEye } from 'react-icons/tb';
import { BiEdit } from 'react-icons/bi';
import { GiConfirmed } from 'react-icons/gi';
import { GiCancel } from 'react-icons/gi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function FavPage() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    const favList = JSON.parse(localStorage.getItem('favList'));
    setList(favList);
  }, []);

  function handleDelete(element) {
    console.log(element);
    Swal.fire({
      text: 'Are you sure want to delete?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = JSON.parse(localStorage.getItem('favList'));
        const newList = data.filter((x) => x.name !== element.name);
        localStorage.setItem('favList', JSON.stringify(newList));
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
    } else {
      element.isEdit = false;
    }
    setList([...list]);
  }

  function handleEditConfirmed(element){
   let index = list.indexOf(element)
   if(value === ""){
    Swal.fire({title : 'Either Update the Package or Cancel'})
   }else{
    const newItem = {
      name : value,
      version : element.version,
      description : element.description,
      yourText :element.yourText,
      isEdit : false
    }
    list.splice(index,1,newItem)
   localStorage.setItem("favList" , JSON.stringify(list))
     setList([...list]);
     setValue("")
   }
  
  }
  return (
    <>
      <h3>Welcome to Favorite NPM package</h3>
      <Button onClick={() => navigate('/')} text="Add Fav" />

      {list?.length > 0 ? (
        <div>
          {list.map((element , index) => (
            <div key={index}>
              {element.isEdit ? (
                <input onChange={captureEdit} />
              ) : (
                <p>{element.name}</p>
              )}

              <p>version : {element.version}</p>
              <TbEye title={" Description :  " + element.description} />
              <span>
                {element.isEdit ? (
                  <>
                    <GiConfirmed onClick={()=>handleEditConfirmed(element)}/>
                    <GiCancel onClick={() => handleEdit(element)} />
                  </>
                ) : (
                  <BiEdit onClick={() => handleEdit(element)} />
                )}
              </span>
              <RiDeleteBin5Line onClick={() => handleDelete(element)} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3>You dont have favourite package yet Please add some...</h3>
        </div>
      )}
    </>
  );
}
