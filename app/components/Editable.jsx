import React from 'react';
import classnames from 'classnames';

export default ({editing, value, className, onEdit}) => {
  if (editing) {
    return <Edit
      className={className}
      value={value}
      onEdit={onEdit} />;
  }
  return <span className={classnames('value', className)}>{value}</span>;
}

class Edit extends React.Component {
  render () {
    return (
      <div>
        <input
          type="text"
          className={classnames('edit', this.props.className)}
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
