import { ITodoSliceState } from '@/lib/features/counter/todoSlice';

export interface FITodoSliceState extends Omit<ITodoSliceState, 'status'> {
  status : ITodoSliceState['status'] | 'all'
}