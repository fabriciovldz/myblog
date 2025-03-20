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
    <div className="body">
      <header className="header">
        <div className="logo">
          <h1>MyBlog</h1>
        </div>
        <div className="auth-button">
          {user ? (
            <button onClick={handleSignOut}>Cerrar sesión</button>
          ) : (
            <button onClick={handleSignIn}>Iniciar sesión</button>
          )}
        </div>
      </header>
      {/* <main>
        <img
          src="https://img.asmedia.epimg.net/resizer/v2/YZBVQL7EXNF5NESXYCNP2NMMEQ.jpg?auth=93c621f33452faa67e47d50a4803953522276428b7fbe71685fc23e0fbc836b3&width=1288&height=725&smart=true"
          alt="IA en películas"
          className="ia-image"
        />
      </main> */}
    </div>
  );
}
