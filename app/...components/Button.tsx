import { ReactNode } from 'react';

export enum ButtonVariant {
  Primary,
  Secondary,
  Ternary,
  Accept,
  Refuse,
}

interface ButtonProps {
  variant: ButtonVariant;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

/**
 * A customizable button component with multiple variant styles.
 *
 * @component
 * @example
 * ```tsx
 * <Button variant={ButtonVariant.Primary} onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 *
 * @param {ButtonProps} props - The button component props
 * @param {ButtonVariant} [props.variant] - The visual variant of the button (Primary, Secondary, Ternary, Accept, or Refuse)
 * @param {string} [props.className] - Additional CSS classes to apply to the button
 * @param {React.ReactNode} props.children - The content to display inside the button
 * @param {React.MouseEventHandler<HTMLButtonElement>} props.onClick - Callback function triggered when the button is clicked
 * @returns {JSX.Element} A styled button element with variant-specific colors and hover/active states
 */
export default function Button(props: ButtonProps) {
  let backgroundColor: string;
  let hoverColor: string;
  let border: string = 'none';

  switch (props.variant) {
    case ButtonVariant.Primary:
      backgroundColor = 'bg-primary';
      hoverColor = 'hover:bg-primary-hover';
      break;

    case ButtonVariant.Secondary:
      backgroundColor = 'bg-accent';
      hoverColor = 'hover:bg-accent-hover';
      break;

    case ButtonVariant.Ternary:
      backgroundColor = 'bg-foreground';
      hoverColor = 'hover:bg-foreground-hover';
      border = 'border border-accent';
      break;

    case ButtonVariant.Accept:
      backgroundColor = 'bg-success';
      hoverColor = 'hover:bg-success-hover';
      break;

    case ButtonVariant.Refuse:
      backgroundColor = 'bg-error';
      hoverColor = 'hover:bg-error-hover';
      break;
  }

  return (
    <button
      className={`${props.className} ${backgroundColor} ${border} px-6 py-3 rounded-lg transition-all duration-200 font-medium text-white ${hoverColor} active:scale-95 cursor-pointer`}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}
