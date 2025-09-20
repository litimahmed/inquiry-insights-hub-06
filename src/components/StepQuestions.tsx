import { QuestionCard, Question } from "./QuestionCard";

interface StepQuestionsProps {
  questions: Question[];
  answers: Record<string, any>;
  onAnswer: (answer: any, questionId: string) => void;
}

export const StepQuestions = ({ questions, answers, onAnswer }: StepQuestionsProps) => {
  return (
    <div className="space-y-12">
      {questions.map((question, index) => (
        <div key={question.id} className="bg-background/50 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                Question {index + 1} of {questions.length}
              </span>
            </div>
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