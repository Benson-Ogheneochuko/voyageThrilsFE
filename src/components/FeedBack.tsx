import { useEffect } from 'react';
import { useFeedbackStore } from '../globalState/feedbackStore';
import { X } from 'lucide-react';
import './feedback.css';

export const UserFeedback = () => {
  const { message, type, isVisible, hideFeedback } = useFeedbackStore();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideFeedback();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, hideFeedback]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`feedback ${type}`}>
      <div className="feedback-content">
        <p>{message}</p>
      </div>
      <button onClick={hideFeedback} className="close-button">
        <X size={16} color="white" />
      </button>
    </div>
  );
};

export default UserFeedback;