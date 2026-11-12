import type { GrammarItem, Lesson, Vocabulary } from '@/types/lesson';

const lessons: Lesson[] = [
  {
    id: 'introductions',
    title: 'Making introductions',
    level: 'Beginner · 5 min',
    description: 'Learn a few friendly phrases for meeting someone for the first time.',
    vocabulary: [
      { id: 'v1', word: 'pleased', pronunciation: '/pliːzd/', meaning: 'happy about something' },
      { id: 'v2', word: 'currently', pronunciation: '/ˈkɜːrəntli/', meaning: 'at the present time' },
    ],
    grammar: [
      { title: 'Pleased to + Verb (nguyên mẫu)',
        explanation: 'Dùng để diễn tả sự vui mừng hoặc hài lòng khi làm điều gì đó lần đầu.',
        example: 'I am very pleased to meet you today.' },
    ],
    questions: [
      { id: 'q1', prompt: '“Nice to meet you” is used when…', 
        options: ['saying hello to someone new', 'saying goodbye', 'asking for directions'], 
        answer: 'saying hello to someone new' }],
  },
  {
    id: 'daily-routines',
    title: 'Daily routines',
    level: 'Beginner · 7 min',
    description: 'Talk about the things you do every day.',
    vocabulary: [
      { id: 'v3', word: 'commute', pronunciation: '/kəˈmjuːt/', meaning: 'travel regularly to work or school'},
      { id: 'v4', word: 'usually', pronunciation: '/ˈjuːʒuəli/', meaning: 'in most cases'},
    ],
    grammar: [
      { title: 'Usually + Verb (nguyên mẫu)',
        explanation: 'Dùng để diễn tả hành động xảy ra thường xuyên.',
        example: 'I usually wake up early.' },
    ],
    questions: [
      { id: 'q1', prompt: 'Choose the natural sentence.', options: ['I usually wake up early.', 'I wake usually up early.', 'Usually I up wake early.'], answer: 'I usually wake up early.' }
    ],
  },
];

export function getLessons() { return lessons; }
export function getLesson(id: string) { return lessons.find((lesson) => lesson.id === id); }

// Hàm tạo hẳn 1 chủ đề bài học mới (nếu cần thêm ở Trang chủ)
export function addNewLesson(newLesson: Lesson) {
  lessons.push(newLesson);
}

// Hàm thêm 1 từ vựng mới vào đúng bài học có sẵn
export function addVocabularyToLesson(lessonId: string, newVocab: Vocabulary) {
  const lesson = lessons.find((item) => item.id === lessonId);
  if (lesson) {
    lesson.vocabulary.push(newVocab);
  }
}

//Hàm thêm 1 ngữ pháp mới vào đúng bài học có sẵn
export function addGrammarToLesson(lessonId: string, newGrammar: GrammarItem) {
  const lesson = lessons.find((item) => item.id === lessonId);
  if (lesson) {
    if (!lesson.grammar) {
      lesson.grammar = [];
    }
    lesson.grammar.push(newGrammar);
  }
}