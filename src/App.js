import React, { Component } from "react";
import NavBar from "./components/navbar";
import { Container, Row, Col, Button, Table } from "reactstrap";
import InputModal from "./components/inputModal";
import "./styles/app.css";


class App extends Component {
  state = {
    Todos: [
      //Setting default dummy data
      { id: 1, name: "Develop" },
      { id: 2, name: "Code" }
    ],
    inputs: [
      //Setting the inputs for the modal
      {
        name: "name",
        title: "TODO Name",
        type: "text",
        placeholder: "Name of TODO here"
      }, 
    ],
   
    modalTitle: "Add a new TODO List",
    editItem: {},
  };

  editTodo = sentValues => {
    let { Todos } = this.state;
    //let TodolistName;
    Todos = Todos.map(Todo => {
      sentValues.inputValues.map(input => {
        if (Todo.id === this.state.editID && input.inputValue !== "") {
          //Checks if input is a select input, if yes search for input name
          if (input.inputType === "select-one") {
            //let categories;
            //Get all the categories
           // categories = this.state.inputs.filter(
           //   Todolist => Todolist.type === "select"
            //);
            //Search for input that has the same value and get it's name
          } else {
            //Else give direct value
            Todo[input.inputName] = input.inputValue;
          }
        }
        return Todo;
      });
      return Todo;
    });
    this.setState({ Todos });
    this.setState({ editOpen: false });
    this.toggleModal();
  };

  //On adding a new Todo
  addTodo = sentValues => {
    let newTodo = {};
   // let TodolistName;
    newTodo = sentValues.inputValues.map(input => {
      //Checks if input is a select input, if yes search for input name
      if (input.inputType === "select-one") {
       
      } else {
        
        newTodo[input.inputName] = input.inputValue;
      }
      return newTodo;
    });

    newTodo = newTodo[0]; //Get rid of multiple returned objects by mapping
    newTodo["id"] = this.state.Todos.length + 1; //Update the ID
    this.setState(previousState => ({
      //Update the state
      Todos: [...previousState.Todos, newTodo]
    }));
  };

  //Handle delete event (filters items)
  handleDelete = event => {
    const id = parseInt(event.target.value);
    const Todos = this.state.Todos.filter(Todo => Todo.id !== id);
    this.setState({ Todos });
  };

  //Handle on click event
  handleEdit = event => {
    const id = parseInt(event.target.value);
    let Todo = this.state.Todos.filter(Todo => Todo.id === id);
    Todo = Todo[0];
    this.setState({ editItem: Todo, editOpen: true });
    this.setState({ editID: id });
    this.toggleModal();
  };

  //Toggles the modal
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />

        <Container>
          <Row>
            <Col className="main-col">
              <h1 className="text-center page-title">TO DO LIST</h1>
              <Row>
                <Col>
                  <Button
                    className="customAddButton"
                    onClick={this.toggleModal}
                    color="success"
                  >
                    Add
                  </Button>
                  <InputModal
                    modalOpen={this.state.modalOpen}
                    toggle={this.toggleModal}
                    inputs={this.state.inputs}
                    title={this.state.modalTitle}
                    onSubmit={event => this.addTodo(event)}
                    editItem={this.state.editItem}
                    editOpen={this.state.editOpen}
                    editID={this.state.editID}
                    onEdit={event => this.editTodo(event)}
                  />
                  <hr />
                  <Row>
                    <Col>
                      <Table>
                        <thead>
                          <tr>
                            <th>TO DO LIST ITEMS</th>                            
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.Todos.map(Todo => (
                            <tr>                              
                              <td>{Todo.name}</td>                              
                              <td>
                                <Button
                                  className="customEditButton"
                                  color="info"
                                  value={Todo.id}
                                  onClick={evt => this.handleEdit(evt)}
                                >
                                  Edit
                                </Button>{" "}
                                <Button
                                  onClick={evt => this.handleDelete(evt)}
                                  className="customDeleteButton"
                                  color="danger"
                                  value={Todo.id}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
