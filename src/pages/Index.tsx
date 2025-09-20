import { useState } from "react";
import { SurveyHeader } from "@/components/SurveyHeader";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { QuestionCard, Question } from "@/components/QuestionCard";
import { SurveyNavigation } from "@/components/SurveyNavigation";
import { toast } from "@/hooks/use-toast";

// Sample questions for demonstration
const sampleQuestions: Question[] = [
  {
    id: "1",
    type: "single-choice",
    title: "What is your age group?",
    description: "Please select the age range that best describes you.",
    required: true,
    options: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"]
  },
  {
    id: "2",
    type: "multiple-choice",
    title: "Which of the following products do you use regularly?",
    description: "Select all that apply to your current usage.",
    required: true,
    options: ["Smartphones", "Laptops", "Tablets", "Smart Watches", "Gaming Consoles", "Smart Home Devices"]
  },
  {
    id: "3",
    type: "rating",
    title: "How would you rate your overall satisfaction with our service?",
    description: "Rate from 1 (Very Unsatisfied) to 5 (Very Satisfied).",
    required: true
  },
  {
    id: "4",
    type: "textarea",
    title: "What improvements would you suggest for our products or services?",
    description: "Please provide detailed feedback that could help us serve you better.",
    placeholder: "Share your thoughts and suggestions...",
    required: false
  }
];

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = sampleQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === sampleQuestions.length - 1;
  const canGoPrevious = currentQuestionIndex > 0;
  const canGoNext = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== "";

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Survey Submitted Successfully",
        description: "Thank you for your valuable feedback. Your responses have been recorded.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SurveyHeader
        title="Market Research Survey"
        description="Your feedback is valuable to us. This survey will help us understand market trends and improve our services. It should take approximately 5-7 minutes to complete."
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <ProgressIndicator
            currentStep={currentQuestionIndex + 1}
            totalSteps={sampleQuestions.length}
          />
        </div>

        {/* Question Card */}
        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleAnswer}
            currentAnswer={answers[currentQuestion.id]}
          />
        </div>
      </main>

      {/* Fixed Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto">
          <SurveyNavigation
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
            isLastQuestion={isLastQuestion}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default Index;