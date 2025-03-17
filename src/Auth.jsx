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
		<div className="auth-container">
			<div className="logo">
				<h1>MyBlog</h1>
			</div>
			{user ? (
				<button onClick={handleSignOut}>Cerrar sesión</button>
			) : (
				<button onClick={handleSignIn}>Iniciar sesión con Google</button>
			)}
		</div>
	);
}
