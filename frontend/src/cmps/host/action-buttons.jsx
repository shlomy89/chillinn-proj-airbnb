export const ActionButtons = ({ onApproveClick, onRejectClick }) => (
    <div className="action-buttons-container">
        <div className="action-button" onClick={onApproveClick}>
            Approve
        </div>
        <div className="action-button rejected" onClick={onRejectClick}>
            Reject
        </div>
    </div>
);
