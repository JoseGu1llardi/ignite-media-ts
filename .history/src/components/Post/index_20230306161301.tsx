import { useState, FormEvent, ChangeEvent, InvalidEvent } from "react";

import { format, formatDistanceToNow } from "date-fns";
import { enIE } from "date-fns/locale";

import { Avatar } from "../Avatar";

import { Comment } from "../Comment";

import styles from "./styles.module.css";

interface PostProps {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
    role: string;
  }
  content: string,
  publishedAt: Date;
}

export function Post(post: PostProps) {
  const [comments, setComments] = useState([
    "I have will improved my habilitys with Javascript!",
  ]);

  const [newCommentText, setNewCommentText] = useState("");

  const {
    author: { avatarUrl, name, role },
    content,
    publishedAt,
  } = post;

  const publishedDateFormated = format(
    publishedAt,
    "d 'de' MMMM 'at' HH:mm'h'"
  );

  const publishedDateRelaiveToNow = formatDistanceToNow(publishedAt, {
    locale: enIE,
    addSuffix: true,
  });

  const isNewCommentEmpty = newCommentText.length === 0;

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    console.log(event.target.setCustomValidity(""));
    setNewCommentText(event.target.value);
  }

  function handleNewContentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    console.log(event.target.setCustomValidity("This field is required!"));
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{name}</strong>
            <span>{role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormated}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelaiveToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Leave your feedback</strong>

        <textarea
          required
          name="comment"
          onInvalid={handleNewContentInvalid}
          value={newCommentText}
          placeholder="Leave a comment..."
          onChange={handleNewCommentChange}
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publish
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={deleteComment}
          />
        ))}
      </div>
    </article>
  );
}
