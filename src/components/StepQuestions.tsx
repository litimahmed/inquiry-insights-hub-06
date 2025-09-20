import { QuestionCard, Question } from "./QuestionCard";

interface StepQuestionsProps {
  questions: Question[];
  answers: Record<string, any>;
  onAnswer: (answer: any, questionId: string) => void;
}

export const StepQuestions = ({ questions, answers, onAnswer }: StepQuestionsProps) => {
  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <div key={question.id} className="bg-card rounded-lg border border-border p-6">
          <div className="mb-4">
            <span className="text-sm font-medium text-muted-foreground">
              Question {index + 1} of {questions.length}
            </span>
          </div>
          <QuestionCard
            question={question}
            onAnswer={(answer) => onAnswer(answer, question.id)}
            currentAnswer={answers[question.id]}
          />
        </div>
      ))}
    </div>
  );
};