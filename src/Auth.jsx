import React from "react";
import { signInWithPopup, signOut } from "firebase/auth";

export default function Auth({ user, setUser, auth, provider }) {
  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="container">
      <header className="auth-container">
        <div className="logo">
          <h1>MyBlog</h1>
        </div>
        <a href="https://github.com/turepositorio" target="_blank" rel="noopener noreferrer">
          <button><img src="https://img.icons8.com/ios_filled/512/FFFFFF/github.png" alt="Github logo" className="button-icon"/></button>
        </a>
        <div className="auth-button">
          {user ? (
            <button onClick={handleSignOut}>Cerrar sesión</button>
          ) : (
            <button onClick={handleSignIn}>Iniciar sesión con Google</button>
          )}
        </div>
      </header>
      <main>
        <img
          src="ruta-de-la-imagen-ia.jpg"
          alt="IA en películas"
          className="ia-image"
        />
      </main>
    </div>
  );
}
