import { useMutation } from '@tanstack/react-query';
import customFetch from '@/api/axios-customize';

export enum Role {
  Admin = 1,
  User = 2
}

export type RegisterData = {
  fullName: string;
  email: string;
  password: string;
  gender: string;
  citizenId: string;
  dateOfBirth: string;
  ward: number;
  role: number;
};

const registerUser = async (registerData: RegisterData) => {
  const response = await customFetch.post('/auth/sign-up', registerData);
  return response.data;
};

export const useRegisterUser = () => {
  const registerMutation = useMutation({
    mutationFn: registerUser
  });
  return registerMutation;
};
