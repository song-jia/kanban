import React from 'react';
import Note from './Note';
import Editable from './Editable';

const Notes = ({notes = [],
  onNoteClick = () => {},
  onDelete = () => {},
  onEdit = () => {},
  onMove = () => {}}) => (
  <ul className='notes'>
  {
    notes.map(({id, task, editing}) =>
      <li key={id}>
        <Note
          id={id}
          className='note'
          onClick={onNoteClick.bind(null, id)}
          onMove={onMove}
          editing={editing}>
          <Editable
            className='editable'
            onEdit={onEdit.bind(null, id)}
            editing={editing}
            value={task}/>
          <button
            className='delete'
            onClick={onDelete.bind(null, id)}>x</button>
        </Note>
      </li>
    )
  }
  </ul>
);

Notes.propTypes = {
  notes: React.PropTypes.array,
  onNoteClick: React.PropTypes.func,
  onDelete: React.PropTypes.func,
  onEdit: React.PropTypes.func
};


export default Notes;
