import type { Comment } from "@models/user";
import { Rating } from "@smastrom/react-rating";
import { FaRegUserCircle } from "react-icons/fa";

const RatingCard = ({ comment }: { comment: Comment }) => {
  return (
    <div className="flex gap-5 max-w-xl items-center w-full">
      <FaRegUserCircle size={100} />
      <div className="flex flex-col gap-2">
        <p className="font-semibold text-lg">
          {comment.client.name} {comment.client.firstLastName}
        </p>
        <div className="flex gap-3">
          <Rating style={{ maxWidth: 150 }} value={comment.rating} readOnly />
        </div>
        <p>{comment.content}</p>
      </div>
    </div>
  );
};

const Ratings = ({
  comments,
  loading,
}: {
  isDriverView?: boolean;
  comments: Comment[];
  loading: boolean;
}) => {
  return (
    <div className="flex flex-col gap-5 items-center overflow-scroll max-h-[500px] px-10 w-full">
      {comments.map((comment) => (
        <RatingCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Ratings;
