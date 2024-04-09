import { SearchResultsData } from "@/services/api";

export interface CustomSelectProps {
  title: string;
  data: SearchResultsData[];
  modal?: boolean = false;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  isLoading?: boolean;
  
}