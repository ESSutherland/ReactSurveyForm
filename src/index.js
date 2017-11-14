import React from 'react';
import ReactDOM from 'react-dom';

class Form extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      options:[
        {id: 0, choice: "---Select Time---", show: true, currentSelect: ""},
        {id: 1, choice: "1. Best time", show: true, currentSelect: ""},
        {id: 2, choice: "2. Next Best time", show: true, currentSelect: ""},
        {id: 3, choice: "3. Not as good", show: true, currentSelect: ""},
        {id: 4, choice: "4. Worst time", show: true, currentSelect: ""},
      ]
    };
  }

  handleChange(e){
    var val = e.target.value;
      if(val > 0){
        var updateChoices = this.state.options.slice();
        for(var i = 0; i < updateChoices.length; i++){
          if(updateChoices[i].currentSelect == e.target.id){
            updateChoices[i].show = true;
            updateChoices[i].currentSelect = "";
          }
        }
        updateChoices[val].show = false;
        updateChoices[val].currentSelect = e.target.id;
        this.setState({options: updateChoices})
      }
      else{
        var updateChoices = this.state.options.slice();
        for(var i = 0; i < updateChoices.length; i++){
          if(updateChoices[i].currentSelect == e.target.id){
            updateChoices[i].show = true;
            updateChoices[i].currentSelect = "";
          }
        }
        this.setState({options: updateChoices})
      }
  }

  findSelected(elementId){
    for(var i = 0; i < this.state.options.length; i++){
      if(this.state.options[i].currentSelect == elementId){
        return i;
      }
    }
    return -1;
  }

  createSelect(i){
    var elementId = "option" + i;
    var selected = "";
    var number = this.findSelected(elementId);
    const listChoices = this.state.options.map(function(choice){
    if(choice.show){
        return <option value={choice.id}>{choice.choice}</option>
    }
    if(choice.id == number){
      return <option value={choice.id} selected="selected">{choice.choice}</option>
    }
  }
  );
    return(
      <select id={elementId} onChange={(e) => this.handleChange(e)}>
      {listChoices}
      </select>
    );
  }

  resetSelects(){
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
