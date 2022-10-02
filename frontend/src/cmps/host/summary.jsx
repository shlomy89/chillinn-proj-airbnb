export const Summary = ({ header, secondaryHeader, Chart }) => (
  <div className="summary">
    <span className="summary-main-header">{header}</span>
    <span className="summary-secondary-header">{secondaryHeader}</span>
    <Chart />
  </div>
);
