import React, { useState, useEffect } from "react";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	updateDoc,
	doc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "./styles.css";
import Auth from "./Auth";
import PostForm from "./PostForm";
import PostList from "./PostList";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export default function PostApp() {
	const [user, setUser] = useState(null);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, "post"));
				setPosts(
					querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
				);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};
		fetchPosts();
	}, []);

	console.log(posts);

	return (
		<div className="container">
			<div
				style={{
					position: "sticky",
					top: "0",
					width: "100%",
					backgroundColor: "#fff",
					boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
					zIndex: "1000",
				}}>
				<Auth
					user={user}
					setUser={setUser}
					auth={auth}
					provider={provider}
				/>
			</div>
			{user && (
				<>
					<div
						style={{
							backgroundImage:
								'url("https://wallpapers.com/images/featured/cool-black-background-zuepoib34iujg4he.jpg")',
						}}>
						<PostForm
							db={db}
							posts={posts}
							setPosts={setPosts}
						/>
					</div>
					<PostList
						posts={posts}
						db={db}
						setPosts={setPosts}
					/>
				</>
			)}
		</div>
	);
}
