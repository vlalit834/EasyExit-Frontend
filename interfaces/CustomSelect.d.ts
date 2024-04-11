import { SearchResultsData } from "@/services/api";

export interface CustomSelectProps {
  value: string,
  title: string;
  data: SearchResultsData[];
  modal?: boolean = false;
  placeholder?: string;
  searchValue?: string;
  setSearchValue?: (value: string) => void;
  onValueChange: (value: string) => void;
  isLoading?: boolean;
  
}