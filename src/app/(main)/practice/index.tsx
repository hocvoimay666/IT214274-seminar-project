import { useState } from 'react';
import { Text } from 'react-native';

import { MultipleChoice } from '@/components/practice/multiple-choice';
import { AppButton } from '@/components/ui/app-button';
import { Screen } from '@/components/ui/screen';
import { ThemedText } from '@/components/ui/themed-text';
import { getLessons } from '@/services/lesson-service';
import { saveQuizResult } from '@/services/storage-service';

export default function PracticeScreen() {
  // Current quiz question (from seed data)
  const question = getLessons()[0].questions[0];

  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleCheckAnswer = () => {
    const isCorrect = selected === question.answer;
    setResult(isCorrect ? 'That’s right!' : `Not quite. The answer is: ${question.answer}`);
    void saveQuizResult(isCorrect ? 1 : 0);
  };

  return (
    <Screen>
      <ThemedText type="title" style={{ marginTop: 15 }}>Quick practice</ThemedText>
      <ThemedText type="default" themeColor="muted">
        Choose the best answer.
      </ThemedText>


      <MultipleChoice question={question} selected={selected} onSelect={setSelected} />

      <AppButton
        title="Check answer"
        disabled={!selected || !!result}
        onPress={handleCheckAnswer}
      />

      {result && <Text accessibilityRole="alert">{result}</Text>}
    </Screen>
  );
}
