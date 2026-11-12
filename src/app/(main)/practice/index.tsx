import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { FillBlank } from '@/components/practice/fill-blank';
import { MultipleChoice } from '@/components/practice/multiple-choice';
import { TrueFalse } from '@/components/practice/true-false';
import { AppButton } from '@/components/ui/app-button';
import { AppCard } from '@/components/ui/app-card';
import { Screen } from '@/components/ui/screen';
import { ThemedText } from '@/components/ui/themed-text';
import { getLessons } from '@/services/lesson-service';
import { getDuePracticeReviews, getPracticeReview, recordPracticeAnswer } from '@/services/storage-service';
import type { PracticeReviewProgress } from '@/types/statistic';

export default function PracticeScreen() {
  const [loading, setLoading] = useState(true);
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [review, setReview] = useState<PracticeReviewProgress | null>(null);
  const [shownQuestionId, setShownQuestionId] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean | null>(null);

  const loadDueReview = useCallback(async () => {
    setLoading(true);
    const dueIds = await getDuePracticeReviews();
    const nextId = dueIds[0] ?? null;
    setLessonId(nextId);
    setReview(nextId ? await getPracticeReview(nextId) : null);
    setShownQuestionId(null);
    setAnswer(null);
    setChecked(null);
    setLoading(false);
  }, []);

  useFocusEffect(useCallback(() => { void loadDueReview(); }, [loadDueReview]));

  const lesson = getLessons().find((item) => item.id === lessonId);
  const queuedQuestion = useMemo(() => {
    if (!lesson || !review) return null;
    const nextRetryId = review.retryQuestionIds.find((id) => !review.retryCompletedIds.includes(id));
    if (nextRetryId) return lesson.questions.find((item) => item.id === nextRetryId) ?? null;
    const nextFirstPassId = lesson.questions.find((item) => !review.firstPassQuestionIds.includes(item.id))?.id;
    return lesson.questions.find((item) => item.id === nextFirstPassId) ?? null;
  }, [lesson, review]);
  const question = (shownQuestionId && lesson?.questions.find((item) => item.id === shownQuestionId)) || queuedQuestion;

  const isRetry = !!question && !!review?.retryQuestionIds.includes(question.id);
  const currentCount = review ? (isRetry ? review.retryCompletedIds.length : review.firstPassQuestionIds.length) : 0;

  const checkAnswer = async () => {
    if (!lesson || !question || answer === null || checked !== null) return;
    const correct = answer.trim().toLocaleLowerCase() === question.answer.trim().toLocaleLowerCase();
    const updated = await recordPracticeAnswer(lesson.id, question.id, correct, lesson.questions.length);
    setReview(updated);
    setShownQuestionId(question.id);
    setChecked(correct);
  };

  const advance = () => {
    setAnswer(null);
    setChecked(null);
    setShownQuestionId(null);
  };

  return (
    <Screen>
      <ThemedText type="title" style={{ marginTop: 15 }}>Practice</ThemedText>
      <ThemedText type="default" themeColor="muted">Short reviews help you remember what you learned.</ThemedText>

      {loading ? <ActivityIndicator /> : !lesson || !review ? (
        <AppCard>
          <ThemedText type="subtitle">No reviews due</ThemedText>
          <ThemedText type="default" themeColor="muted">Complete lessons in Learn. A lesson review becomes due after you complete two more lessons.</ThemedText>
        </AppCard>
      ) : review.completed && !review.active ? (
        <AppCard>
          <ThemedText type="subtitle">Review complete</ThemedText>
          <ThemedText type="default" themeColor="muted">You finished {lesson.title}. Keep learning and your next review will be scheduled automatically.</ThemedText>
          <AppButton title="Done" onPress={() => void loadDueReview()} />
        </AppCard>
      ) : !question ? (
        <AppCard>
          <ThemedText type="subtitle">Review complete</ThemedText>
          <ThemedText type="default" themeColor="muted">You finished all questions for {lesson.title}.</ThemedText>
          <AppButton title="Done" onPress={() => void loadDueReview()} />
        </AppCard>
      ) : (
        <AppCard>
          <ThemedText type="subtitle">{lesson.title}</ThemedText>
          <ThemedText type="default" themeColor="muted">
            {isRetry ? `Repeat missed questions · ${currentCount + 1} of ${review.retryQuestionIds.length}` : `Question ${currentCount + 1} of ${lesson.questions.length}`}
          </ThemedText>
          <ThemedText type="default">{question.prompt}</ThemedText>
          {question.type === 'multiple-choice' ? (
            <MultipleChoice question={question} selected={answer} onSelect={setAnswer} />
          ) : question.type === 'fill-blank' ? (
            <FillBlank value={answer ?? ''} onChangeText={setAnswer} />
          ) : (
            <TrueFalse selected={answer} onSelect={setAnswer} />
          )}
          {checked !== null && (
            <Text accessibilityRole="alert" style={{ color: checked ? '#27845A' : '#C43F45', fontWeight: '600' }}>
              {checked ? 'Correct!' : `Not quite. Answer: ${question.answer}`}
            </Text>
          )}
          {checked === null ? (
            <AppButton title="Check answer" disabled={!answer} onPress={() => void checkAnswer()} />
          ) : (
            <AppButton title="Next question" onPress={advance} />
          )}
          {review.retryQuestionIds.length > 0 && !isRetry && (
            <View><ThemedText type="default" themeColor="muted">Missed questions are repeated after this round.</ThemedText></View>
          )}
        </AppCard>
      )}
    </Screen>
  );
}
