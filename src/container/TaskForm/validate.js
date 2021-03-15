const validate = (values) => {
  const errors = {};
  const { title } = values;
  if (!title) {
    errors.title = 'Please enter a title';
  } else if (title.trim() && title.length < 5) {
    errors.title = 'Title must be more than 5 characters';
  }
  return errors;
};

export default validate;
