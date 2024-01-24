// useAddNewUser.ts
import { useMutation, useQueryClient } from 'react-query';
import { ref, push, update } from 'firebase/database';
import { database } from '@/firebaseConfig';

interface User {
  title: string;
  subtitle: string;
  // Add other properties as needed
}
// for update 
const addNewUser = async (newUserData: User) => {
  const usersRef = ref(database, 'user');
  const newUserRef = push(usersRef);

  // Use update method to set data for a new user
  await update(newUserRef, newUserData);

  return { id: newUserRef.key, ...newUserData };
};

const useAddNewUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, User>(
    (newUserData) => addNewUser(newUserData),
    {
      onSuccess: () => {
        // Invalidate and refetch the user query when a new user is added
        queryClient.invalidateQueries('user');
      },
    }
  );
};

export default useAddNewUser;
