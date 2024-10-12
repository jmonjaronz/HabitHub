import { create } from 'zustand';

interface Issue {
  key: string;
  title: string;
  assignedTo: string;
  reportedBy: string;
  dueDate: string;
  type: 'Bug' | 'Feature' | 'Task';
  status: 'To Do' | 'In Progress' | 'Done';
}

interface IssueStore {
  issues: Issue[];
  addIssue: (issue: Issue) => void;
}

const useIssuesStore = create<IssueStore>((set) => ({
  issues: [],
  addIssue: (issue) => set((state) => ({ issues: [...state.issues, issue] })),
}));

export default useIssuesStore;