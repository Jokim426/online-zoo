import React, { useState, useEffect } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
    bio: 'Animal lover and outdoor enthusiast',
  });

  const [animal, setAnimal] = useState({
    name: 'Max',
    type: 'Dog',
    breed: 'Golden Retriever',
    age: 5,
  });

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <div className="user-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
      </div>

      <h2>Pet Details</h2>
      <div className="animal-details">
        <p><strong>Name:</strong> {animal.name}</p>
        <p><strong>Type:</strong> {animal.type}</p>
        <p><strong>Breed:</strong> {animal.breed}</p>
        <p><strong>Age:</strong> {animal.age}</p>
      </div>
    </div>
  );
};

export default UserProfile;