export const mockTickets = [
  {
    id: '1',
    title: 'Login page not loading properly on mobile devices',
    status: 'open' as const,
    priority: 'high' as const,
    date: 'Sep 16',
    assignee: { name: 'Sarah Chen', avatar: 'SC' },
    description: 'Users are reporting that the login page fails to load completely on mobile devices, specifically iOS Safari and Chrome mobile browsers. The form elements appear to be cut off and the submit button is not visible.'
  },
  {
    id: '2',
    title: 'Dashboard performance issues with large datasets',
    status: 'in-progress' as const,
    priority: 'medium' as const,
    date: 'Sep 15',
    assignee: { name: 'Mike Johnson', avatar: 'MJ' },
    description: 'The main dashboard becomes unresponsive when loading datasets with more than 10,000 records. Page load times exceed 30 seconds and sometimes results in browser crashes.'
  },
  {
    id: '3',
    title: 'Email notifications not being sent for new user registrations',
    status: 'open' as const,
    priority: 'high' as const,
    date: 'Sep 15',
    assignee: { name: 'Alex Rivera', avatar: 'AR' },
    description: 'New users are not receiving welcome emails after completing the registration process. The email service appears to be functioning for other types of notifications.'
  },
  {
    id: '4',
    title: 'Update user profile photo functionality',
    status: 'closed' as const,
    priority: 'low' as const,
    date: 'Sep 14',
    assignee: { name: 'Emma Wilson', avatar: 'EW' },
    description: 'Add the ability for users to upload and update their profile photos. This should include image compression and proper file format validation.'
  },
  {
    id: '5',
    title: 'Search functionality returns incorrect results',
    status: 'in-progress' as const,
    priority: 'medium' as const,
    date: 'Sep 14',
    assignee: { name: 'David Kim', avatar: 'DK' },
    description: 'The search feature in the main navigation is returning irrelevant results and not properly indexing recent content updates.'
  },
  {
    id: '6',
    title: 'API rate limiting causing timeouts',
    status: 'open' as const,
    priority: 'high' as const,
    date: 'Sep 13',
    assignee: { name: 'Sarah Chen', avatar: 'SC' },
    description: 'External API calls are hitting rate limits during peak hours, causing timeout errors and failed data synchronization.'
  },
  {
    id: '7',
    title: 'Add dark mode support',
    status: 'closed' as const,
    priority: 'low' as const,
    date: 'Sep 12',
    assignee: { name: 'Mike Johnson', avatar: 'MJ' },
    description: 'Implement dark mode theme option for better user experience during low-light usage.'
  },
  {
    id: '8',
    title: 'Payment processing fails for international cards',
    status: 'in-progress' as const,
    priority: 'high' as const,
    date: 'Sep 12',
    assignee: { name: 'Emma Wilson', avatar: 'EW' },
    description: 'Customers with international credit cards are unable to complete payment transactions. The error occurs during the final authorization step.'
  }
];