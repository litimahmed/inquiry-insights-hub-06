import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export type QuestionType = 
  | "text" 
  | "textarea" 
  | "single-choice" 
  | "multiple-choice" 
  | "rating";

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: any) => void;
  currentAnswer?: any;
}

export const QuestionCard = ({ 
  question, 
  onAnswer, 
  currentAnswer 
}: QuestionCardProps) => {
  const [answer, setAnswer] = useState(currentAnswer || "");

  const handleAnswerChange = (value: any) => {
    setAnswer(value);
    onAnswer(value);
  };

  const renderInput = () => {
    switch (question.type) {
      case "text":
        return (
          <Input
            type="text"
            placeholder={question.placeholder || "Enter your answer..."}
            value={answer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="text-lg py-4 px-4 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-0 transition-all duration-200"
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={question.placeholder || "Enter your detailed response..."}
            value={answer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="text-lg py-4 px-4 bg-background border-2 border-border rounded-xl focus:border-primary focus:ring-0 transition-all duration-200 min-h-32 resize-none"
          />
        );

      case "single-choice":
        return (
          <RadioGroup value={answer} onValueChange={handleAnswerChange}>
            <div className="space-y-4">
              {question.options?.map((option, index) => (
                <div key={index} className="group">
                  <div className="flex items-center space-x-4 p-4 rounded-xl bg-background hover:bg-muted/50 border-2 border-border hover:border-primary/50 transition-all duration-200 cursor-pointer">
                    <RadioGroupItem 
                      value={option} 
                      id={`option-${index}`}
                      className="w-5 h-5 border-2 border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                    />
                    <Label 
                      htmlFor={`option-${index}`}
                      className="text-foreground font-medium cursor-pointer flex-1 text-lg leading-relaxed"
                    >
                      {option}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case "multiple-choice":
        return (
          <div className="space-y-4">
            {question.options?.map((option, index) => (
              <div key={index} className="group">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-background hover:bg-muted/50 border-2 border-border hover:border-primary/50 transition-all duration-200 cursor-pointer">
                  <Checkbox
                    id={`checkbox-${index}`}
                    checked={answer.includes && answer.includes(option)}
                    onCheckedChange={(checked) => {
                      const newAnswer = answer || [];
                      if (checked) {
                        handleAnswerChange([...newAnswer, option]);
                      } else {
                        handleAnswerChange(newAnswer.filter((a: string) => a !== option));
                      }
                    }}
                    className="w-5 h-5 border-2 border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                  />
                  <Label 
                    htmlFor={`checkbox-${index}`}
                    className="text-foreground font-medium cursor-pointer flex-1 text-lg leading-relaxed"
                  >
                    {option}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        );

      case "rating":
        return (
          <div className="flex space-x-3">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant={answer === rating ? "default" : "outline"}
                size="lg"
                onClick={() => handleAnswerChange(rating)}
                className="w-16 h-16 text-xl font-semibold rounded-xl border-2 hover:scale-105 transition-all duration-200"
              >
                {rating}
              </Button>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-foreground leading-tight tracking-tight">
          {question.title}
          {question.required && (
            <span className="text-destructive ml-1 text-lg">*</span>
          )}
        </h2>
        
        {question.description && (
          <p className="text-muted-foreground text-lg leading-relaxed font-light">
            {question.description}
          </p>
        )}
      </div>

      <div className="mt-8">
        {renderInput()}
      </div>
    </div>
  );
};