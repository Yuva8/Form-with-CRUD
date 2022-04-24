import React,{useState,useEffect} from 'react';
import axios from 'axios';


function FunctionCrud() {
    const [data,setdata] = useState({
        user : [],
        username : "",
        userage1 : "",
        id: "",
        email : ""
    })
    
    const handleSubmit = async (e) => {
         e.preventDefault();
        if(data.id){
            let response = await axios.put(`https://6201fb9cb8735d00174cb687.mockapi.io/users/${data.id}`, 
            {
                username : data.username,
                userage1 : data.userage1,
                email : data.email, 
               });
               console.log(response.data);
               console.log(data.user)
               let index = data.user.findIndex(ele => ele.id === response.data.id);
               let user = [...data.user];
               user[index] = response.data;
               setdata({user,username:'',userage1:'',email:'',id:''})
               
        }else{
            var postres = await axios.post('https://6201fb9cb8735d00174cb687.mockapi.io/users',{
                username : data.username,
          userage1 : data.userage1,
          id: data.id,
          email : data.email,
            })
            console.log(postres.data)
            var user = [...data.user];
            user.push(postres.data);
            setdata({user,username:'',userage1:'',id:'',email:''})
        } 
    }
   useEffect(async () => {
let response = await axios.get('https://6201fb9cb8735d00174cb687.mockapi.io/users');
await setdata({user: response.data});
},[])
    const selectdata = (id) => {
          let selected = data.user.filter(ele => ele.id === id)[0];
          setdata({
            ...data,
            username : selected.username,
            userage1 : selected.userage1,
            id: selected.id,
            email : selected.email,
        })
    } 

    const deletedata = async (id) =>{
         await axios.delete(`https://6201fb9cb8735d00174cb687.mockapi.io/users/${id}`);
        var user = data.user.filter(ele => ele.id !== id);
        setdata({user})

      }
  
    return (
        <div>
           <h3>Crud Functional Form</h3>
           <form>
               <div>
                   <label>Username: </label>
                   <input type="text" value = {data.username} onChange={(e) =>setdata({...data,username: e.target.value})}></input>
               </div><br></br>
               <div>
                   <label>userage: </label>
                   <input type="text" value = {data.userage1} onChange={(e)=> setdata({...data,userage1: e.target.value})}></input>
               </div><br></br>
               <div>
                   <label>email: </label>
                   <input type="text" value = {data.email} onChange={(e)=> setdata({...data,email:e.target.value})}></input>
               </div><br></br>
               <div>
                   <button type="submit" onClick={(e)=> handleSubmit(e)}>Submit</button>&nbsp;&nbsp;
                   <button type="reset">Reset</button>
               </div>
           </form><br></br><br></br>
           <table border="1" cellspacing="5px" cellpadding="5px">
               <thead>
                   <tr>
                       <td>username</td>
                       <td>userage</td>
                       <td>email</td>
                       <td>id</td>
                       <td>action</td>
                   </tr>
               </thead>
               <tbody>
                   {
                       data.user.map((ele)=>{
                        return <tr>
                            <td>{ele.username}</td>
                            <td>{ele.userage1}</td>
                            <td>{ele.email}</td>
                            <td>{ele.id}</td>
                            <td><button onClick={() => selectdata(ele.id)}>Edit</button>&nbsp;&nbsp;
                            <button onClick={() => deletedata(ele.id)}>Delete</button>
                            </td>
                        </tr>
                       }
                       )
                   }
               </tbody>
           </table>
        </div>
    );
}

export default FunctionCrud;