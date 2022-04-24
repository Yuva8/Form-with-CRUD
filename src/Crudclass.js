import { Button } from '@mui/material';
import axios from 'axios';
import React, { Component } from 'react';

export default class Crudclass extends Component {
    constructor(){
        super();
      this.state = {
          user : [],
          username : "",
          userage1 : "",
          id: "",
          email : ""
      };
    }
   async componentDidMount(){
      let res =  await axios.get('https://6201fb9cb8735d00174cb687.mockapi.io/users');
      await this.setState({user: res.data})
    
    }
    render() {
        const handleSubmit = async(e) =>{
            e.preventDefault();
            if(this.state.id){
           var response = await axios.put(`https://6201fb9cb8735d00174cb687.mockapi.io/users/${this.state.id}`,
           {
            username : this.state.username,
            userage1 : this.state.userage1,
            email : this.state.email, 
           })
           console.log(response.data)
           console.log(this.state.user)
           var index = this.state.user.findIndex(ele => ele.id === response.data.id);
           var user = [...this.state.user];
           user[index] = response.data;
           this.setState({user,username:'',userage1:'',email:'',id:''})

            }else{
                var postres = await axios.post('https://6201fb9cb8735d00174cb687.mockapi.io/users',{
                    username : this.state.username,
              userage1 : this.state.userage1,
              id: this.state.id,
              email : this.state.email,
                })
                console.log(postres.data)
                var user = [...this.state.user];
                user.push(postres.data);
                this.setState({user,username:'',userage1:'',id:'',email:''})
            } 
        }
        const selectdata = (id) => {
                    
                    const selected = this.state.user.filter(ele => ele.id === id)[0];
                    console.log(selected);
                    this.setState({
                        username : selected.username,
                        userage1 : selected.userage1,
                        id: selected.id,
                        email : selected.email,
                    })
        }
        const deletedata = async (id) =>{
          var response = await axios.delete(`https://6201fb9cb8735d00174cb687.mockapi.io/users/${id}`);
          var user = this.state.user.filter(ele => ele.id !== id);
          this.setState({user})

        }
        return (
            <div>
                <h3>CrudComponent</h3>
                <h3>userform</h3>
                <form onSubmit={(e)=>{handleSubmit(e)}}>
                  <div>
                        <label>User Name :</label> 
                        <input type="text" value = {this.state.username} onChange={(e)=> this.setState({username: e.target.value})}></input>
                    </div><br></br>
                    <div>
                        <label>userage1 :</label> 
                        <input type="text" value = {this.state.userage1} onChange={(e)=> this.setState({userage1: e.target.value})}></input>
                    </div><br></br>
                    <div>
                        <label>id :</label> 
                        <input type="text" value = {this.state.id} onChange={(e)=> this.setState({id: e.target.value})}></input>
                    </div><br></br>
                    <div>
                        <label>email :</label> 
                        <input type="text" value = {this.state.email} onChange={(e)=> this.setState({email: e.target.value})}></input>
                    </div><br></br>
                    <div>
                        <button type="submit">submit</button>&nbsp;&nbsp;
                        <button type="button">reset</button>
                    </div><br></br>
                </form>
                <table border="1" cellspacing="5px" cellpadding="5px" >
                    <thead>
                        <tr>
                            <td>username</td>
                            <td>userage1</td>
                            <td>id</td>
                            <td>email</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.user.map((ele) => {
                       return   <tr>
                          <td>{ele.username}</td>
                          <td>{ele.userage1}</td>
                          <td>{ele.id}</td>
                          <td>{ele.email}</td>
                          <td><button onClick={() => selectdata(ele.id)}>Edit</button>&nbsp;
                          <button onClick={() => deletedata(ele.id)}>Delete</button>&nbsp;</td>
                      </tr>
                        }
                           
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

