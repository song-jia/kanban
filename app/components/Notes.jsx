import React from 'react';
import Note from './Note';
import Editable from './Editable';

export default ({notes,
  onNoteClick = () => {},
  onDelete = () => {},
  onEdit = () => {}}) => (
  <ul className='notes'>
  {
    notes.map(({id, task, editing}) =>
      <li key={id}>
        <Note className='note' onClick={onNoteClick.bind(null, id)}>
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
)
