import React from 'react';
import Note from './Note';
import Editable from './Editable';

export default ({notes,
  onNoteClick = () => {},
  onDelete = () => {},
  onEdit = () => {}}) => (
  <ul>
  {
    notes.map(({id, task, editing}) =>
      <li key={id}>
        <Note onClick={onNoteClick.bind(null, id)}>
          <Editable
            onEdit={onEdit.bind(null, id)}
            editing={editing}
            value={task}/>
          <button onClick={onDelete.bind(null, id)}>x</button>
        </Note>
      </li>
    )
  }
  </ul>
)
