import { useState } from 'react';
import { Text } from 'react-native';

import { MultipleChoice } from '@/components/practice/multiple-choice';
import { AppButton } from '@/components/ui/app-button';
import { Screen } from '@/components/ui/screen';
import { ThemedText } from '@/components/ui/themed-text';
import { getLessons } from '@/services/lesson-service';
import { recordQuiz } from '@/services/storage-service';

export default function PracticeScreen() {
  const question = getLessons()[0].questions[0];
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  return <Screen><ThemedText type="title">Quick practice</ThemedText><Text>Choose the best answer.</Text><MultipleChoice question={question} selected={selected} onSelect={setSelected} /><AppButton title="Check answer" disabled={!selected || !!result} onPress={() => { const correct = selected === question.answer; setResult(correct ? 'That’s right!' : `Not quite. The answer is: ${question.answer}`); void recordQuiz(correct ? 1 : 0); }} />{result && <Text accessibilityRole="alert">{result}</Text>}</Screen>;
}
