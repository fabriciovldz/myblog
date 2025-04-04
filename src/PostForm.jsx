import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function PostForm({ db, posts, setPosts }) {
	const [title, setTitle] = useState("");
	const [details, setDetails] = useState("");
	const [image, setImage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const auth = getAuth();
		const user = auth.currentUser;

		if (!user) {
			alert("Debes iniciar sesión para comentar.");
			return;
		}
		if (!title || !details || !image)
			return alert("Todos los campos son obligatorios");

		const newPost = {
			title,
			details,
			image,
			likes: 0,
			dislike: 0,
			createdBy: {
				uid: user.uid,
				displayName: user.displayName,
				photoURL: user.photoURL,
			},
			comments: [],
		};
		try {
			const docRef = await addDoc(collection(db, "post"), newPost);
			setPosts([
				{
					id: docRef.id,
					...newPost,
					createdBy: {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL,
					},
				},
				...posts,
			]);
			setTitle("");
			setDetails("");
			setImage("");
		} catch (error) {
			console.error("Error al agregar el post:", error);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="post-form"
			style={{
				marginTop: "0",
				border: "0px",
				background: "black",
			}}>
			<input
				className="custom-input"
				style={{
					backgroundColor: "#fff",
					color: "#000",
					padding: "8px",
					border: "1px solid #ccc",
					borderRadius: "5px",
					width: "100%",
					fontSize: "14px",
				}}
				type="text"
				placeholder="Título"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<input
				className="custom-input"
				style={{
					backgroundColor: "#fff",
					color: "#000",
					padding: "8px",
					border: "1px solid #ccc",
					borderRadius: "5px",
					width: "100%",
					fontSize: "14px",
				}}
				type="text"
				placeholder="URL de imagen"
				value={image}
				onChange={(e) => setImage(e.target.value)}
			/>
			<textarea
				className="custom-textarea"
				style={{
					backgroundColor: "#fff",
					color: "#000",
					padding: "8px",
					border: "1px solid #ccc",
					borderRadius: "5px",
					width: "100%",
					resize: "vertical",
					fontSize: "14px",
				}}
				placeholder="Detalles"
				value={details}
				onChange={(e) => setDetails(e.target.value)}
			/>
			<button
				className="button-submit"
				type="submit">
				<span> Publicar </span>
			</button>
			<style>
				{`
    .custom-input::placeholder,
    .custom-textarea::placeholder {
      color: #000 !important;
      opacity: 1;
    }
  `}
			</style>
		</form>
	);
}
