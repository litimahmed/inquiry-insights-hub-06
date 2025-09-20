import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

interface SurveyNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  isSubmitting?: boolean;
}

export const SurveyNavigation = ({
  onPrevious,
  onNext,
  onSubmit,
  canGoPrevious,
  canGoNext,
  isLastQuestion,
  isSubmitting = false
}: SurveyNavigationProps) => {
  return (
    <div className="flex items-center justify-between bg-background border-t border-border px-6 py-4">
      <div className="flex-1">
        {canGoPrevious && (
          <Button
            variant="outline"
            onClick={onPrevious}
            className="flex items-center space-x-2 border-border hover:bg-secondary-hover"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {isLastQuestion ? (
          <Button
            onClick={onSubmit}
            disabled={!canGoNext || isSubmitting}
            className="flex items-center space-x-2 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-8"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isSubmitting ? "Submitting..." : "Submit Survey"}</span>
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="flex items-center space-x-2 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-6"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};