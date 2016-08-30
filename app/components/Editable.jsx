import React from 'react';

export default ({editing, value, onEdit}) => {
  if (editing) {
    return <Edit
      value={value}
      onEdit={onEdit} />;
  }
  return <span>{value}</span>;
}

class Edit extends React.Component {
  render () {
    return (
      <div>
        <input
          type="text"
          autoFocus={true}
          defaultValue={this.props.value}
          onBlur={this.finishEdit}
          onKeyPress={this.checkEnter}/>
      </div>
    );
  }

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit = (e) => {
    const value = e.target.value;
    if (this.props.onEdit) {
      this.props.onEdit(value);
    }
  }
}
