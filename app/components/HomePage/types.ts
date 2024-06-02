import { ITodoSliceState } from '@/lib/features/counter/types';

export interface FITodoSliceState extends Omit<ITodoSliceState, 'status'> {
  status : ITodoSliceState['status'] | 'all'
}