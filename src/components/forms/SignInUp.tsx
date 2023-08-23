import React, { useState } from 'react';
import axios from 'axios';


//  const clientAPI = () => {
//     const instance = axios.create({
//         baseUrl: 'http://localhost:3001'

//     })

// }

export const SignInForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const requestBody = {
      username: username, // Replace with the actual username
      password: password// Replace with the actual password
    };
  
    try {
      const response = await axios.post('http://localhost:3001/signup', requestBody);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign In</button>
    </form>
  );
};


