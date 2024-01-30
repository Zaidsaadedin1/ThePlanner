import axios from 'axios';
import {AssignedUser, User} from "@/Interfaces/UserInterface";
import { AddTask,FilteredTasks, TaskSearchValue, TaskModel, UpdateTask } from '@/Interfaces/TaskInterface ';
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
  addTask: async (task: AddTask) => {
    const result = await axios.post(`${baseUrl}/AddAssignment`, task);
    return result;
  },
  updateTask: async (task: UpdateTask, id: number) => {
    const result = await axios.put(`${baseUrl}/Assignment?id=${id}`, task)
    return result;
  },
  filterTask: async (filteredTasks: FilteredTasks) =>{
    const result = await axios.post(`${baseUrl}/Assignment/filter`, filteredTasks);
    return result;
  },
  getAllTasks: async () =>{
    const result = await axios.get(`${baseUrl}/Assignments`);
    return result;
  },
   deleteTask: async (id:number) => {
    const result = await axios.delete(`${baseUrl}/Assignment`, {
      params: { id: id }
    });
    const data = result.data;
    return data;
  },
  deleteCategory: async (categoryId:number) => {
    const result = await axios.delete(`${baseUrl}/Category`, {
      params: { categoryId: categoryId }
    });
    const data = result.data;
    return data;
  },
  searchTasks: async (value: TaskSearchValue) =>{
    const result = await axios.post(`${baseUrl}/Assignments/Search`, value);
    const searchData = result.data; 
    return searchData;
  },
  addNewUser: async (user:User) =>{
    const result = await axios.post(`${baseUrl}/Users`, user);
    const Message = result.data; 
    return Message;
  },
  getAllUsers: async () =>{
    const result = await axios.get(`${baseUrl}/Users`);
    return result;
  },
  getAllUsersAssignedToTask: async (id:number) => {
    const result = await axios.get(`${baseUrl}/GetAllUsersAssignToAssignment`, {
      params: { assignmentId: id }
    });
    const data = result.data;
    return data;
  },
assignAssignment: async (users:User[], assignmentId:number) => {
  const result = await axios.post(`${baseUrl}/AssignAssignment`,users, {
    params: { 
      assignmentId:assignmentId
    }
  });
  const data = result.data;
  return data;
},

  getCategory: async (categoryId:number) => {
    
      const response = await axios.get(`${baseUrl}/Category`, {
        params: {
          categoryId: categoryId
        }
      });
      return response.data;
  }
  
};


