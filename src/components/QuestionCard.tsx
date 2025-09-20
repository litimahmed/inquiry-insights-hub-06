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
            className="bg-input border-input-border focus:ring-input-focus"
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={question.placeholder || "Enter your detailed response..."}
            value={answer}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="bg-input border-input-border focus:ring-input-focus min-h-24"
          />
        );

      case "single-choice":
        return (
          <RadioGroup value={answer} onValueChange={handleAnswerChange}>
            <div className="space-y-3">
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <RadioGroupItem 
                    value={option} 
                    id={`option-${index}`}
                    className="border-input-border"
                  />
                  <Label 
                    htmlFor={`option-${index}`}
                    className="text-foreground font-medium cursor-pointer flex-1 py-2"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        );

      case "multiple-choice":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-3">
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
                  className="border-input-border"
                />
                <Label 
                  htmlFor={`checkbox-${index}`}
                  className="text-foreground font-medium cursor-pointer flex-1 py-2"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case "rating":
        return (
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant={answer === rating ? "default" : "outline"}
                size="sm"
                onClick={() => handleAnswerChange(rating)}
                className="w-12 h-12 text-lg font-bold"
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
    <Card className="bg-card border-card-border shadow-[var(--shadow-card)] p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground leading-tight">
            {question.title}
            {question.required && (
              <span className="text-destructive ml-1">*</span>
            )}
          </h2>
          
          {question.description && (
            <p className="text-muted-foreground text-base leading-relaxed">
              {question.description}
            </p>
          )}
        </div>

        <div className="pt-2">
          {renderInput()}
        </div>
      </div>
    </Card>
  );
};