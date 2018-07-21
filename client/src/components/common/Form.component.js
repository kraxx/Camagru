import React, { Component } from 'react';
import '../../../public/css/form.css';

class FormInput extends Component {

  constructor(props) {
    super(props)
    switch(props.field.type) {
      case 'select':
        this.state = {
          role: props.field.selected
        };
      case 'checkbox':
        this.state = {
          checked: props.field.checked
        }
      default:
        return;
    }
  }

  render() {
    const { field } = this.props;
    return (
      <div className='camagruFormField' >
        <label htmlFor={field.label}>{field.name}: </label>
        {(() => {switch(field.type) {
          case 'text':
          case 'textBox':
          case 'password':
            return <input name={field.label} type={field.type} placeholder={field.placeholder || field.name} />
          
          case 'select':
            return (
              <select name={field.label} value={this.state.role} onChange={e => this.setState({ role: e.target.value })}>
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.name}</option>
                ))}
              </select>
            )
          
          case 'checkbox':
            return <input name={field.label} type={field.type} checked={this.state.checked} onChange={e => this.setState({ checked: !this.state.checked })} />

          default:
            return <div/>
        }})()}
      </div>
    )
  }
}

export const Form = ({ title, handleSubmit, fields, submitBtn, otherBtns }) => (
  <div className='camagruFormContainer'>
    <form className='camagruForm' onSubmit={e => handleSubmit(e)}>
      {title &&
        <div className='camagruFormTitle'>
          <p>{title}</p>
          <hr/>
        </div>
      }
      {fields && fields.map(field =>
        <FormInput key={field.label} field={field} />
      )}
      <input className='camagruFormButton' type='submit' value={submitBtn} />
      {otherBtns && otherBtns.map(button =>
        <button key={button.name} className='camagruFormButton' name={button.name} onClick={() => button.handler()}>{button.name}</button>
      )}
    </form>
  </div>
)