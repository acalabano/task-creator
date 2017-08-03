'use strict'
import React from 'react'
import { Link, browserHistory } from 'react-router'
import { connect } from 'react-redux'
import {Grid, Row, Col, Clearfix, Image} from 'react-bootstrap'
import {createTask, removeTask, updateTask, getTasks} from '../reducers/task'
import reducer from '../reducers/'
import firebase from 'APP/fire'

class AllTasks extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      currentUserId: '',
      currentUsername: '',
    }

    this.onTaskSubmit=this.onTaskSubmit.bind(this)
    this.removeTaskCallback=this.removeTaskCallback.bind(this)
    this.onUpdateTaskSubmit=this.onUpdateTaskSubmit.bind(this)
    this.onResetTasks=this.onResetTasks.bind(this)
  }

  componentDidMount() {
    this.props.loadTasks()
  }

  onTaskSubmit(event) {
    event.preventDefault()
    console.log('EVENT TARGETSSSS', event.target)
    let taskInfo = {
      content: event.target.content.value,
      done: false,
      taskFrequency: event.target.taskFrequency.value
    }
    this.props.addATask(taskInfo.content, taskInfo.done, taskInfo.taskFrequency)
  }

  removeTaskCallback(index) {
    const removeATask = this.props.removeATask
    removeATask(index)
  }

  onUpdateTaskSubmit(idx) {
    this.props.updateATask(idx, !this.props.tasks.get(idx).taskDone)
  }

  onResetTasks(frequencyString) {
    this.props.tasks.filter((task) => task.taskFrequency === frequencyString && task.taskDone === true).forEach(task => {
      const taskIndex= this.props.tasks.indexOf(task)
      this.props.updateATask(taskIndex, false)
    })
  }
  render() {
    return (
      <div>
        <div className="row">
        <div className="col-lg-4">
          <form onSubmit={this.onTaskSubmit}>
          <div className="form-group">
            <input className="form-control" type="text" id="content"></input>
          </div>
          <select id="taskFrequency">
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
          </select>
            <button className="btn btn-default" type="submit">Add Task</button>
          </form>
        </div>
        </div>
        <br></br>
        <h2>Daily Tasks</h2>
        <button className="btn btn-warning" onClick={() => this.onResetTasks('daily')}>Reset my Dailies</button>
          <div className="container-fluid">
             <div className="row">
               <div className="col-lg-6">
               <h3>Incomplete tasks</h3>
               <div>
               {
                 this.props.tasks.filter((task) => task.taskFrequency === 'daily' && task.taskDone === false).map(task => {
                   let taskIndex= this.props.tasks.indexOf(task)
                   return (
                     <div key={taskIndex}><label><input className="task-item" type="checkbox" onChange={() => this.onUpdateTaskSubmit(taskIndex)}/>{task.taskContent} <button className="btn-danger" onClick={() => this.removeTaskCallback(taskIndex)}>X</button></label></div>
                   )
                 })
               }
              </div>
             </div>
             <div className="col-lg-6">
             <h3>Done!</h3>
             {
               this.props.tasks.filter((task) => task.taskFrequency === 'daily' && task.taskDone === true).map(task => {
                 let taskIndex= this.props.tasks.indexOf(task)
                 return (
                   <div key={taskIndex}><input className="task-item" type="checkbox" checked={true} onChange={() => this.onUpdateTaskSubmit(taskIndex)}/>{task.taskContent} <button className="btn-danger" onClick={() => this.removeTaskCallback(taskIndex)}>X</button></div>
                 )
               })
             }
              </div>
            </div>
           </div>
       <h2>Weekly Tasks</h2>
       <button className="btn btn-warning" onClick={() => this.onResetTasks('weekly')}>Reset my Weeklies</button>
         <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6">
              <h3>Incomplete tasks</h3>
              {
                this.props.tasks.filter((task) => task.taskFrequency === 'weekly' && task.taskDone === false).map(task => {
                  let taskIndex= this.props.tasks.indexOf(task)
                  return (
                    <div key={taskIndex}><label><input className="task-item" type="checkbox" onChange={() => this.onUpdateTaskSubmit(taskIndex)}/>{task.taskContent} <button className="btn-danger" onClick={() => this.removeTaskCallback(taskIndex)}>X</button></label></div>
                  )
                })
              }
            </div>
            <div className="col-lg-6">
            <h3>Done!</h3>
            {
              this.props.tasks.filter((task) => task.taskFrequency === 'weekly' && task.taskDone === true).map(task => {
                let taskIndex= this.props.tasks.indexOf(task)
                return (
                  <div key={taskIndex}><input className="task-item" type="checkbox" checked={true} onChange={() => this.onUpdateTaskSubmit(taskIndex)}/>{task.taskContent} <button className="btn-danger" onClick={() => this.removeTaskCallback(taskIndex)}>X</button></div>
                )
              })
            }
             </div>
           </div>
          </div>
      <h2>One-Time Tasks</h2>
        <div className="container-fluid">
           <div className="row">
             <div className="col-lg-6">
             <h3>Incomplete tasks</h3>
             {
               this.props.tasks.filter((task) => task.taskFrequency === 'once').map(task => {
                 let taskIndex= this.props.tasks.indexOf(task)
                 return (
                   <div key={taskIndex}><label>{task.taskContent} <button className="btn-danger" onClick={() => this.removeTaskCallback(taskIndex)}>X</button></label></div>
                 )
               })
             }
           </div>
          </div>
         </div>
      </div>
    )
  }
}

// -- // -- // Container // -- // -- //

const mapState = ({task}) => ({
  tasks: task.tasks
})

const mapDispatch = dispatch => ({
  addATask: (taskContent, taskDone, taskFrequency) => {
    dispatch(createTask(taskContent, taskDone, taskFrequency))
  },
  removeATask: (taskId) => {
    dispatch(removeTask(taskId))
  },
  updateATask: (taskId, taskDone) => {
    dispatch(updateTask(taskId, taskDone))
  },
  loadTasks: () => {
    dispatch(getTasks())
  }
})

export default connect(mapState, mapDispatch)(AllTasks)
