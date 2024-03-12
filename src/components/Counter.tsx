'use client';
import {
  decrement,
  increment,
  incrementByAmount
} from '@/app/lib/features/counter/counterSlice';
import { useAppDispatch, useAppSelector } from '@/app/lib/hooks';
import { Button, Stack } from '@mui/material';

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  return (
    <div>
      <h2>{count}</h2>
      <Stack direction={'row'} gap={3}>
        <Button variant="contained" onClick={() => dispatch(increment())}>
          Increase
        </Button>
        <Button variant="contained" onClick={() => dispatch(decrement())}>
          Decrease
        </Button>
        <Button
          variant="contained"
          onClick={() => dispatch(incrementByAmount(10))}>
          increment By 10
        </Button>
      </Stack>
    </div>
  );
}
