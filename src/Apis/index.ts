import axios from 'axios';
import { Task,FilteredTasks } from '@/Interfaces/TaskInterface ';
const baseUrl: string = process.env.NEXT_PUBLIC_API_BASE_PATH || ''; 




export const apis = {
  addCategory: async (categoryName: string) => {
    const result= await axios.post(`${baseUrl}/Category`, { categoryName });
    return result;
  },

  getALLCategories: async () => {
    const result= await axios.get(`${baseUrl}/Categories`);
    return result;
  },
  addTask: async (task: Task) => {
    const result = await axios.post(`${baseUrl}/AddAssignment`, task);
    return result;
  },
  filterTask: async (filteredTasks: FilteredTasks) =>{
    const result = await axios.post(`${baseUrl}/Assignment/filter`, filteredTasks);
    return result;
  }
};


