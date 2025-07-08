import { IRootState, useAppDispatch, useAppSelector } from "@core/store";
import { CreateComment } from "@models/user";
import { addComment, deleteCommentById } from "@redux/user/userThunk";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const useCommentDialog = (tripId: number) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state: IRootState) => state.user.loading);

  const createCommentValidation = Yup.object().shape({});

  const [comment, setComment] = useState<CreateComment>({
    content: "",
    rating: 0,
    tripId: tripId,
  });

  const handleSubmitComment = () => {
    dispatch(addComment(comment));
  };

  const handleChangeComment = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRemoveComment = (id: number) => {
    dispatch(deleteCommentById(id));
  };

  return {
    handleSubmitComment,
    comment,
    handleChangeComment,
    createCommentValidation,
    handleRemoveComment,
    loading,
  };
};

export default useCommentDialog;
