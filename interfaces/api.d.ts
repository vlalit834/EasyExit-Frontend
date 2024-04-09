export interface Response200<D> {
  status: string;
  message: string;
  data: D;
  actions?: any;
}
