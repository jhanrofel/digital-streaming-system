import React from 'react'

function ReviewCards() {
  return (
    <div>ReviewCards</div>
  )
}

export default ReviewCards

// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import FormRating from "../FormRating";
// import Typography from "@mui/material/Typography";

// type AppProps = {
//   reviews: any;
// };
// const ReviewCards = ({ reviews }: AppProps) => {
//   return reviews.map((review: any) => (
//     <Card key={review.id} sx={{ minWidth: 275, margin: 2 }}>
//       <CardContent>
//         {review.approval === "pending" && (
//           <Typography sx={{ fontSize: 18 }}>For Approval</Typography>
//         )}
//         <Typography sx={{ fontSize: 18 }}>{review.description}</Typography>
//         <Typography sx={{ fontSize: 14 }}>{`${review.reviewUser.firstName} ${review.reviewUser.lastName}`}</Typography>
//         <Typography sx={{ fontSize: 14 }}>{review.createdAt}</Typography>
//         <FormRating name={"rating"} value={review.rating} error={""} />
//       </CardContent>
//     </Card>
//   ));
// };

// export default ReviewCards;
