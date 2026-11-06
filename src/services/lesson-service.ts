import type { Lesson } from '@/types/lesson';

const lessons: Lesson[] = [
  {
    id: 'introductions',
    title: 'Making introductions',
    level: 'Beginner · 5 min',
    description: 'Learn a few friendly phrases for meeting someone for the first time.',
    vocabulary: [
      { word: 'pleased', pronunciation: '/pliːzd/', meaning: 'happy about something', example: 'Pleased to meet you.' },
      { word: 'currently', pronunciation: '/ˈkɜːrəntli/', meaning: 'at the present time', example: 'I currently live in Hanoi.' },
    ],
    questions: [{ id: 'q1', prompt: '“Nice to meet you” is used when…', options: ['saying hello to someone new', 'saying goodbye', 'asking for directions'], answer: 'saying hello to someone new' }],
  },
  {
    id: 'daily-routines',
    title: 'Daily routines',
    level: 'Beginner · 7 min',
    description: 'Talk about the things you do every day.',
    vocabulary: [
      { word: 'commute', pronunciation: '/kəˈmjuːt/', meaning: 'travel regularly to work or school', example: 'I commute by bus.' },
      { word: 'usually', pronunciation: '/ˈjuːʒuəli/', meaning: 'in most cases', example: 'I usually have breakfast at seven.' },
    ],
    questions: [{ id: 'q1', prompt: 'Choose the natural sentence.', options: ['I usually wake up early.', 'I wake usually up early.', 'Usually I up wake early.'], answer: 'I usually wake up early.' }],
  },
];

export function getLessons() { return lessons; }
export function getLesson(id: string) { return lessons.find((lesson) => lesson.id === id); }
