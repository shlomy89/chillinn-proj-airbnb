export const ActionButtons = ({ onApproveClick, onRejectClick }) => (
    <div className="action-buttons-container">
        <button className="action-button btn-approve" onClick={onApproveClick}>
            Approve
        </button>
        <button className="action-button btn-reject" onClick={onRejectClick}>
            Reject
        </button>
    </div>
);
