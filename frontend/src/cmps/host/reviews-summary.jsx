import { useSelector } from "react-redux";
import { ReviewsChart } from "./reviews-chart";
import { Summary } from "./summary";

export const ReviewsSummary = () => {
  const reviews = useSelector((state) => state.reviewModule.reviews);

  return (
    <Summary
      header={"Reviews Summary"}
      secondaryHeader={`Total Reviews: ${reviews.length}`}
      Chart={() => <ReviewsChart reviews={reviews} />}
    />
  );
};
