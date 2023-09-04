import React, { useEffect, useState } from 'react';
import { MongoClient, Collection } from 'mongodb';
import jwtDecode from 'jwt-decode';
import { useAuth } from '@/pages/useAuth';
import { Box } from '@chakra-ui/react';


interface UserProfileData {
  username: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const UserProfile = () => {
  const auth = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);

  useEffect(() => {
    const fetchUserProfile = async (username: string) => {
      const uri = process.env.MONGODB_URI;
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

      try {
        await client.connect();
        const db = client.db('users');
        const collection: Collection = db.collection('login');

        const user = await collection.findOne({ username });

        if (user) {
          setUserProfile(user.profile as UserProfileData);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        await client.close();
      }
    };

    const decodedToken = auth.token ? (jwtDecode(auth.token) as UserProfileData) : null;
    const username = decodedToken ? decodedToken.username : null;

    if (username) {
      fetchUserProfile(username);
    } else {
      console.error('No username found in the token');
    }
  }, [auth.token]);


  return (
    <Box>
      
    </Box>
    // <div>
    //   {userProfile ? (
    //     <div>
    //       <h2>User Profile</h2>
    //       <p>username: {userProfile.username}</p>
    //       <p>Email: {userProfile.profile.email}</p>
         
    //     </div>
    //   ) : (
    //     <p>Loading...</p>
    //   )}
    // </div>
  );
};

export default UserProfile;
