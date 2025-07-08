"use client";
import CustomDialog from "@components/molecules/Dialog";
import { ErrorMessage, Form, Formik } from "formik";
import useCommentDialog from "./hooks/useCommentDialog";
import Input from "@components/atoms/Input";
import Button from "@components/atoms/Button";
import Rating from "@components/molecules/Rating";

const CommentDialog = ({
  show = false,
  onClose,
  tripId,
}: {
  show: boolean;
  onClose: VoidFunction;
  tripId: number;
}) => {

  const {
    comment,
    createCommentValidation,
    handleSubmitComment,
    handleChangeComment,
    loading,
  } = useCommentDialog(tripId);

  return (
    <CustomDialog open={show} onClose={onClose}>
      <p className="text-2xl font-bold mb-10 text-center">Nuevo Comentario</p>
      <Formik
        enableReinitialize
        initialValues={comment}
        onSubmit={() => {
          handleSubmitComment(tripId);
          onClose();
        }}
        validationSchema={createCommentValidation}
      >
        <Form className="flex flex-col gap-5 items-end max-w-xl w-full">
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="content" className="font-bold">
                Comentario
              </label>
              <Input
                name="content"
                id="content"
                disabled={loading}
                value={comment.content}
                onChange={handleChangeComment}
              />
            </div>
            <ErrorMessage
              component="div"
              className="text-red-500 text-sm"
              name="content"
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="font-bold">Valoración</p>
            <Rating
              value={comment.rating}
              onChange={(value) => {
                handleChangeComment({ target: { name: "rating", value } });
              }}
            />
          </div>
          <Button variant="accept" type="submit" disabled={loading}>
            Enviar
          </Button>
        </Form>
      </Formik>
    </CustomDialog>
  );
};

export default CommentDialog;
