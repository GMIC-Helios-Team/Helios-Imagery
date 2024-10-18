import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
// eslint-disable-next-line react/display-name
interface CustomToggleProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

// eslint-disable-next-line react/display-name
export const CustomToggle = React.forwardRef<HTMLAnchorElement, CustomToggleProps>(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
// eslint-disable-next-line react/display-name
interface CustomMenuProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  'aria-labelledby'?: string;
}

// eslint-disable-next-line react/display-name
export const CustomMenu = React.forwardRef<HTMLDivElement, CustomMenuProps>(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || (React.isValidElement(child) && child.props.children.toLowerCase().includes(value)),
          )}
        </ul>
      </div>
    );
  },
);
