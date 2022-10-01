export const Summary = ({ header, secondaryHeader, Chart }) => (
  <div className="summary">
    <span className="summary-header">{header}</span>
    <span className="summary-header">{secondaryHeader}</span>
    <Chart />
  </div>
);
