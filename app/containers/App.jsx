import {addLane} from '../actions';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Lanes from '../components/Lanes';
import React from 'react';

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

export default compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(App);

