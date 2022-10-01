import { keys, map, meanBy } from "lodash";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

export const ReviewsChart = ({ reviews }) => (
  <RadarChart
    outerRadius={90}
    width={520}
    height={250}
    tick={false}
    data={map(keys(reviews[0]?.rating), (ratingKey) => ({
      subject: ratingKey.charAt(0).toUpperCase() + ratingKey.slice(1),
      total: meanBy(reviews, (review) => review.rating[ratingKey]),
    }))}
  >
    <PolarGrid />
    <PolarAngleAxis dataKey={({ subject, total }) => `${subject} (${total})`} />
    <PolarRadiusAxis angle={30} domain={[0, 5]} />
    <Radar dataKey="total" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
  </RadarChart>
);
