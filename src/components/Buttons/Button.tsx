export function Button({ children, actionOnClick, classname, type }: any) {
  return (
    <button
      type={type}
      className={`button ${classname}`}
      onClick={actionOnClick}
    >
      {children}
    </button>
  );
}
