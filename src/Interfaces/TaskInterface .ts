export interface TaskInterface {
    id: number;
    name: string;
    description?: string | null;
    priority: AssignmentPriority;
    createdAt: Date;
    startDate?: Date | null;
    dueDate?: Date | null;
    isCompleted: boolean;
    categoryId: number;
  }
  
  export enum AssignmentPriority {
    Low = 3,
    Medium = 2,
    High = 1,
  }
  
  export interface Task {
    name: string;
    description: string;
    priority: number;
    createdAt: string;
    startDate?: string | undefined;
    dueDate?: string | undefined;
    isCompleted: boolean;
    categoryId: number;
  }
  
  export interface FilteredTasks {
    Priority: number | null;
    Name: string | null;
    IsComplete: boolean | null;
  }