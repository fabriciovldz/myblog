import React, { useState } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./PostList.css"

export default function PostList({ posts, db, setPosts }) {
  const [newComment, setNewComment] = useState("");

  const handleLike = async (id, likes) => {
    const postRef = doc(db, "post", id);
    try {
      await updateDoc(postRef, { likes: likes + 1 });
      setPosts(
        posts.map((post) =>
          post.id === id ? { ...post, likes: likes + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error al dar like:", error);
    }
  };

  const handleComment = async (postId) => {
    if (!newComment.trim()) return; // No agregar comentarios vacíos

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Debes iniciar sesión para comentar.");
      return;
    }

    const commentData = {
      commentText: newComment,
      createdAt: new Date(),
      createdBy: {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
    };

    const postRef = doc(db, "post", postId);
    try {
      await updateDoc(postRef, {
        comments: arrayUnion(commentData),
      });

      // Actualizamos los comentarios en el estado local
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, commentData] }
            : post
        )
      );

      setNewComment(""); // Limpiar campo de comentario
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  return (
    <div>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-details">
              <h3>{post.title}</h3>
              <img src={post.image} alt={post.title} />
            </div>
            <p>{post.details}</p>
            <button onClick={() => handleLike(post.id, post.likes)}>
              {" "}
              <img
                src="https://images.icon-icons.com/1744/PNG/512/3643770-favorite-heart-like-likes-love-loved_113432.png"
                alt="Like"
              />
              {post.likes}
            </button>

            {/* Información del usuario que creó el post */}
            <div className="user-info">
              <h4>Publicado por:</h4>
              <div className="user-details">
                <img
                  src={post.createdBy.photoURL}
                  alt={post.createdBy.displayName}
                />
                <p>{post.createdBy.displayName}</p>
              </div>
            </div>

            {/* Sección de comentarios */}
            <div className="comments-section">
              <h4>Comentarios:</h4>
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <img
                      src={comment.createdBy.photoURL}
                      alt={comment.createdBy.displayName}
                      className="comment-avatar"
                    />
                    <p>
                      <strong>{comment.createdBy.displayName}:</strong>{" "}
                      {comment.commentText}
                    </p>
                  </div>
                ))
              ) : (
                <p>No hay comentarios todavía.</p>
              )}

              {/* Formulario para agregar un comentario */}
              <div className="add-comment">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escribe un comentario..."
                />
                <button onClick={() => handleComment(post.id)}>
                  Agregar Comentario
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}