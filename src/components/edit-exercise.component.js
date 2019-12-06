import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditExercise extends Component {
    constructor(props) {
    super(props);

    this.state = {
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios
            .get(`http://localhost:5000/exercises/${this.props.match.params.id}`)
            .then(response => {
                const { username, description, duration, date } = response.data;

                this.setState({
                    username,
                    description,
                    duration,
                    date: new Date(date)
                })   

                axios
                    .get('http://localhost:5000/users/')
                    .then(response => {
                        this.setState({ users: response.data.map(user => user.username) });
                    })
                    .catch((error) => {
                        console.log(error);
                    })    
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const { username, description, duration, date } = this.state;

        const exercise = {
            username,
            description,
            duration,
            date,
        };

        console.log(exercise);

        axios
            .post(`http://localhost:5000/exercises/update/${this.props.match.params.id}`, exercise)
            .then(res => {
                console.log(res.data);
                window.location = '/';
            });
    }

    render() {
        return (
            <div>
                <h3>Редактировать журнал упражнения</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Имя пользователя: </label>
                        <select 
                            ref="userInput"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        >
                            {
                                this.state.users.map(user => {
                                    return <option key={user} value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group"> 
                        <label>Описание: </label>
                        <input  
                            type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Продолжительность (в минутах): </label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Дата: </label>
                        <div>
                            <DatePicker
                                locale="ru"
                                dateFormat="dd.MM.yyyy"
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
