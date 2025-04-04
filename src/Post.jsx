import React, { useState } from "react";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Post({ post, db, setPosts, posts }) {
	const [newComment, setNewComment] = useState("");

	const handleLike = async () => {
		const postRef = doc(db, "post", post.id);
		try {
			await updateDoc(postRef, { likes: post.likes + 1 });
			setPosts(
				posts.map((p) =>
					p.id === post.id ? { ...p, likes: post.likes + 1 } : p
				)
			);
		} catch (error) {
			console.error("Error al dar like:", error);
		}
	};

	const handleDislike = async () => {
		const postRef = doc(db, "post", post.id);
		try {
			await updateDoc(postRef, { dislike: post.dislike + 1 });
			setPosts(
				posts.map((p) =>
					p.id === post.id ? { ...p, dislike: post.dislike + 1 } : p
				)
			);
		} catch (error) {
			console.error("Error al dar dislike:", error);
		}
	};

	const handleComment = async () => {
		if (!newComment.trim()) return;

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

		const postRef = doc(db, "post", post.id);
		try {
			await updateDoc(postRef, {
				comments: arrayUnion(commentData),
			});
			setPosts(
				posts.map((p) =>
					p.id === post.id
						? { ...p, comments: [...p.comments, commentData] }
						: p
				)
			);
			setNewComment("");
		} catch (error) {
			console.error("Error al agregar comentario:", error);
		}
	};

	return (
		<div
			key={post.id}
			className="post-card">
			<div className="post-details">
				<h3>{post.title}</h3>
				<img
					src={post.image}
					alt={post.title}
				/>
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
			<button onClick={() => handleDislike(post.id, post.dislike)}>
				{" "}
				<img
					src="https://images.icon-icons.com/1744/PNG/512/3643770-favorite-heart-like-likes-love-loved_113432.png"
					alt="Like"
				/>
				{post.dislike}
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
						<div
							key={index}
							className="comment">
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
					<button className="button-comment"onClick={() => handleComment(post.id)}>
						<div className="svg-wrapper-1">
							<div className="svg-wrapper">
							<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 23 23"
									width="23"
									height="23"
								>
									<path fill="none" d="M0 0h24v24H0z"></path>
									<path
									fill="currentColor"
									d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
									></path>
								</svg>
								</div>
							</div>
						<span>Comentar</span>
					</button>
				</div>
			</div>
		</div>
	);
}
