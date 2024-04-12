interface OutPassStatus {
  id: number;
  status: string;
  iconName: 'add-circle-outline' | 'hourglass' | 'checkmark-circle-outline' | 'close-circle';
  color: string;
  text: string;
}

export const outPassStatus: OutPassStatus[] = [
  { id: 1, status: 'Generate', iconName: 'add-circle-outline', color: '#ADD8E6', text: 'Generate Your OutPass' },
  { id: 2, status: 'Pending', iconName: 'hourglass', color: '#FFC107', text: 'Check Your Pending OutPass' },
  { id: 3, status: 'Approved', iconName: 'checkmark-circle-outline', color: 'green', text: 'Check Your Approve OutPass' },
  { id: 4, status: 'Denied', iconName:'close-circle', color: 'red', text: 'Check Your Denied OutPass' },
];
