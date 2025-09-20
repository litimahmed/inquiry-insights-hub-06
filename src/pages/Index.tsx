import { useState } from "react";
import { SurveyHeader } from "@/components/SurveyHeader";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { QuestionCard, Question } from "@/components/QuestionCard";
import { SurveyNavigation } from "@/components/SurveyNavigation";
import { toast } from "@/hooks/use-toast";

// Market research questions organized by logical flow
const marketResearchQuestions: Question[] = [
  // Step 1: Demographics & Household Context (7 questions)
  {
    id: "1",
    type: "single-choice",
    title: "Are you usually the person who does the grocery shopping in your household?",
    required: true,
    options: ["Yes, I do all the grocery shopping", "Yes, I do most of it", "I share it with others", "No, someone else usually does it"]
  },
  {
    id: "2",
    type: "single-choice",
    title: "If you don't mind, what's your age range?",
    required: true,
    options: ["Under 25", "25–40", "40–60", "Above 60"]
  },
  {
    id: "3",
    type: "single-choice",
    title: "Do you live alone, with family, or with roommates? About how many people are in your household?",
    required: true,
    options: ["Live alone (1 person)", "With partner/spouse (2 people)", "Small family (3-4 people)", "Large family (5+ people)", "With roommates", "Other"]
  },
  {
    id: "4",
    type: "single-choice",
    title: "Are you currently working, studying, retired, or managing the household?",
    required: true,
    options: ["Working full-time", "Working part-time", "Student", "Retired", "Managing household/homemaker", "Unemployed", "Other"]
  },
  {
    id: "5",
    type: "single-choice",
    title: "How do you usually get to the supermarket?",
    required: true,
    options: ["By car", "By bus/public transport", "Walking", "Bicycle/motorcycle", "Taxi/ride-sharing", "Other"]
  },
  {
    id: "6",
    type: "single-choice",
    title: "When you shop, do you usually go for the cheapest options, mix of price/quality, or prefer premium products?",
    required: true,
    options: ["Usually cheapest options", "Mix of price and quality", "Premium/high-quality products", "Depends on the product type"]
  },
  {
    id: "7",
    type: "single-choice",
    title: "Do you have children you shop for regularly?",
    required: true,
    options: ["Yes, young children (under 12)", "Yes, teenagers (12-18)", "Yes, adult children living at home", "No children", "Not applicable"]
  },

  // Step 2: Shopping Behavior & Patterns (9 questions)
  {
    id: "8",
    type: "single-choice",
    title: "When you go grocery shopping, what's the main reason?",
    required: true,
    options: ["Stock up for the week", "Grab daily items", "Handle an emergency need", "Planned monthly trip", "Just when I feel like it"]
  },
  {
    id: "9",
    type: "multiple-choice",
    title: "What kind of items do you usually buy most?",
    description: "Select all that apply to your typical shopping.",
    required: true,
    options: ["Fresh produce (fruits, vegetables)", "Dry goods (rice, pasta, flour)", "Snacks and beverages", "Household products (cleaning supplies)", "Dairy and frozen items", "Meat and fish"]
  },
  {
    id: "10",
    type: "single-choice",
    title: "What usually makes you decide it's time to shop?",
    required: true,
    options: ["Empty fridge/pantry", "Planned weekly trip", "Something missing last minute", "When I see good deals", "When I have free time"]
  },
  {
    id: "11",
    type: "single-choice",
    title: "Do you normally shop on a fixed schedule or only when you suddenly need something?",
    required: true,
    options: ["Fixed schedule (same days each week)", "Flexible but regular", "Only when needed urgently", "Mix of both planned and urgent", "No particular pattern"]
  },
  {
    id: "12",
    type: "single-choice",
    title: "If you couldn't shop yourself, would you want someone else to do the full weekly basket, or just bring specific urgent items?",
    required: true,
    options: ["Full weekly basket", "Just specific urgent items", "Depends on the situation", "I prefer to always shop myself", "Not sure"]
  },
  {
    id: "13",
    type: "single-choice",
    title: "How many times per month do you usually go grocery shopping?",
    required: true,
    options: ["1-2 times", "3-4 times", "5-8 times", "9-12 times", "More than 12 times"]
  },
  {
    id: "14",
    type: "single-choice",
    title: "On average, how much do you usually spend in one trip?",
    required: true,
    options: ["Under 2,000 DZD", "2,000-5,000 DZD", "5,000-8,000 DZD", "8,000-15,000 DZD", "Over 15,000 DZD"]
  },
  {
    id: "15",
    type: "single-choice",
    title: "Is your typical shopping trip for a big basket, or just a few small items?",
    required: true,
    options: ["Always big baskets", "Usually big baskets", "Mix of big and small", "Usually small items", "Always small items"]
  },
  {
    id: "16",
    type: "single-choice",
    title: "Do you sometimes make a big purchase and sometimes small ones, or is it usually the same each time?",
    required: true,
    options: ["Very consistent amounts", "Somewhat consistent", "Varies quite a bit", "Completely unpredictable", "Seasonal variations"]
  },

  // Step 3: Pain Points & Current Solutions (9 questions)
  {
    id: "17",
    type: "textarea",
    title: "What's the most annoying or difficult part of grocery shopping for you?",
    placeholder: "Describe your biggest frustration with grocery shopping...",
    required: true
  },
  {
    id: "18",
    type: "textarea",
    title: "Can you tell me about the last time shopping was stressful or went badly? What happened?",
    placeholder: "Share a recent negative shopping experience...",
    required: true
  },
  {
    id: "19",
    type: "single-choice",
    title: "How much time do you usually spend going and coming back, and does that bother you?",
    required: true,
    options: ["Under 30 minutes - no problem", "30-60 minutes - it's fine", "1-2 hours - somewhat bothersome", "2+ hours - very frustrating", "Time varies too much"]
  },
  {
    id: "20",
    type: "multiple-choice",
    title: "Do you ever find any of these to be a hassle?",
    description: "Select all that apply to your shopping experience.",
    required: true,
    options: ["Carrying heavy bags", "Waiting in long lines", "Transport to/from store", "Finding parking", "Crowded stores", "None of these bother me"]
  },
  {
    id: "21",
    type: "single-choice",
    title: "How do you usually feel after a big shopping trip?",
    required: true,
    options: ["Satisfied and accomplished", "Tired but okay", "Exhausted", "Frustrated or stressed", "Depends on the day"]
  },
  {
    id: "22",
    type: "single-choice",
    title: "If you can't go to the supermarket yourself, what do you usually do?",
    required: true,
    options: ["Ask family member to go", "Send children/teenagers", "Ask neighbor or friend", "Use delivery service", "Go to nearby corner shop", "Wait until I can go myself"]
  },
  {
    id: "23",
    type: "single-choice",
    title: "Have you ever tried a delivery service for groceries or food? How was it?",
    required: true,
    options: ["Yes, very satisfied", "Yes, it was okay", "Yes, but had problems", "Yes, but too expensive", "No, never tried", "No, don't trust it"]
  },
  {
    id: "24",
    type: "single-choice",
    title: "When you rely on others or existing services, how well does it work for you?",
    required: true,
    options: ["Works very well", "Usually works fine", "Sometimes problematic", "Often disappointing", "Rarely works well", "Not applicable"]
  },
  {
    id: "25",
    type: "single-choice",
    title: "Do you feel your current way of shopping is good enough, or would you change if something better existed?",
    required: true,
    options: ["Very satisfied with current way", "Mostly satisfied", "Open to better alternatives", "Actively looking for alternatives", "Would definitely switch if possible"]
  },

  // Step 4: Payment Preferences & Pricing (5 questions)
  {
    id: "26",
    type: "single-choice",
    title: "For a typical shopping trip of about 4,000 DZD, what delivery fee would feel fair?",
    required: true,
    options: ["150 DZD or less", "150-250 DZD", "250-400 DZD", "400+ DZD is fine", "Would depend on service quality"]
  },
  {
    id: "27",
    type: "single-choice",
    title: "Would you prefer paying per delivery, or a monthly subscription that saves money if you order often?",
    required: true,
    options: ["Pay per delivery", "Monthly subscription", "Depends on the savings", "Not sure yet", "Would need to try both"]
  },
  {
    id: "28",
    type: "single-choice",
    title: "Would you prefer cash on delivery, card, or mobile wallet?",
    required: true,
    options: ["Cash on delivery", "Credit/debit card", "Mobile wallet (CIB, BaridiMob)", "Bank transfer", "Flexible - any method"]
  },
  {
    id: "29",
    type: "single-choice",
    title: "If there was a promo — like free delivery every 5th order — would that make you use the service more?",
    required: true,
    options: ["Yes, definitely", "Probably yes", "Maybe slightly", "No difference", "I prefer consistent low prices"]
  },
  {
    id: "30",
    type: "textarea",
    title: "Any additional thoughts about grocery delivery services or what would make them appealing to you?",
    placeholder: "Share any other thoughts, concerns, or suggestions...",
    required: false
  }
];

const Index = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = marketResearchQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === marketResearchQuestions.length - 1;
  const canGoPrevious = currentQuestionIndex > 0;
  const canGoNext = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== "";

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < marketResearchQuestions.length - 1) {
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <ProgressIndicator
            currentStep={currentQuestionIndex + 1}
            totalSteps={marketResearchQuestions.length}
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