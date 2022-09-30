import { HostSummaryIncome } from '../details-cmp/host-summary-income';

export const HostSummary = () => (
    <div className="hosting-summary-container">
        <span className="hosting-header">Hosting Summary</span>
        <span className="secondary-header">Fantastic Job!</span>

        <span className="guests-info">
            Guests love what you're doing, keep up the good work and review your orders stats!
        </span>
        <HostSummaryIncome />
    </div>
);
