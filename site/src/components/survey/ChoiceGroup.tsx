import { OTHER_MAX_LENGTH, type SurveyQuestion } from "../../data/survey";

type Props = {
  question: SurveyQuestion;
  selected: string[];
  otherText: string;
  invalid: boolean;
  onToggle: (option: string) => void;
  onOtherText: (text: string) => void;
};

// Radio (single) or checkbox (multi) list rendered as tappable cards.
// Picking the question's otherOption reveals an inline text field.
export default function ChoiceGroup({
  question,
  selected,
  otherText,
  invalid,
  onToggle,
  onOtherText,
}: Props) {
  const inputType = question.type === "multi" ? "checkbox" : "radio";
  const options = [
    ...(question.options ?? []),
    ...(question.otherOption ? [question.otherOption] : []),
  ];
  const otherSelected =
    !!question.otherOption && selected.includes(question.otherOption);

  return (
    <div className="survey-choices">
      {options.map((option) => {
        const checked = selected.includes(option);
        return (
          <label
            key={option}
            className={`survey-choice${checked ? " is-checked" : ""}`}
          >
            <input
              type={inputType}
              name={question.id}
              value={option}
              checked={checked}
              onChange={() => onToggle(option)}
              aria-invalid={invalid || undefined}
            />
            <span className="survey-choice-mark" aria-hidden="true" />
            <span className="survey-choice-label">{option}</span>
          </label>
        );
      })}

      {otherSelected && (
        <input
          type="text"
          className="survey-input survey-other-input"
          placeholder="Cuéntanos…"
          aria-label={`${question.otherOption}: especifica`}
          value={otherText}
          maxLength={OTHER_MAX_LENGTH}
          onChange={(e) => onOtherText(e.target.value)}
          autoFocus
        />
      )}
    </div>
  );
}
