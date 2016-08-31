import React from 'react';
import Lanes from '../components/Lanes';
import {connect} from 'react-redux';
import {addLane} from '../actions';

class App extends React.Component {

  render() {
    const {lanes} = this.props;

    return (
      <div>
        <button onClick={this.props.addLane} className='add-note'>New Lane</button>
        <Lanes lanes={lanes}/>
      </div>
    );
  }

  deleteNote = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();
    this.props.deleteNote(id);
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    addLane() {
      dispatch(addLane());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
