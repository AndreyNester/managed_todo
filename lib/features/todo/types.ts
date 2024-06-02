
export interface ITodoSliceState {
  id : number | string,
  title : string,
  email : string,
  description : string,
  status: 'completed' | 'in progress'
}

export interface IaddFTodoCredentials extends Omit<ITodoSliceState, 'status' | 'id'> {}
export interface IeditFTodoCredentials extends ITodoSliceState {}