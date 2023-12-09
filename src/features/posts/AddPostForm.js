import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector(selectAllUsers);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  /* const canSave = Boolean(title) && Boolean(content) && Boolean(userId); */
  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSave = () => {
    try {
      setAddRequestStatus("pending");
      dispatch(addNewPost({ title, body: content, userId })).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to save post", err);
    } finally {
      setAddRequestStatus("idle");
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add Post</h2>
      <form action="postTitle">
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="author">Select Author:</label>
        <select
          name="author"
          id="author"
          value={userId}
          onChange={onAuthorChange}
        >
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          value={content}
          onChange={onContentChange}
        ></textarea>
        <button type="button" onClick={onSave} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
