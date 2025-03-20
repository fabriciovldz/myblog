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
    <div className="">
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL de imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          placeholder="Detalles"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
}
