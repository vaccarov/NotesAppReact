import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  renderField(field){
    const { meta: {touched,error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className='form-control'
          type='text'
          {...field.input}
        />
        {touched ? error : ''}
      </div>
    );
  }
  onSubmit(values){
    this.props.createPost(values,() => {
      this.props.history.push('/');
    });
  }
  render(){
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label='Titre'
          name='title'
          component={this.renderField}
        />
        <Field
          label='Categories'
          name='categories'
          component={this.renderField}
        />
        <Field
          label='Content'
          name='content'
          component={this.renderField}
        />
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    );
  }
}

function validate(values){
    const errors = {};

    if (!values.title) {
      errors.title = "Enter a title";
    }
    if (!values.categories) {
      errors.categories = "Enter a categories";
    }
    if (!values.content) {
      errors.content = "Enter a content";
    }

    return errors;
}

export default reduxForm({
  validate,
  form:'PostsNewForm'
})(connect(null,{ createPost })(PostsNew));
