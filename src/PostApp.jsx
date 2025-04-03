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
import Auth from "./Auth";
import PostForm from "./PostForm";
import PostList from "./PostList";
import "./PostApp.css"

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
		<div>
			<Auth
				user={user}
				setUser={setUser}
				auth={auth}
				provider={provider}
			/>
			{user && (
				<>
					{/* <PostForm
						db={db}
						posts={posts}
						setPosts={setPosts}
					/>  */}
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