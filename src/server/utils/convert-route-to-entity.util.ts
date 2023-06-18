const mapping: Record<string, string> = {
  exams: 'exam',
  flashcards: 'flashcard',
  performances: 'performance',
  students: 'student',
  'study-groups': 'study_group',
  'study-group-members': 'study_group_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
