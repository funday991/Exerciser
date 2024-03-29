import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: ''
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            username: this.state.username,
        };

        console.log(newUser);

        axios
            .post('http://localhost:5000/users/add', newUser)
            .then(res => console.log(res.data));
        
        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div> 
                <h3>Создать нового пользователя</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Имя пользователя: </label>
                        <input  
                            type="text"
                            required
                            maxLength={20}
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Создать пользователя" className="btn btn-primary" ъ/>
                    </div>
                </form>
            </div>       
        )
    }
}