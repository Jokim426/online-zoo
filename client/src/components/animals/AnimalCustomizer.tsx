import React, { useState, useRef } from 'react';
import axios from 'axios';

const AnimalCustomizer = () => {
  const [formData, setFormData] = useState({
    name: '',
    species: 'dog',
    color: '#ff0000',
    size: 'medium',
    pattern: 'solid',
    accessories: [],
    bio: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updatedAccessories = checked
        ? [...formData.accessories, value]
        : formData.accessories.filter(item => item !== value);
      setFormData({ ...formData, accessories: updatedAccessories });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!image) return null;
    
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'your_upload_preset');
    data.append('cloud_name', 'your_cloud_name');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
        data
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage();
    
    const animalData = {
      ...formData,
      imageUrl: imageUrl || ''
    };

    console.log('Submitted:', animalData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="animal-customizer">
      <h1>Customize Your Animal</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Species:</label>
          <select
            name="species"
            value={formData.species}
            onChange={handleChange}
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="rabbit">Rabbit</option>
            <option value="bird">Bird</option>
          </select>
        </div>

        <div className="form-group">
          <label>Color:</label>
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Size:</label>
          <div className="radio-group">
            {['small', 'medium', 'large'].map(size => (
              <label key={size}>
                <input
                  type="radio"
                  name="size"
                  value={size}
                  checked={formData.size === size}
                  onChange={handleChange}
                />
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Pattern:</label>
          <select
            name="pattern"
            value={formData.pattern}
            onChange={handleChange}
          >
            <option value="solid">Solid</option>
            <option value="striped">Striped</option>
            <option value="spotted">Spotted</option>
            <option value="patchy">Patchy</option>
          </select>
        </div>

        <div className="form-group">
          <label>Accessories:</label>
          <div className="checkbox-group">
            {['collar', 'hat', 'glasses', 'scarf'].map(accessory => (
              <label key={accessory}>
                <input
                  type="checkbox"
                  value={accessory}
                  checked={formData.accessories.includes(accessory)}
                  onChange={handleChange}
                />
                {accessory.charAt(0).toUpperCase() + accessory.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>

        <button type="submit">Create Animal</button>
      </form>
    </div>
  );
};

export default AnimalCustomizer;