import React from "react";
import AuthPoint from "./AuthPoint";
import { Navigate } from "react-router-dom";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password:"",
            loggedon: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.login = this.login.bind(this);
        this.checkLogState = this.checkLogState.bind(this);
    }
    handleInput(e){
        let elmId = e.currentTarget.id;
        if(elmId === "userInput"){
            this.setState({username: e.currentTarget.value})
        }
        if(elmId === "passInput"){
            this.setState({password: e.currentTarget.value})
        }
    }
    login(){
        fetch("/api/login", { method: "POST", headers: {
            'Content-Type': 'application/json',
            }, body: JSON.stringify({username: this.state.username, password: this.state.password}) })
            .then(res => res.text())
            .then(obj => {
                console.log(obj)
                if(obj === "Approved"){this.setState({loggedon: true})}
            })

    }
    componentDidMount(){
                 
    }
    checkLogState(){
        return(<AuthPoint successRedirect={"/profile"} failRedirect={false}/>); 

    }
    render(){
        return(
            <div className="Login">
                <p>Yipee!</p>
                  <input type="text" placeholder="Username" id="userInput" onChange={this.handleInput} required/>
                  <input type="text" placeholder="Password" id="passInput"onChange={this.handleInput} required/>
                  <button onClick={this.login}>Login</button>
                  {this.checkLogState()}
                
            </div>
        )
    }
}
export default Login;
