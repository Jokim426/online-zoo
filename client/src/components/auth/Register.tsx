import { useState } from 'react';

const ANIMALS = ['Dog', 'Cat', 'Bird', 'Fish', 'Other'];
const API_URL = 'https://api.example.com/register';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    animal: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const validateAnimal = (animal) => {
    if (!animal) return 'Please select an animal';
    return '';
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      animal: validateAnimal(formData.animal)
    };

    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value)
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(API_URL, formData);
      if (response.status === 201) {
        setRegistrationSuccess(true);
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, api: 'Registration failed. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInput = (name, type, label) => (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={errors[name] ? 'error-input' : ''}
      />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );

  if (registrationSuccess) {
    return (
      <div className="success-message">
        <h2>Registration Successful!</h2>
        <p>Thank you for registering.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Register</h2>
      {errors.api && <div className="error">{errors.api}</div>}
      
      {renderInput('email', 'email', 'Email')}
      {renderInput('password', 'password', 'Password')}

      <div className="form-group">
        <label htmlFor="animal">Favorite Animal</label>
        <select
          id="animal"
          name="animal"
          value={formData.animal}
          onChange={handleChange}
          className={errors.animal ? 'error-input' : ''}
        >
          <option value="">Select an animal</option>
          {ANIMALS.map(animal => (
            <option key={animal} value={animal}>{animal}</option>
          ))}
        </select>
        {errors.animal && <span className="error">{errors.animal}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegistrationForm;