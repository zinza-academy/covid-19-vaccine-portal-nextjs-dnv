'use client';

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { UserInfoType, setIsLoggedIn } from '../lib/features/user/userSlice';

const callAPI = async () => {
  try {
    const res = await fetch(`api/users/1`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

type GetUserInfoResponseType = {
  message: string;
  userInfo: {
    email: string;
  };
};

export default function UserPage() {
  const [isLoading, setIsLoading] = useState(false);

  const { userInfo } = useAppSelector((state) => {
    return state.user;
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    // fake loading time
    setTimeout(() => {
      callAPI().then((result) => {
        const { userInfo } = result as GetUserInfoResponseType;
        dispatch(setIsLoggedIn(userInfo));
      });

      setIsLoading(false);
    }, 3000);
    return () => {};
  }, []);
  return (
    <div>
      <h1>UserPage</h1>
      {isLoading ? <h2>Loading...</h2> : <h3>Email: {userInfo.email}</h3>}
    </div>
  );
}
