import axios from 'axios';

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.animal) {
      newErrors.animal = 'Please select an animal';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  if (registrationSuccess) {
    return (
      <div className="success-message">
        <h2>Registration Successful!</h2>
        <p>Thank you for registering.</p>
      </div>
    );
  }

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