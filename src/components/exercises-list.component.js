import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10).split('-').reverse().join('.')}</td>
        <td>
            <Link to={`/edit/${props.exercise._id}`}>редактировать</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>удалить</a>
        </td>
    </tr>
);

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.state = {exercises: []};
        this.deleteExercise = this.deleteExercise.bind(this);
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data });
            })
            .catch(error => {
                console.log(error);
            })
    }      

    deleteExercise(id) {
        axios
            .delete(`http://localhost:5000/exercises/${id}`)
            .then(res => console.log(res.data));
            
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise 
                exercise={currentExercise} 
                deleteExercise={this.deleteExercise} 
                key={currentExercise._id}
            />;
        })
    }
      
    render() {
        return (
            <div>
                <h3>Журналы упражнений</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Имя пользователя</th>
                            <th>Описание</th>
                            <th>Длительность</th>
                            <th>Дата</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
