import React from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import LoginButton from "./LoginButton";
import "./Auth.css";
import CubeScene from "./CubeScene";

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
    <div>
        <div>
          <h1>PlaceHolderNameSite</h1>
        </div>
      <div className="cube-contenedor">      
        {!user && (
        <div>
          <CubeScene></CubeScene>
        </div>
        )} 
      </div>
        <div className="auth-button">
          <LoginButton
            onClick={user ? handleSignOut : handleSignIn}
            text={user ? "Cerrar sesión" : "Iniciar sesión"}
          />
        </div>
    </div>
  );
}