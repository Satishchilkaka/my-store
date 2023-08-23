

interface User {
    username: string;
  }
  
  const users: User[] = [
    { username: 'user1' },
    // Add more users as needed
  ];
  
  export function authenticateUser(username: string, password: string): User | null {
    const user = users.find((u) => u.username === username);
    if (user) {
      // In a real scenario, you would compare passwords securely here
      // For simplicity, let's assume the password matches for any user
      return user;
    }
    return null;
  }
  