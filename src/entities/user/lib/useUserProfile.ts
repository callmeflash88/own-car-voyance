"use client";
import { useAppSelector } from "@/shared/lib/hooks";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../model/userSlice";
import { useGetUserQuery } from "../api/userApi";
import { calculateProfileCompletion } from "@/shared/lib/calculateProfileCompletion";

export const useUserProfile = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);

  const { data, isLoading, isError, refetch } = useGetUserQuery(undefined, {
    skip: !!user, // не делать запрос, если юзер уже в store
  });

  useEffect(() => {
    if (data) dispatch(setUser(data));
  }, [data]);

  return {
    user,
    isLoading,
    isError,
    refetch,
    profileCompletion: calculateProfileCompletion(user),
  };
};
