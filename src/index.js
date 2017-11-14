import React from 'react';
import ReactDOM from 'react-dom';

class Form extends React.Component{                                              //create a new component called Form
  constructor(){
    super();
    this.state = {                                                               //set the state
      options:[                                                                  //create an array for the options
        {id: 0, choice: "---Select Time---", show: true, currentSelect: ""},     //create the first element of the array
        {id: 1, choice: "1. Best time", show: true, currentSelect: ""},          //create the second element of the array
        {id: 2, choice: "2. Next Best time", show: true, currentSelect: ""},     //create the third element of the array
        {id: 3, choice: "3. Not as good", show: true, currentSelect: ""},        //create the fourth element of the array
        {id: 4, choice: "4. Worst time", show: true, currentSelect: ""},         //create the fifth element of the array
      ]
    };
  }


  handleChange(e){                                                               //function to handle changes to the select
    var val = e.target.value;                                                    //set the variable val to the targeted element's value
      if(val > 0){                                                               //check if the value is greater than 0
        var updateChoices = this.state.options.slice();                          //copy the array from state to a local variable
        for(var i = 0; i < updateChoices.length; i++){                           //loop for the length of the array
          if(updateChoices[i].currentSelect == e.target.id){                     //check if the currentSelect of any element in the array is equal to the targeted element's id
            updateChoices[i].show = true;                                        //set the show of the selected element in the array to true
            updateChoices[i].currentSelect = "";                                 //set the currentSelect of the selected element to blank
          }
        }
        updateChoices[val].show = false;                                         //set the show of the selected element in the array to false
        updateChoices[val].currentSelect = e.target.id;                          //set the currentSelect of the selected element in the array to the targeted element's id
        this.setState({options: updateChoices})                                  //set the state to the updated array
      }
      else{                                                                      //else (if the value is not greater than 0)
        var updateChoices = this.state.options.slice();                          //copy the array from state to a local variable
        for(var i = 0; i < updateChoices.length; i++){                           //loop for the length of the array
          if(updateChoices[i].currentSelect == e.target.id){                     //check if the currentSelect of any element in the array is equal to the targeted element's id
            updateChoices[i].show = true;                                        //set the show of the selected element in the array to true
            updateChoices[i].currentSelect = "";                                 //set the currentSelect of the selected element to blank
          }
        }
        this.setState({options: updateChoices})                                  //set the state to the updated array
      }
  }

  findSelected(elementId){                                                       //function to find the selected value
    for(var i = 0; i < this.state.options.length; i++){                          //loop for the length of the array
      if(this.state.options[i].currentSelect == elementId){                      //checks if the currentSelect of the seleced element in the array is equal to an element's id
        return i;                                                                //returns the index of the selected element in the array
      }
    }
    return -1;                                                                   //returns -1
  }

  createSelect(i){                                                               //function to create the select drop down
    var elementId = "option" + i;                                                //concats the word option with the parameter passed in to create the id for the element
    var selected = "";                                                           //create a variable selected
    var number = this.findSelected(elementId);                                   //create a variable called number and call the findSelected function
    const listChoices = this.state.options.map(function(choice){                 //create a map of the array
    if(choice.show){                                                             //checks if the selected element in the array's show is true
        return <option value={choice.id}>{choice.choice}</option>                //returns an option element
    }
    if(choice.id == number){                                                     //checks if the element in the array's id is equal to the number variable
      return <option value={choice.id} selected="selected">{choice.choice}</option>//returns an option element with a selected property
    }
  }
  );
    return(
      <select id={elementId} onChange={(e) => this.handleChange(e)}>             //create a select element with an id and onClick
      {listChoices}                                                              //output the variable with the map of the array
      </select>
    );
  }

  resetSelects(){                                                                //function to reset the selects on the form
    var updateChoices = this.state.options.slice();
    for(var i = 0; i < updateChoices.length; i++){
      updateChoices[i].show = true;
      updateChoices[i].currentSelect = "";
      }
      this.setState({options: updateChoices})
  }

  render(){

    return(
      <div id='surveyForm'>
      <form name="form1" method="post" action="">
                <fieldset>
                    <p>
                        <label>
                            Email:
                            <input type="text" name="cust_email" id="cust_email"/>
                        </label>
                    </p>
                    <p>Please rate the following times from best (1) to worst (4)</p>
                    <p>
                        {this.createSelect(1)}
                        Monday/Wednesday 10:10 am-Noon
                    </p>
                    <p>
                        {this.createSelect(2)}
                        Tuesday 6:00 pm-9:00 pm
                    </p>
                    <p>
                        {this.createSelect(3)}
                        Wednesday 6:00 pm-9:00 pm
                    </p>
                    <p>
                        {this.createSelect(4)}
                        Tuesday/Thursday 10:10 am-Noon
                    </p>
                    <p>
                        <input type="submit" name="button" id="button" value="Submit"/>
                        <input type="button" name="button2" id="button2" value="Reset" onClick={this.resetSelects.bind(this)}/>
                    </p>
                </fieldset>
            </form>
            <p>&nbsp;</p>
      </div>
    );
  }
}
ReactDOM.render(<Form/>, document.getElementById('root'))
