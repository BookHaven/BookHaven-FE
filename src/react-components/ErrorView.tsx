export const ErrorView = ({ error }: {error: string}) => {
  let displayedError;

  if (error.length > 0) {
    displayedError = "We seem to be having technical issues. Please try again later."
  } else {
    displayedError = "404: Page not found. Please click the logo above to return home."
  }

  return <p className="error-message">{displayedError}</p>
};