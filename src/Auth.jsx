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
					<h1> IA MOVIES </h1>
				</div>
				<div>
					{user ? (
						<div>
							<h3 style={{ color: "white", fontSize: "1.2rem", border: "0px" }}>
								Bienvenido {user.displayName.split(" ")[0]}!
							</h3>
							<button onClick={handleSignOut}>
								<a>
									<span>Cerrar sesión</span>
								</a>
							</button>
						</div>
					) : (
						<button onClick={handleSignIn}>
							<a>
								<span>Iniciar sesión</span>
							</a>
						</button>
					)}
				</div>
			</header>
		</div>
	);
}
