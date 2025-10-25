const Card = ({
  children,
  hover = false,
  className = '',
  onClick,
  ...props
}) => {
  const classes = `
    card
    ${hover ? 'card-hover cursor-pointer' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
