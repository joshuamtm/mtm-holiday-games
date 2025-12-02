import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Which AI should I use?',
    answer:
      'All three work great! ChatGPT and Claude are most popular. Use whichever you already have an account with, or try any of them — they\'re all free to use.',
  },
  {
    question: 'Do I need to pay for AI?',
    answer:
      'No! Free accounts on ChatGPT, Claude, or Gemini work perfectly for these games.',
  },
  {
    question: 'How do I play with friends on Zoom?',
    answer:
      'One person opens the AI and shares their screen. They paste the prompt and everyone plays together, with the host reading questions aloud and typing in answers.',
  },
  {
    question: 'The AI isn\'t following the rules right. What do I do?',
    answer:
      'Just tell it! Say "you forgot to keep score" or "please give us a hint." The AI will adjust. If it gets really confused, say "let\'s start the game over from the beginning."',
  },
  {
    question: 'Can I use these prompts on my phone?',
    answer:
      'Yes! ChatGPT, Claude, and Gemini all have mobile apps, or you can use the websites on your phone\'s browser.',
  },
  {
    question: 'What\'s the difference between "Family Friendly" and "Adults" games?',
    answer:
      'Family Friendly games are appropriate for all ages. Adults games have more mature humor — think dating disasters, work stress, and existential moments — but nothing explicit. They\'re the kind of jokes you\'d share at a dinner party, not a boardroom.',
  },
  {
    question: 'Can I modify the prompts?',
    answer:
      'Absolutely! Feel free to customize the prompts to fit your group. You can change the number of rounds, adjust difficulty, or add your own house rules.',
  },
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-holiday-green/20 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:bg-holiday-snow transition-colors px-2 -mx-2 rounded"
      >
        <span className="font-medium text-holiday-pine pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp size={20} className="flex-shrink-0 text-holiday-green" />
        ) : (
          <ChevronDown size={20} className="flex-shrink-0 text-holiday-green" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-mtm-text-secondary text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-12 bg-gradient-to-b from-holiday-snow to-white">
      <div className="max-w-[800px] mx-auto px-5">
        <div className="flex items-center justify-center gap-2 mb-8">
          <HelpCircle size={24} className="text-holiday-gold" />
          <h2 className="text-2xl font-semibold text-holiday-pine text-center">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-holiday-green/20">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
