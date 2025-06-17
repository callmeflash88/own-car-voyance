import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

// Хук useAppDispatch будет знать тип dispatch из твоего стора
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Хук useAppSelector будет "знать" структуру всего состояния Redux
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
